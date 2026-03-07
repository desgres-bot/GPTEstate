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
} from "@/lib/openai";

export const maxDuration = 300; // Allow up to 5 min for image generation

const VALID_MODES = [
  "enhance", "staging", "redesign", "remove",
  "describe", "dusk", "sky",
  "score", "analyze", "renovation",
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

    // Text modes: describe, score, analyze — return { text }
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

    // Image modes: return { output_url }
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
    } else {
      // redesign
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
