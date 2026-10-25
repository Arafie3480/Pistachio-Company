#!/usr/bin/env node
/**
 * Post-build smoke checks for Green Diamond Farm marketing routes.
 * Usage: npm run start &  then  npm run smoke
 * Or:    SMOKE_BASE=http://127.0.0.1:4321 node scripts/smoke.mjs
 */

const base = (process.env.SMOKE_BASE || "http://127.0.0.1:4321").replace(
  /\/$/,
  "",
);

/** Headers required on every marketing response (see next.config.ts). */
const requiredHeaders = [
  ["x-content-type-options", "nosniff"],
  ["x-frame-options", "DENY"],
  ["referrer-policy", "strict-origin-when-cross-origin"],
  ["permissions-policy", "camera=(), microphone=(), geolocation=(), payment=()"],
];

/** @type {{ path: string; expect?: number; includes?: string[]; headers?: boolean; redirect?: "follow" | "manual" }[]} */
const checks = [
  { path: "/en", includes: ["Green Diamond Farm"], headers: true },
  { path: "/en/products", includes: ["Ahmad Aghaei"] },
  { path: "/en/about", includes: ["About"] },
  {
    path: "/en/contact",
    includes: [
      "Contact",
      "mailto:export@greendiamondfarm.com",
      "tel:+989361814577",
      "wa.me/989361814577",
    ],
  },
  { path: "/en/privacy", includes: ["Privacy"] },
  { path: "/ar", includes: ["lang=\"ar\"", "dir=\"rtl\""] },
  { path: "/tr" },
  { path: "/zh" },
  { path: "/hi" },
  { path: "/ru" },
  { path: "/sitemap.xml", includes: ["urlset", "greendiamondfarm.com"] },
  { path: "/robots.txt", includes: ["Sitemap:"] },
  { path: "/privacy" },
  { path: "/contact" },
  { path: "/opengraph-image", expect: 200 },
  { path: "/icon", expect: 200 },
  { path: "/definitely-missing-page-xyz", expect: 404 },
];

/**
 * @param {{ path: string; expect?: number; includes?: string[]; headers?: boolean }} item
 */
async function checkOne(item) {
  const url = `${base}${item.path}`;
  const expect = item.expect ?? 200;
  const res = await fetch(url, { redirect: "follow" });
  const status = res.status;
  const text = await res.text();
  const failures = [];

  if (status !== expect) {
    failures.push(`status ${status} (expected ${expect})`);
  }
  for (const needle of item.includes ?? []) {
    if (!text.includes(needle)) {
      failures.push(`missing "${needle}"`);
    }
  }
  if (item.headers) {
    for (const [name, value] of requiredHeaders) {
      const actual = res.headers.get(name);
      if (!actual) {
        failures.push(`missing header ${name}`);
      } else if (actual !== value) {
        failures.push(`header ${name}="${actual}" (expected "${value}")`);
      }
    }
    const csp = res.headers.get("content-security-policy") || "";
    if (!csp.includes("default-src 'self'") || !csp.includes("frame-ancestors 'none'")) {
      failures.push("incomplete Content-Security-Policy");
    }
  }
  return { url, ok: failures.length === 0, failures, status };
}

const results = [];
for (const item of checks) {
  try {
    results.push(await checkOne(item));
  } catch (err) {
    results.push({
      url: `${base}${item.path}`,
      ok: false,
      failures: [String(err?.message || err)],
      status: 0,
    });
  }
}

const failed = results.filter((r) => !r.ok);
for (const r of results) {
  const mark = r.ok ? "PASS" : "FAIL";
  const detail = r.ok ? String(r.status) : r.failures.join("; ");
  console.log(`${mark}  ${r.url}  ${detail}`);
}

if (failed.length) {
  console.error(`\n${failed.length}/${results.length} checks failed`);
  process.exit(1);
}

console.log(`\nAll ${results.length} smoke checks passed against ${base}`);
