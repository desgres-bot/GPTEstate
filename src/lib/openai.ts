import Replicate from "replicate";
import sharp from "sharp";

/**
 * Compress image to small JPEG for GPT-4o analysis (under 10KB for proxy).
 */
async function compressForAnalysis(imageBase64: string): Promise<string> {
  const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");
  const compressed = await sharp(buffer)
    .resize(256, 256, { fit: "inside" })
    .jpeg({ quality: 25 })
    .toBuffer();
  console.log("[compress] Original:", buffer.length, "Compressed:", compressed.length);
  return `data:image/jpeg;base64,${compressed.toString("base64")}`;
}

/**
 * Call OpenAI chat completions directly via fetch through the proxy.
 * This avoids SDK body size issues with Cloudflare Workers.
 */
async function openaiChatViaProxy(messages: unknown[], maxTokens: number): Promise<string> {
  const baseURL = process.env.OPENAI_BASE_URL || "https://api.openai.com/v1";
  const apiKey = process.env.OPENAI_API_KEY || "";

  const response = await fetch(`${baseURL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages,
      max_tokens: maxTokens,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenAI API error ${response.status}: ${err}`);
  }

  const data = await response.json() as { choices: Array<{ message: { content: string } }> };
  return data.choices[0]?.message?.content || "";
}

function getReplicate() {
  return new Replicate({
    auth: process.env.REPLICATE_API_TOKEN || "",
  });
}

function extractUrl(output: unknown): string {
  if (typeof output === "string") return output;
  if (output && typeof output === "object") {
    if ("href" in output) return (output as { href: string }).href;
    if ("url" in output) {
      const u = (output as { url: unknown }).url;
      return typeof u === "function" ? u() : String(u);
    }
    if (Array.isArray(output) && output.length > 0) return String(output[0]);
  }
  return String(output);
}

/**
 * Enhance photo = Virtual cleanup using Flux Kontext Pro.
 * GPT-4o first describes the room, then Kontext edits with precise preservation.
 */
export async function enhancePhoto(imageBase64: string): Promise<string> {
  const replicate = getReplicate();

  // Step 1: GPT-4o describes what to keep and what to remove
  console.log("[enhance] Step 1: Analyzing room with GPT-4o...");
  const imgSrc = await compressForAnalysis(imageBase64);
  const description = await openaiChatViaProxy(
    [
      {
        role: "user",
        content: [
          { type: "image_url", image_url: { url: imgSrc, detail: "low" } },
          {
            type: "text",
            text: `Look at this room photo. In 2-3 short bullet points each, list:

KEEP (permanent fixtures/furniture — describe exact colors and materials):
- e.g. "dark wood bed frame with carved headboard"

REMOVE (loose clutter a person can pick up):
- e.g. "cardboard boxes on bed"

SURFACES AFTER CLEANUP (what should be visible):
- e.g. "clean blue patterned bedspread"

Be specific about colors, patterns, materials. Keep very concise.`,
          },
        ],
      },
    ],
    400,
  );
  console.log("[enhance] Room analysis:", description.substring(0, 200));

  // Step 2: Flux Kontext Pro — edit image with precise prompt
  console.log("[enhance] Step 2: Flux Kontext Pro cleanup...");
  const output = await replicate.run("black-forest-labs/flux-kontext-pro", {
    input: {
      prompt:
        "Edit this photo to show the SAME room after a quick 5-minute cleanup. " +
        "Remove ONLY the loose clutter: scattered clothes, boxes, bags, papers, dishes, " +
        "and personal items from bed, floor, and surfaces. " +
        "Show clean surfaces underneath where items were removed. " +
        "CRITICAL — these must remain PIXEL-PERFECT IDENTICAL, do not change them at all: " +
        "the chandelier/light fixture, curtain rod and curtains, window frames, " +
        "wallpaper pattern and color, picture frames on walls, all furniture frames " +
        "(bed frame, tables, chairs, shelves, wardrobes), flooring, doors, " +
        "appliances, radiators, wall-mounted items. " +
        "Keep the exact same camera angle, perspective, and lighting. " +
        "This is a before/after cleaning photo — same room, just tidied up.",
      input_image: imageBase64,
      aspect_ratio: "match_input_image",
      output_format: "jpg",
    },
  });

  const resultUrl = extractUrl(output);
  const response = await fetch(resultUrl);
  const arrayBuf = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuf);

  return `data:image/jpeg;base64,${buffer.toString("base64")}`;
}

