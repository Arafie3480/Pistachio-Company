#!/usr/bin/env node
/**
 * Remote theme install helper for Green Diamond Farm.
 *
 * Preferred env (Application Password — never commit values):
 *   WP_SITE_URL=https://greendiamondfarm.com
 *   WP_USERNAME=...
 *   WP_APPLICATION_PASSWORD=...
 *
 * Optional SFTP (uploads theme folder then activates via REST):
 *   SFTP_HOST SFTP_USER SFTP_PASSWORD SFTP_PATH(=.../wp-content/themes)
 *
 * Without secrets: builds dist zip only.
 */
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const distDir = join(root, "wordpress/dist");
const zipPath = join(distDir, "green-diamond-farm.zip");
const themeDir = join(root, "wordpress/green-diamond-farm");

function buildZip() {
  mkdirSync(distDir, { recursive: true });
  execFileSync(
    "zip",
    ["-qr", zipPath, "green-diamond-farm", "-x", "*.DS_Store"],
    { cwd: join(root, "wordpress"), stdio: "inherit" },
  );
  console.log(`Built ${zipPath}`);
}

function basicAuthHeader(user, pass) {
  return "Basic " + Buffer.from(`${user}:${pass}`, "utf8").toString("base64");
}

async function activateViaRest(siteUrl, user, appPassword) {
  const url = siteUrl.replace(/\/$/, "") + "/wp-json/wp/v2/settings";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: basicAuthHeader(user, appPassword.replace(/\s+/g, "")),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      stylesheet: "green-diamond-farm",
      template: "green-diamond-farm",
    }),
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Theme activate failed HTTP ${res.status}: ${text.slice(0, 400)}`);
  }
  console.log("Theme activated via REST settings.");
}

function uploadViaSftp() {
  const host = process.env.SFTP_HOST;
  const user = process.env.SFTP_USER;
  const pass = process.env.SFTP_PASSWORD;
  const remoteThemes = process.env.SFTP_PATH || "wp-content/themes";
  if (!host || !user || !pass) return false;

  // Prefer sshpass + scp if available.
  const hasSshpass = spawnSync("sshpass", ["-V"], { encoding: "utf8" }).status === 0;
  if (!hasSshpass) {
    console.error("SFTP_* set but sshpass not installed. Install sshpass or upload zip manually.");
    return false;
  }
  const remote = `${user}@${host}:${remoteThemes}/`;
  execFileSync(
    "sshpass",
    ["-p", pass, "scp", "-o", "StrictHostKeyChecking=no", "-r", themeDir, remote],
    { stdio: "inherit" },
  );
  console.log(`Uploaded theme to ${remote}`);
  return true;
}

async function main() {
  buildZip();

  const site = process.env.WP_SITE_URL;
  const user = process.env.WP_USERNAME;
  const appPass = process.env.WP_APPLICATION_PASSWORD;

  const uploaded = uploadViaSftp();

  if (site && user && appPass) {
    if (!uploaded) {
      console.log(
        "No SFTP upload. Use wordpress/gdf-install.php on the host, or set SFTP_* then re-run.",
      );
      console.log(`Zip ready: ${zipPath}`);
      console.log(`Installer: wordpress/gdf-install.php`);
      process.exit(0);
    }
    await activateViaRest(site, user, appPass);
    console.log("Remote install complete.");
    return;
  }

  console.log("WP_* secrets not in env — zip built for manual / gdf-install.php path.");
  writeFileSync(
    join(distDir, "INSTALL.txt"),
    readFileSync(join(root, "docs/wordpress-delivery.md"), "utf8"),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
