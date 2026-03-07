import { NextRequest, NextResponse } from "next/server";
import { enhancePhoto, redesignRoom, removeObjects } from "@/lib/openai";

export const maxDuration = 300; // Allow up to 5 min for image generation

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
    const description = formData.get("description") as string | null;
    const mask = formData.get("mask") as string | null;
    console.log("[generate] Mode:", mode, "Image size:", image?.size, "Image type:", image?.type);

    if (!image) {
      return NextResponse.json({ error: "Изображение не загружено" }, { status: 400 });
    }

    if (!["enhance", "redesign", "remove"].includes(mode)) {
      return NextResponse.json({ error: "Неверный режим" }, { status: 400 });
    }

    // Convert file to base64 data URI
    const bytes = await image.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    const mimeType = image.type || "image/jpeg";
    const dataUri = `data:${mimeType};base64,${base64}`;

    let outputDataUri: string;

    if (mode === "enhance") {
      outputDataUri = await enhancePhoto(dataUri);
    } else if (mode === "remove") {
      outputDataUri = await removeObjects(dataUri, description, mask);
    } else {
      outputDataUri = await redesignRoom(dataUri, style || "modern");
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
