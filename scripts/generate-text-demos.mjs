#!/usr/bin/env node
/**
 * Batch generation of text service demos
 * Calls /api/generate for text modes (describe, listing, social, score, analyze, checklist, floorplan, compliance, repaircost)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const SOURCES_DIR = path.join(PROJECT_ROOT, "public/demo/sources");
const OUTPUT_DIR = path.join(PROJECT_ROOT, "public/demo/generated/text");
const API_URL = "http://localhost:3099/api/generate";

// Create output dir
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Use ya-4 (typical Soviet apartment) as the demo photo for all text services
const DEMO_PHOTO = "ya-4.jpg";

const TEXT_GENERATIONS = [
  { mode: "describe", params: { platform: "avito", tone: "selling" } },
  { mode: "listing", params: { platform: "avito" } },
  { mode: "social", params: { socialPlatform: "vk" } },
  { mode: "score", params: {} },
  { mode: "analyze", params: {} },
  { mode: "checklist", params: {} },
  { mode: "floorplan", params: {} },
  { mode: "compliance", params: {} },
  { mode: "repaircost", params: {} },
];

async function generateOne(gen, index) {
  const { mode, params } = gen;
  const outputPath = path.join(OUTPUT_DIR, `${mode}.txt`);

  if (fs.existsSync(outputPath)) {
    console.log(`  [${index + 1}/${TEXT_GENERATIONS.length}] ${mode} — already exists, skipping`);
    return { mode, status: "skipped" };
  }

  const photoPath = path.join(SOURCES_DIR, DEMO_PHOTO);
  console.log(`  [${index + 1}/${TEXT_GENERATIONS.length}] ${mode} ...`);
  const startTime = Date.now();

  try {
    const formData = new FormData();
    const fileBytes = fs.readFileSync(photoPath);
    const blob = new Blob([fileBytes], { type: "image/jpeg" });
    formData.append("image", blob, DEMO_PHOTO);
    formData.append("mode", mode);

    for (const [key, value] of Object.entries(params)) {
      formData.append(key, value);
    }

    const res = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `HTTP ${res.status}`);
    }

    const data = await res.json();

    if (data.text) {
      fs.writeFileSync(outputPath, data.text, "utf-8");
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      const chars = data.text.length;
      console.log(`    ✅ ${mode} — saved (${chars} chars, ${elapsed}s)`);
      return { mode, status: "ok", time: elapsed };
    } else {
      throw new Error("No text in response");
    }
  } catch (err) {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.error(`    ❌ ${mode} — FAILED (${elapsed}s): ${err.message}`);
    return { mode, status: "error", error: err.message };
  }
}

async function main() {
  console.log(`\n📝 Generating ${TEXT_GENERATIONS.length} text demos...\n`);

  const results = [];
  for (let i = 0; i < TEXT_GENERATIONS.length; i++) {
    const result = await generateOne(TEXT_GENERATIONS[i], i);
    results.push(result);
    // Small delay between requests
    if (i < TEXT_GENERATIONS.length - 1 && result.status === "ok") {
      await new Promise((r) => setTimeout(r, 2000));
    }
  }

  const ok = results.filter((r) => r.status === "ok");
  const errors = results.filter((r) => r.status === "error");
  console.log(`\n📊 Results: ✅ ${ok.length} | ❌ ${errors.length}`);
  if (errors.length > 0) {
    errors.forEach((e) => console.log(`   - ${e.mode}: ${e.error}`));
  }
  console.log(`\n✨ Done!\n`);
}

main().catch(console.error);
