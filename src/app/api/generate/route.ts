import { NextRequest, NextResponse } from "next/server";
import {
  enhancePhoto,
  stageRoom,
  redesignRoom,
  removeObjects,
  describePhoto,
  dayToDusk,
  replaceSky,
  scorePhoto,
  analyzeRoom,
  renovateRoom,
  generateChecklist,
  generateListing,
  compareStyles,
  changeExterior,
  designLandscape,
  changeWallColor,
  improveLighting,
  fixPerspective,
  upscaleImage,
  removeWatermark,
  replaceFurniture,
  generateSocialPost,
  describeFloorPlan,
  changeFlooring,
  changeKitchen,
  changeSeason,
  addDecor,
  stageCommercial,
  checkCompliance,
  renderFromText,
  estimateRepairCost,
  makeVacant,
  declutterRoom,
  detectObjects,
  remodelBathroom,
  addItem,
  greenifyExterior,
  refineWithAI,
} from "@/lib/openai";

export const maxDuration = 300; // Allow up to 5 min for image generation

const VALID_MODES = [
  "enhance", "staging", "redesign", "remove",
  "describe", "dusk", "sky",
  "score", "analyze", "renovation",
  "checklist", "listing", "compare",
  "exterior", "landscape", "wallcolor", "lighting",
  "perspective", "upscale", "watermark", "furnish",
  "social", "floorplan",
  "flooring", "kitchen", "season", "decor",
  "commercial", "compliance", "textrender", "repaircost",
  "vacant", "declutter", "declutter-detect",
  "bathroom", "additem", "greenify",
  "refine",
];

