#!/usr/bin/env node
// scripts/fingerprint-css.js
//
// Post-build step: fingerprint _site/assets/css/main.css so each deploy gets
// a unique URL, allowing immutable long-lived caching without stale-content
// risk. Run after `bundle exec jekyll build` (PurgeCSS has already run by
// then, so the hash is computed against the final purged stylesheet).
//
// What this does:
//   1. Hash the purged main.css (SHA-256, first 12 hex chars).
//   2. Copy it to main.<hash>.css and delete the original main.css.
//   3. Walk every .html and .xml file in _site/ and rewrite the href reference.

'use strict';

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const SITE_DIR = path.resolve(__dirname, '..', '_site');
const CSS_DIR = path.join(SITE_DIR, 'assets', 'css');
const CSS_SRC = path.join(CSS_DIR, 'main.css');

// ---------------------------------------------------------------------------
// 1. Compute fingerprint (SHA-256 truncated to 12 hex chars)
// ---------------------------------------------------------------------------
if (!fs.existsSync(CSS_SRC)) {
  console.error(`fingerprint-css: ${CSS_SRC} not found — did the build run?`);
  process.exit(1);
}

const cssBytes = fs.readFileSync(CSS_SRC);
const hash = crypto.createHash('sha256').update(cssBytes).digest('hex').slice(0, 12);
const fingerprintedName = `main.${hash}.css`;
const CSS_DEST = path.join(CSS_DIR, fingerprintedName);

// ---------------------------------------------------------------------------
// 2. Write fingerprinted copy, remove original
// ---------------------------------------------------------------------------
fs.copyFileSync(CSS_SRC, CSS_DEST);
fs.unlinkSync(CSS_SRC);
console.log(`fingerprint-css: assets/css/main.css → assets/css/${fingerprintedName}`);

// ---------------------------------------------------------------------------
// 3. Rewrite references in all HTML (and XML) files under _site/
// ---------------------------------------------------------------------------
const OLD_REF = '/assets/css/main.css';
const NEW_REF = `/assets/css/${fingerprintedName}`;
let updatedCount = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (/\.(html|xml)$/.test(entry.name)) {
      const original = fs.readFileSync(fullPath, 'utf8');
      if (original.includes(OLD_REF)) {
        fs.writeFileSync(fullPath, original.replaceAll(OLD_REF, NEW_REF));
        updatedCount += 1;
      }
    }
  }
}

walk(SITE_DIR);
console.log(`fingerprint-css: updated ${updatedCount} file(s) to reference ${fingerprintedName}`);
