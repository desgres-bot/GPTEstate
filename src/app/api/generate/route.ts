import { NextRequest, NextResponse } from "next/server";
import { enhancePhoto, redesignRoom } from "@/lib/replicate";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const image = formData.get("image") as File | null;
    const mode = formData.get("mode") as string;
    const style = formData.get("style") as string | null;

    if (!image) {
      return NextResponse.json({ error: "Изображение не загружено" }, { status: 400 });
    }

    if (!["enhance", "redesign"].includes(mode)) {
      return NextResponse.json({ error: "Неверный режим" }, { status: 400 });
    }

    // Convert file to base64 data URI for Replicate
    const bytes = await image.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    const mimeType = image.type || "image/jpeg";
    const dataUri = `data:${mimeType};base64,${base64}`;

    let outputUrl: string;

    if (mode === "enhance") {
      outputUrl = await enhancePhoto(dataUri);
    } else {
      outputUrl = await redesignRoom(dataUri, style || "modern");
    }

    // TODO: Save generation to Supabase
    // TODO: Deduct credits from user

    return NextResponse.json({ output_url: outputUrl });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Ошибка генерации. Попробуйте позже." },
      { status: 500 }
    );
  }
}
