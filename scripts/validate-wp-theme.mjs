#!/usr/bin/env node
/**
 * Structural checks for the WordPress delivery theme (no PHP runtime required).
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = join(process.cwd(), "wordpress/green-diamond-farm");
const bundleZip = join(process.cwd(), "wordpress/dist/green-diamond-farm.zip");
const installer = join(process.cwd(), "wordpress/gdf-install.php");
existsSync(bundleZip) ? pass("dist/green-diamond-farm.zip") : fail("missing dist/green-diamond-farm.zip");
existsSync(installer) ? pass("gdf-install.php") : fail("missing gdf-install.php");

const required = [
  "style.css",
  "functions.php",
  "header.php",
  "footer.php",
  "front-page.php",
  "page-about.php",
  "page-products.php",
  "page-contact.php",
  "page-privacy.php",
  "404.php",
  "index.php",
  "assets/css/main.css",
  "assets/js/main.js",
  "assets/brand/logo-lockup.png",
  "assets/brand/logo-nav-trim.png",
  "inc/config.php",
  "inc/i18n.php",
  "inc/content.php",
  "inc/setup.php",
  "inc/assets.php",
  "inc/template-tags.php",
  "inc/admin-content.php",
];

const locales = ["en", "fa", "ar", "tr", "zh", "hi", "ru"];
let failed = 0;

function fail(msg) {
  console.error(`FAIL  ${msg}`);
  failed += 1;
}

function pass(msg) {
  console.log(`PASS  ${msg}`);
}

if (!existsSync(root)) {
  fail(`theme missing: ${root}`);
  process.exit(1);
}

for (const rel of required) {
  const p = join(root, rel);
  existsSync(p) ? pass(rel) : fail(`missing ${rel}`);
}

const style = readFileSync(join(root, "style.css"), "utf8");
if (/Theme Name:\s*Green Diamond Farm/.test(style)) pass("style.css theme header");
else fail("style.css missing Theme Name");

let baseKeys = null;
for (const loc of locales) {
  const p = join(root, "data/defaults", `${loc}.json`);
  if (!existsSync(p)) {
    fail(`defaults/${loc}.json`);
    continue;
  }
  let data;
  try {
    data = JSON.parse(readFileSync(p, "utf8"));
  } catch {
    fail(`invalid JSON ${loc}.json`);
    continue;
  }
  const flat = (o, prefix = "") => {
    const out = [];
    for (const [k, v] of Object.entries(o)) {
      const path = prefix ? `${prefix}.${k}` : k;
      if (v && typeof v === "object") out.push(...flat(v, path));
      else out.push(path);
    }
    return out;
  };
  const keys = new Set(flat(data));
  if (!baseKeys) baseKeys = keys;
  if (keys.size !== baseKeys.size || [...keys].some((k) => !baseKeys.has(k))) {
    fail(`${loc}.json key mismatch`);
  } else {
    pass(`defaults/${loc}.json (${keys.size} keys)`);
  }
}

const phpFiles = [];
function walk(dir) {
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, name.name);
    if (name.isDirectory()) walk(p);
    else if (name.name.endsWith(".php")) phpFiles.push(p);
  }
}
walk(root);

for (const file of phpFiles) {
  const src = readFileSync(file, "utf8");
  if (!src.includes("<?php")) fail(`${file} missing php open`);
  if (/eval\s*\(/.test(src)) fail(`${file} contains eval()`);
}

pass(`${phpFiles.length} php files scanned`);

if (failed) {
  console.error(`\n${failed} check(s) failed`);
  process.exit(1);
}
console.log("\nAll WordPress theme structural checks passed.");