/**
 * Stage empty room — add furniture to an empty/unfurnished room.
 */
export async function stageRoom(
  imageBase64: string,
  style: string
): Promise<string> {
  const replicate = getReplicate();

  const stylePrompts: Record<string, string> = {
    modern:
      "Add modern minimalist furniture: a stylish sofa, coffee table, sleek shelving, pendant lights. " +
      "Neutral colors with accent pieces, clean lines, contemporary feel.",
    scandinavian:
      "Add Scandinavian style furniture: light wood pieces, white and beige textiles, cozy throws, plants. " +
      "Warm minimal aesthetic, hygge feeling.",
    loft:
      "Add industrial loft furniture: vintage leather sofa, metal shelving, Edison bulb lighting. " +
      "Dark wood and metal accents, raw aesthetic.",
    classic:
      "Add classic elegant furniture: traditional pieces with curved lines, rich fabrics, warm wood. " +
      "Elegant curtains, chandelier lighting, refined atmosphere.",
    japanese:
      "Add Japanese minimalist furniture: low bed/sofa, tatami elements, shoji screens, bonsai plants. " +
      "Natural materials, zen simplicity, clean open space.",
  };

  const stylePrompt = stylePrompts[style] || stylePrompts.modern;

  const output = await replicate.run("black-forest-labs/flux-kontext-pro", {
    input: {
      prompt:
        "Virtual staging: furnish this empty room. " + stylePrompt +
        " IMPORTANT: Keep the EXACT same walls, wallpaper, paint color, windows, " +
        "window frames, doors, flooring, ceiling and room shape. " +
        "The room is currently empty or mostly empty — add appropriate furniture and decor. " +
        "Keep the same camera angle and lighting. Professional real estate photo.",
      input_image: imageBase64,
      aspect_ratio: "match_input_image",
      output_format: "jpg",
    },
  });

  const resultUrl = extractUrl(output);
  const response = await fetch(resultUrl);
  const arrayBuf = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuf);

  return `data:image/jpeg;base64,${buffer.toString("base64")}`;
}

/**
 * Redesign room — uses Flux Kontext Pro for better structure preservation.
 */
export async function redesignRoom(
  imageBase64: string,
  style: string
): Promise<string> {
  const replicate = getReplicate();

  const stylePrompts: Record<string, string> = {
    modern:
      "Replace the furniture with modern minimalist style: " +
      "stylish sofa, modern coffee table, sleek shelving, pendant lights. " +
      "Neutral colors with accent pieces, clean lines.",
    scandinavian:
      "Replace the furniture with Scandinavian style: " +
      "light wood furniture, white and beige textiles, cozy throws, plants. " +
      "Warm minimal aesthetic, hygge feeling.",
    loft:
      "Replace the furniture with industrial loft style: " +
      "vintage leather furniture, metal shelving, Edison bulb lighting. " +
      "Dark wood and metal accents.",
    classic:
      "Replace the furniture with classic elegant style: " +
      "traditional furniture with curved lines, rich fabrics, warm wood. " +
      "Elegant curtains, chandelier lighting.",
    japanese:
      "Replace the furniture with Japanese minimalist style: " +
      "low furniture, tatami elements, shoji screens, bonsai plants. " +
      "Natural materials, zen simplicity.",
  };

  const stylePrompt = stylePrompts[style] || stylePrompts.modern;

  const output = await replicate.run("black-forest-labs/flux-kontext-pro", {
    input: {
      prompt:
        "Virtual staging for this room. " + stylePrompt +
        " IMPORTANT: Keep the EXACT same walls, wallpaper, paint color, windows, " +
        "window frames, doors, flooring, ceiling and room shape. " +
        "Only change the furniture and small decor items. " +
        "Keep the same camera angle and lighting. Professional real estate photo.",
      input_image: imageBase64,
      aspect_ratio: "match_input_image",
      output_format: "jpg",
    },
  });

  const resultUrl = extractUrl(output);
  const response = await fetch(resultUrl);
  const arrayBuf = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuf);

  return `data:image/jpeg;base64,${buffer.toString("base64")}`;
}

