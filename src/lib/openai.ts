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