export async function POST(req: NextRequest) {
  try {
    console.log("[generate] Received request, parsing formData...");
    let formData: FormData;
    try {
      formData = await req.formData();
    } catch (e) {
      console.error("[generate] formData parse error:", e);
      return NextResponse.json({ error: "Ошибка загрузки файла. Попробуйте другое фото." }, { status: 400 });
    }
    const image = formData.get("image") as File | null;
    const mode = formData.get("mode") as string;
    const style = formData.get("style") as string | null;
    const customStyle = formData.get("customStyle") as string | null;
    const description = formData.get("description") as string | null;
    const mask = formData.get("mask") as string | null;
    const platform = formData.get("platform") as string | null;
    const tone = formData.get("tone") as string | null;
    const skyType = formData.get("skyType") as string | null;
    const renovationType = formData.get("renovationType") as string | null;
    // New mode params
    const exteriorStyle = formData.get("exteriorStyle") as string | null;
    const customExterior = formData.get("customExterior") as string | null;
    const landscapeType = formData.get("landscapeType") as string | null;
    const wallColor = formData.get("wallColor") as string | null;
    const customWallColor = formData.get("customWallColor") as string | null;
    const socialPlatform = formData.get("socialPlatform") as string | null;
    const furnishDescription = formData.get("furnishDescription") as string | null;
    // New batch 2 params
    const flooringType = formData.get("flooringType") as string | null;
    const customFlooring = formData.get("customFlooring") as string | null;
    const kitchenStyle = formData.get("kitchenStyle") as string | null;
    const customKitchen = formData.get("customKitchen") as string | null;
    const seasonType = formData.get("seasonType") as string | null;
    const decorType = formData.get("decorType") as string | null;
    const commercialType = formData.get("commercialType") as string | null;
    const textrenderPrompt = formData.get("textrenderPrompt") as string | null;
    // New batch 3 params
    const bathroomStyle = formData.get("bathroomStyle") as string | null;
    const customBathroom = formData.get("customBathroom") as string | null;
    const additemDescription = formData.get("additemDescription") as string | null;
    // Refine (AI chat editor)
    const refinePrompt = formData.get("refinePrompt") as string | null;
    const originalImage = formData.get("originalImage") as File | null;
    const declutterObjects = formData.get("declutterObjects") as string | null;

    console.log("[generate] Mode:", mode, "Image size:", image?.size, "Image type:", image?.type);

    if (!image) {
      return NextResponse.json({ error: "Изображение не загружено" }, { status: 400 });
    }

    if (!VALID_MODES.includes(mode)) {
      return NextResponse.json({ error: "Неверный режим" }, { status: 400 });
    }

    // Convert file to base64 data URI
    const bytes = await image.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    const mimeType = image.type || "image/jpeg";
    const dataUri = `data:${mimeType};base64,${base64}`;

    // ─── Text modes ───
    if (mode === "describe") {
      const text = await describePhoto(dataUri, platform || "avito", tone || "selling");
      return NextResponse.json({ text });
    }
    if (mode === "score") {
      const text = await scorePhoto(dataUri);
      return NextResponse.json({ text });
    }
    if (mode === "analyze") {
      const text = await analyzeRoom(dataUri);
      return NextResponse.json({ text });
    }
    if (mode === "checklist") {
      const text = await generateChecklist(dataUri);
      return NextResponse.json({ text });
    }
    if (mode === "listing") {
      const text = await generateListing(dataUri, platform || "avito");
      return NextResponse.json({ text });
    }
    if (mode === "social") {
      const text = await generateSocialPost(dataUri, socialPlatform || "instagram");
      return NextResponse.json({ text });
    }
    if (mode === "floorplan") {
      const text = await describeFloorPlan(dataUri);
      return NextResponse.json({ text });
    }
    if (mode === "compliance") {
      const text = await checkCompliance(dataUri);
      return NextResponse.json({ text });
    }
    if (mode === "repaircost") {
      const text = await estimateRepairCost(dataUri);
      return NextResponse.json({ text });
    }

    // ─── Declutter detect mode ───
    if (mode === "declutter-detect") {
      const objects = await detectObjects(dataUri);
      return NextResponse.json({ objects });
    }

    // ─── Compare mode ───
    if (mode === "compare") {
      const stylesParam = formData.get("styles") as string | null;
      const styles = stylesParam ? JSON.parse(stylesParam) : ["modern", "scandinavian", "loft", "classic"];
      const outputUrls = await compareStyles(dataUri, styles);
      return NextResponse.json({ output_urls: outputUrls });
    }

    // ─── Image modes ───
    let outputDataUri: string;

    if (mode === "enhance") {
      outputDataUri = await enhancePhoto(dataUri);
    } else if (mode === "staging") {
      outputDataUri = await stageRoom(dataUri, style || "modern", customStyle || undefined);
    } else if (mode === "remove") {
      outputDataUri = await removeObjects(dataUri, description, mask);
    } else if (mode === "dusk") {
      outputDataUri = await dayToDusk(dataUri);
    } else if (mode === "sky") {
      outputDataUri = await replaceSky(dataUri, skyType || "sunny");
    } else if (mode === "renovation") {
      outputDataUri = await renovateRoom(dataUri, renovationType || "white_walls");
    } else if (mode === "exterior") {
      outputDataUri = await changeExterior(dataUri, exteriorStyle || "modern", customExterior || undefined);
    } else if (mode === "landscape") {
      outputDataUri = await designLandscape(dataUri, landscapeType || "full");
    } else if (mode === "wallcolor") {
      outputDataUri = await changeWallColor(dataUri, wallColor || "white", customWallColor || undefined);
    } else if (mode === "lighting") {
      outputDataUri = await improveLighting(dataUri);
    } else if (mode === "perspective") {
      outputDataUri = await fixPerspective(dataUri);
    } else if (mode === "upscale") {
      outputDataUri = await upscaleImage(dataUri);
    } else if (mode === "watermark") {
      outputDataUri = await removeWatermark(dataUri);
    } else if (mode === "furnish") {
      outputDataUri = await replaceFurniture(dataUri, furnishDescription || "");
    } else if (mode === "flooring") {
      outputDataUri = await changeFlooring(dataUri, flooringType || "laminate", customFlooring || undefined);
    } else if (mode === "kitchen") {
      outputDataUri = await changeKitchen(dataUri, kitchenStyle || "modern_white", customKitchen || undefined);
    } else if (mode === "season") {
      outputDataUri = await changeSeason(dataUri, seasonType || "summer");
    } else if (mode === "decor") {
      outputDataUri = await addDecor(dataUri, decorType || "newyear");
    } else if (mode === "commercial") {
      outputDataUri = await stageCommercial(dataUri, commercialType || "office");
    } else if (mode === "textrender") {
      outputDataUri = await renderFromText(dataUri, textrenderPrompt || "");
    } else if (mode === "vacant") {
      outputDataUri = await makeVacant(dataUri);
    } else if (mode === "declutter") {
      const objectsList = declutterObjects ? JSON.parse(declutterObjects) as string[] : undefined;
      outputDataUri = await declutterRoom(dataUri, objectsList);
    } else if (mode === "bathroom") {
      outputDataUri = await remodelBathroom(dataUri, bathroomStyle || "modern_white", customBathroom || undefined);
    } else if (mode === "additem") {
      outputDataUri = await addItem(dataUri, additemDescription || "");
    } else if (mode === "greenify") {
      outputDataUri = await greenifyExterior(dataUri);
    } else if (mode === "refine") {
      if (!refinePrompt?.trim()) {
        return NextResponse.json({ error: "Опишите что изменить" }, { status: 400 });
      }
      let originalDataUri: string | null = null;
      if (originalImage) {
        const origBytes = await originalImage.arrayBuffer();
        const origBase64 = Buffer.from(origBytes).toString("base64");
        const origMime = originalImage.type || "image/jpeg";
        originalDataUri = `data:${origMime};base64,${origBase64}`;
      }
      outputDataUri = await refineWithAI(dataUri, refinePrompt.trim(), originalDataUri);
    } else {
      // redesign (default)
      outputDataUri = await redesignRoom(dataUri, style || "modern", customStyle || undefined);
    }

    return NextResponse.json({ output_url: outputDataUri });
  } catch (error: unknown) {
    const err = error as { message?: string; status?: number; code?: string };
    console.error("Generation error:", JSON.stringify({
      message: err.message,
      status: err.status,
      code: err.code,
    }, null, 2));
    return NextResponse.json(
      { error: err.message || "Ошибка генерации. Попробуйте позже." },
      { status: 500 }
    );
  }
}