/**
 * Remove specific objects from a photo.
 * If a mask is provided (image with red overlay), GPT-4o identifies what's under the red areas.
 * Combined with optional text description, Flux Kontext Pro removes the objects.
 */
export async function removeObjects(
  imageBase64: string,
  description: string | null,
  maskDataUrl: string | null,
): Promise<string> {
  const replicate = getReplicate();

  const parts: string[] = [];

  // Step 1: If mask provided, use GPT-4o to identify masked objects
  if (maskDataUrl) {
    console.log("[remove] Step 1: Analyzing mask with GPT-4o...");
    // Compress mask for proxy
    const compressedMask = await compressForAnalysis(maskDataUrl);
    const maskDescription = await openaiChatViaProxy(
      [
        {
          role: "user",
          content: [
            { type: "image_url", image_url: { url: compressedMask, detail: "low" } },
            {
              type: "text",
              text: "This photo has semi-transparent red/pink areas painted over certain objects. " +
                "Identify what objects are under or covered by the red/pink highlighted areas. " +
                "List them briefly, e.g. 'a brown cardboard box, a blue mug, shoes near the door'. " +
                "Only list the highlighted objects, nothing else.",
            },
          ],
        },
      ],
      300,
    );
    console.log("[remove] Mask analysis:", maskDescription.substring(0, 200));
    if (maskDescription.trim()) {
      parts.push(maskDescription.trim());
    }
  }

  // Add user's text description
  if (description && description.trim()) {
    parts.push(description.trim());
  }

  const combinedDescription = parts.join(". Also remove: ");

  if (!combinedDescription) {
    throw new Error("Не указано что удалить — закрасьте объекты или опишите текстом");
  }

  // Step 2: Flux Kontext Pro — remove objects
  console.log("[remove] Step 2: Flux Kontext Pro removing objects...");
  console.log("[remove] Description:", combinedDescription.substring(0, 200));

  const removeOutput = await replicate.run("black-forest-labs/flux-kontext-pro", {
    input: {
      prompt:
        "Edit this photo. Remove the following objects: " +
        combinedDescription +
        ". Replace removed areas with clean floor/wall/surface that matches the surrounding area. " +
        "The removed areas should blend seamlessly with the background. " +
        "Keep everything else PIXEL-PERFECT identical — same camera angle, lighting, colors, " +
        "all other furniture and fixtures must remain exactly as they are.",
      input_image: imageBase64,
      aspect_ratio: "match_input_image",
      output_format: "jpg",
    },
  });

  const removeUrl = extractUrl(removeOutput);
  const removeResponse = await fetch(removeUrl);
  const removeArrayBuf = await removeResponse.arrayBuffer();
  const removeBuffer = Buffer.from(removeArrayBuf);

  return `data:image/jpeg;base64,${removeBuffer.toString("base64")}`;
}

/**
 * Describe photo — GPT-4o Vision analyzes the photo and generates a listing description.
 */
