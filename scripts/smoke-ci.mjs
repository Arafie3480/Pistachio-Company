#!/usr/bin/env node
/**
 * CI helper: start production server, run smoke checks, tear down.
 * Assumes `npm run build` already succeeded. Exit code mirrors smoke.
 *
 * Uses PORT (default 4321). If the port is busy but already serves this app,
 * reuses it without starting a second process (local re-runs).
 */
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = process.env.PORT || "4321";
const base = `http://127.0.0.1:${port}`;
const nextBin = require.resolve("next/dist/bin/next");

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function probe(url) {
  try {
    const res = await fetch(url, { redirect: "follow" });
    return res.status;
  } catch {
    return 0;
  }
}

async function waitForReady(url, attempts = 60) {
  for (let i = 0; i < attempts; i++) {
    const status = await probe(url);
    if (status === 200 || status === 404) return;
    await sleep(500);
  }
  throw new Error(`Server did not become ready at ${url}`);
}

async function runSmoke() {
  const smoke = spawn(process.execPath, [path.join(root, "scripts/smoke.mjs")], {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, SMOKE_BASE: base },
  });
  return new Promise((resolve) => {
    smoke.on("exit", (c) => resolve(c ?? 1));
  });
}

/** Prefer a live server already on the port (avoids EADDRINUSE on local re-runs). */
const alreadyUp = (await probe(`${base}/en`)) === 200;
if (alreadyUp) {
  console.log(`Reusing existing server at ${base}`);
  process.exit(await runSmoke());
}

const server = spawn(process.execPath, [nextBin, "start", "--port", port], {
  cwd: root,
  stdio: ["ignore", "pipe", "pipe"],
  env: { ...process.env, PORT: port },
});

let managed = true;
server.stdout.on("data", (d) => process.stdout.write(d));
server.stderr.on("data", (d) => process.stderr.write(d));

const earlyExit = new Promise((resolve) => {
  server.on("exit", (code, signal) => {
    if (managed) resolve({ code: code ?? 1, signal });
  });
});

try {
  await Promise.race([
    waitForReady(`${base}/en`),
    earlyExit.then(({ code, signal }) => {
      throw new Error(
        `next start exited before ready (code=${code}, signal=${signal})`,
      );
    }),
  ]);

  const code = await runSmoke();
  managed = false;
  server.kill("SIGTERM");
  await sleep(400);
  if (!server.killed) {
    try {
      server.kill("SIGKILL");
    } catch {
      /* already gone */
    }
  }
  process.exit(code);
} catch (err) {
  managed = false;
  try {
    server.kill("SIGTERM");
  } catch {
    /* ignore */
  }
  console.error(String(err?.message || err));
  process.exit(1);
}
