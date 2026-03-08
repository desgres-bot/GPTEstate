#!/usr/bin/env node
/**
 * Batch generation script for demo before/after photos
 * Calls /api/generate for each service mode with the mapped source photo
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const SOURCES_DIR = path.join(PROJECT_ROOT, "public/demo/sources");
const OUTPUT_DIR = path.join(PROJECT_ROOT, "public/demo/generated");
const API_URL = "http://localhost:3099/api/generate";

// Create output dir
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Photo → Service mapping with parameters
const GENERATIONS = [
  // === Interior ===
  { mode: "enhance", photo: "ya-4.jpg", params: {} },
  { mode: "staging", photo: "empty-2.jpg", params: { style: "scandinavian" } },
  { mode: "redesign", photo: "ya-1.jpg", params: { style: "modern" } },
  { mode: "remove", photo: "room-1.jpg", params: { description: "remove all furniture and belongings" } },
  { mode: "vacant", photo: "room-5.jpg", params: {} },
  { mode: "declutter", photo: "ya-6.jpg", params: {} },
  { mode: "renovation", photo: "ya-7.jpg", params: { renovationType: "white_walls" } },
  { mode: "wallcolor", photo: "ya-13.jpg", params: { wallColor: "white" } },
  { mode: "flooring", photo: "ya-10.jpg", params: { flooringType: "laminate" } },
  { mode: "kitchen", photo: "kitchen-1.jpg", params: { kitchenStyle: "modern" } },
  { mode: "bathroom", photo: "bathroom-1.jpg", params: { bathroomStyle: "modern" } },
  { mode: "furnish", photo: "ya-12.jpg", params: { furnishDescription: "Replace old furniture with modern minimalist pieces: new sofa, coffee table, bookshelf" } },
  { mode: "additem", photo: "room-4.jpg", params: { additemDescription: "Add a cozy reading corner with a floor lamp and potted plants" } },
  { mode: "commercial", photo: "commercial-c.jpg", params: { commercialType: "office" } },

  // === Exterior ===
  { mode: "exterior", photo: "house-f.jpg", params: { exteriorStyle: "modern" } },
  { mode: "landscape", photo: "yard-b.jpg", params: { landscapeType: "garden" } },
  { mode: "greenify", photo: "yard-d.jpg", params: {} },
  { mode: "season", photo: "house-a.jpg", params: { seasonType: "summer" } },
  { mode: "decor", photo: "house-c.jpg", params: { decorType: "newyear" } },
  { mode: "dusk", photo: "house-f.jpg", params: {} },
  { mode: "sky", photo: "house-a.jpg", params: { skyType: "blue" } },

  // === Quality ===
  { mode: "lighting", photo: "ya-9.jpg", params: {} },
  { mode: "perspective", photo: "room-2.jpg", params: {} },
  { mode: "upscale", photo: "ya-3.jpg", params: {} },
  { mode: "watermark", photo: "house-f.jpg", params: {} },
];

async function generateOne(gen, index) {
  const { mode, photo, params } = gen;
  const outputPath = path.join(OUTPUT_DIR, `${mode}.jpg`);

  // Skip if already generated
  if (fs.existsSync(outputPath)) {
    console.log(`  [${index + 1}/${GENERATIONS.length}] ${mode} — already exists, skipping`);
    return { mode, status: "skipped" };
  }

  const photoPath = path.join(SOURCES_DIR, photo);
  if (!fs.existsSync(photoPath)) {
    console.error(`  [${index + 1}/${GENERATIONS.length}] ${mode} — MISSING photo: ${photo}`);
    return { mode, status: "error", error: "missing photo" };
  }

  console.log(`  [${index + 1}/${GENERATIONS.length}] ${mode} ← ${photo} ...`);
  const startTime = Date.now();

  try {
    // Build FormData
    const formData = new FormData();
    const fileBytes = fs.readFileSync(photoPath);
    const blob = new Blob([fileBytes], { type: "image/jpeg" });
    formData.append("image", blob, photo);
    formData.append("mode", mode);

    // Add mode-specific params
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

    if (data.output_url) {
      // Save base64 image
      const base64 = data.output_url.replace(/^data:image\/\w+;base64,/, "");
      fs.writeFileSync(outputPath, Buffer.from(base64, "base64"));
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      const sizeKB = (fs.statSync(outputPath).size / 1024).toFixed(0);
      console.log(`    ✅ ${mode} — saved (${sizeKB}KB, ${elapsed}s)`);
      return { mode, status: "ok", time: elapsed };
    } else {
      throw new Error("No output_url in response");
    }
  } catch (err) {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.error(`    ❌ ${mode} — FAILED (${elapsed}s): ${err.message}`);
    return { mode, status: "error", error: err.message, time: elapsed };
  }
}

async function main() {
  console.log(`\n🚀 Generating ${GENERATIONS.length} demo images...\n`);
  console.log(`   Source: ${SOURCES_DIR}`);
  console.log(`   Output: ${OUTPUT_DIR}`);
  console.log(`   API:    ${API_URL}\n`);

  const results = [];

  // Run sequentially with delay to avoid rate limits (6 req/min)
  for (let i = 0; i < GENERATIONS.length; i++) {
    const result = await generateOne(GENERATIONS[i], i);
    results.push(result);
    // Wait 12s between requests to stay under 6/min rate limit
    if (i < GENERATIONS.length - 1 && result.status === "ok") {
      console.log(`    ⏳ Waiting 12s for rate limit...`);
      await new Promise((r) => setTimeout(r, 12000));
    }
  }

  // Summary
  const ok = results.filter((r) => r.status === "ok");
  const skipped = results.filter((r) => r.status === "skipped");
  const errors = results.filter((r) => r.status === "error");

  console.log(`\n📊 Results:`);
  console.log(`   ✅ Generated: ${ok.length}`);
  console.log(`   ⏭️  Skipped:   ${skipped.length}`);
  console.log(`   ❌ Errors:    ${errors.length}`);

  if (errors.length > 0) {
    console.log(`\n❌ Failed modes:`);
    errors.forEach((e) => console.log(`   - ${e.mode}: ${e.error}`));
  }

  console.log(`\n✨ Done!\n`);
}

main().catch(console.error);