export async function describePhoto(
  imageBase64: string,
  platform: string,
  tone: string,
): Promise<string> {
  const imgSrc = await compressForAnalysis(imageBase64);

  const platformNames: Record<string, string> = {
    avito: "Авито",
    cian: "ЦИАН",
    domclick: "ДомКлик",
  };

  const tonePrompts: Record<string, string> = {
    business: "деловой стиль, сдержанный и профессиональный тон",
    warm: "тёплый стиль, уютное описание с эмоциональной окраской",
    selling: "продающий стиль, акцент на выгодах, call-to-action, создание срочности",
  };

  const platformName = platformNames[platform] || "Авито";
  const toneDesc = tonePrompts[tone] || tonePrompts.selling;

  console.log("[describe] Generating listing for", platformName, "tone:", tone);

  const text = await openaiChatViaProxy(
    [
      {
        role: "user",
        content: [
          { type: "image_url", image_url: { url: imgSrc, detail: "high" } },
          {
            type: "text",
            text: `Ты — эксперт по недвижимости и копирайтер. Проанализируй это фото квартиры/дома и напиши объявление для площадки ${platformName}.

Стиль: ${toneDesc}.

Требования:
1. Начни с цепляющего заголовка (до 50 символов)
2. Опиши что видишь на фото: комнату, отделку, мебель, освещение, вид
3. Подчеркни достоинства: пространство, свет, ремонт, планировка
4. Добавь эмоциональные триггеры и выгоды для покупателя
5. Закончи призывом к действию
6. Формат: заголовок + 3-4 абзаца + призыв к действию
7. Пиши на русском языке
8. Не упоминай цену (её добавит риелтор)
9. Длина: 800-1200 символов (оптимально для ${platformName})

Формат ответа — только текст объявления, без пояснений.`,
          },
        ],
      },
    ],
    1500,
  );

  return text;
}

/**
 * Day to Dusk — transform a daytime exterior photo into a twilight/dusk scene.
 */
export async function dayToDusk(imageBase64: string): Promise<string> {
  const replicate = getReplicate();

  console.log("[dusk] Transforming to dusk with Flux Kontext Pro...");
  const output = await replicate.run("black-forest-labs/flux-kontext-pro", {
    input: {
      prompt:
        "Transform this daytime exterior photo into a beautiful dusk/twilight scene. " +
        "Add warm golden sunset sky with soft clouds. " +
        "Make windows glow with warm interior lighting. " +
        "Add subtle landscape lighting and pathway lights if applicable. " +
        "The sky should transition from deep blue at the top to warm orange/pink at the horizon. " +
        "Keep the building structure, landscaping, and all architectural details PIXEL-PERFECT identical. " +
        "Same camera angle and composition. Professional real estate twilight photography.",
      input_image: imageBase64,
      aspect_ratio: "match_input_image",
      output_format: "jpg",
    },
  });

  const resultUrl = extractUrl(output);
  const response = await fetch(resultUrl);
  const arrayBuf = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuf);

  return `data:image/jpeg;base64,${buffer.toString("base64")}`;
}

/**
 * Replace Sky — swap the sky in an exterior photo.
 */
export async function replaceSky(
  imageBase64: string,
  skyType: string,
): Promise<string> {
  const replicate = getReplicate();

  const skyPrompts: Record<string, string> = {
    sunny:
      "Replace the sky with a beautiful clear sunny sky with bright blue color and a few white fluffy clouds. Bright daylight.",
    sunset:
      "Replace the sky with a stunning sunset sky with warm orange, pink and purple gradients. Golden hour lighting on the building.",
    dramatic:
      "Replace the sky with dramatic clouds and deep blue sky. Moody but impressive atmosphere. Professional dramatic sky.",
    blue:
      "Replace the sky with a perfectly clear bright blue sky. No clouds, pure blue gradient. Clean and fresh look.",
  };

  const skyPrompt = skyPrompts[skyType] || skyPrompts.sunny;

  console.log("[sky] Replacing sky:", skyType);
  const output = await replicate.run("black-forest-labs/flux-kontext-pro", {
    input: {
      prompt:
        skyPrompt +
        " CRITICAL: Keep the building, landscaping, roads, and all ground-level elements PIXEL-PERFECT identical. " +
        "Only change the sky area. Same camera angle and composition. Professional real estate photography.",
      input_image: imageBase64,
      aspect_ratio: "match_input_image",
      output_format: "jpg",
    },
  });

  const resultUrl = extractUrl(output);
  const response = await fetch(resultUrl);
  const arrayBuf = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuf);

  return `data:image/jpeg;base64,${buffer.toString("base64")}`;
}
