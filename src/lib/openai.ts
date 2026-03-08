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

/** Shared style prompts for staging and redesign modes (25 styles + custom). */
const STYLE_PROMPTS_STAGE: Record<string, string> = {
  modern:
    "Add modern minimalist furniture: a stylish sofa, coffee table, sleek shelving, pendant lights. Neutral colors with accent pieces, clean lines, contemporary feel.",
  scandinavian:
    "Add Scandinavian style furniture: light wood pieces, white and beige textiles, cozy throws, plants. Warm minimal aesthetic, hygge feeling.",
  loft:
    "Add industrial loft furniture: vintage leather sofa, metal shelving, Edison bulb lighting. Dark wood and metal accents, raw aesthetic.",
  classic:
    "Add classic elegant furniture: traditional pieces with curved lines, rich fabrics, warm wood. Elegant curtains, chandelier lighting, refined atmosphere.",
  japanese:
    "Add Japanese minimalist furniture: low bed/sofa, tatami elements, shoji screens, bonsai plants. Natural materials, zen simplicity, clean open space.",
  minimalist:
    "Add ultra-minimalist furniture: very few pieces, clean surfaces, monochrome palette. Simple bed or sofa, one accent piece, nothing extra.",
  boho:
    "Add bohemian furniture: eclectic mix of patterns, macrame wall hangings, floor cushions, many plants. Warm colors, layered textiles, relaxed vibe.",
  provence:
    "Add Provence-style furniture: whitewashed wood, lavender accents, floral textiles. Vintage charm, soft pastels, French countryside atmosphere.",
  artdeco:
    "Add Art Deco furniture: geometric patterns, gold and black accents, velvet upholstery. Glamorous mirrors, luxury materials, 1920s elegance.",
  hightech:
    "Add high-tech modern furniture: chrome and glass pieces, LED lighting accents, sleek black surfaces. Futuristic, technology-forward aesthetic.",
  country:
    "Add country-style furniture: warm wood pieces, checkered textiles, cozy rugs. Comfortable sofas, rustic shelving, homey atmosphere.",
  eco:
    "Add eco-friendly furniture: natural wood, bamboo elements, linen textiles, many green plants. Sustainable materials, earthy tones, biophilic design.",
  industrial:
    "Add industrial furniture: metal and reclaimed wood pieces, exposed-style shelving, factory-inspired lighting. Urban warehouse aesthetic.",
  mediterranean:
    "Add Mediterranean furniture: terracotta accents, wrought iron details, blue and white textiles. Ceramic tiles, olive branches, coastal warmth.",
  retro:
    "Add retro/vintage furniture: 1960s-70s inspired pieces, bold colors, rounded forms. Vintage lamps, retro patterns, nostalgic atmosphere.",
  neoclassic:
    "Add neoclassical furniture: elegant symmetrical pieces, muted luxury, classical columns influence. Refined fabrics, subtle gold accents, timeless elegance.",
  midcentury:
    "Add mid-century modern furniture: iconic 1950s-60s design, organic curves, wooden legs. Eames-style chairs, teak sideboards, retro-modern feel.",
  coastal:
    "Add coastal-style furniture: white and blue palette, rope accents, driftwood elements. Light fabrics, nautical touches, breezy beach house feel.",
  farmhouse:
    "Add farmhouse furniture: shiplap-style elements, distressed wood, mason jar accents. Comfortable seating, rustic charm, warm hospitality.",
  rustic:
    "Add rustic furniture: raw natural wood, stone accents, thick woolen textiles. Log cabin aesthetic, warm fireplace feel, natural imperfections.",
  glam:
    "Add glamorous furniture: mirrored surfaces, crystal chandeliers, plush velvet. Gold accents, fur throws, Hollywood luxury aesthetic.",
  transitional:
    "Add transitional furniture: blend of traditional and modern, neutral palette, comfortable sophistication. Clean lines with warm wood tones.",
  baroque:
    "Add baroque-style furniture: ornate carved wood, rich brocade fabrics, gold gilding. Dramatic chandelier, heavy curtains, royal palace aesthetic.",
  fusion:
    "Add fusion-style furniture: creative mix of East and West, bold color combinations, eclectic art pieces. Unique personality, cultural blend.",
  ethnic:
    "Add ethnic-style furniture: tribal patterns, handwoven textiles, carved wood accents. Rich colors, global artisan pieces, cultural authenticity.",
};

const STYLE_PROMPTS_REDESIGN: Record<string, string> = {
  modern:
    "Replace the furniture with modern minimalist style: stylish sofa, modern coffee table, sleek shelving, pendant lights. Neutral colors with accent pieces, clean lines.",
  scandinavian:
    "Replace the furniture with Scandinavian style: light wood furniture, white and beige textiles, cozy throws, plants. Warm minimal aesthetic, hygge feeling.",
  loft:
    "Replace the furniture with industrial loft style: vintage leather furniture, metal shelving, Edison bulb lighting. Dark wood and metal accents.",
  classic:
    "Replace the furniture with classic elegant style: traditional furniture with curved lines, rich fabrics, warm wood. Elegant curtains, chandelier lighting.",
  japanese:
    "Replace the furniture with Japanese minimalist style: low furniture, tatami elements, shoji screens, bonsai plants. Natural materials, zen simplicity.",
  minimalist:
    "Replace the furniture with ultra-minimalist style: very few pieces, clean surfaces, monochrome palette. Only essential items, nothing extra.",
  boho:
    "Replace the furniture with bohemian style: eclectic patterns, macrame, floor cushions, plants. Warm colors, layered textiles, relaxed vibe.",
  provence:
    "Replace the furniture with Provence style: whitewashed wood, lavender accents, floral textiles. Vintage charm, soft pastels, French countryside.",
  artdeco:
    "Replace the furniture with Art Deco style: geometric patterns, gold and black, velvet upholstery. Glamorous mirrors, luxury materials.",
  hightech:
    "Replace the furniture with high-tech style: chrome and glass, LED lighting, sleek black surfaces. Futuristic, technology-forward look.",
  country:
    "Replace the furniture with country style: warm wood, checkered textiles, cozy rugs. Comfortable sofas, rustic shelving, homey feel.",
  eco:
    "Replace the furniture with eco style: natural wood, bamboo, linen, many green plants. Sustainable materials, earthy tones, biophilic design.",
  industrial:
    "Replace the furniture with industrial style: metal and reclaimed wood, exposed shelving, factory lighting. Urban warehouse aesthetic.",
  mediterranean:
    "Replace the furniture with Mediterranean style: terracotta, wrought iron, blue and white. Ceramic details, olive branches, coastal warmth.",
  retro:
    "Replace the furniture with retro style: 1960s-70s pieces, bold colors, rounded forms. Vintage lamps, retro patterns, nostalgic feel.",
  neoclassic:
    "Replace the furniture with neoclassical style: elegant symmetry, muted luxury, classical influence. Refined fabrics, subtle gold accents.",
  midcentury:
    "Replace the furniture with mid-century modern style: 1950s-60s design, organic curves, wooden legs. Iconic chairs, teak pieces.",
  coastal:
    "Replace the furniture with coastal style: white and blue palette, rope accents, driftwood. Light fabrics, nautical touches, beach house vibe.",
  farmhouse:
    "Replace the furniture with farmhouse style: shiplap elements, distressed wood, mason jars. Comfortable seating, rustic charm.",
  rustic:
    "Replace the furniture with rustic style: raw natural wood, stone accents, thick wool textiles. Log cabin feel, natural imperfections.",
  glam:
    "Replace the furniture with glamorous style: mirrored surfaces, crystal chandeliers, plush velvet. Gold accents, Hollywood luxury.",
  transitional:
    "Replace the furniture with transitional style: blend of traditional and modern, neutral palette. Clean lines with warm wood tones.",
  baroque:
    "Replace the furniture with baroque style: ornate carved wood, rich brocade, gold gilding. Dramatic chandelier, heavy curtains.",
  fusion:
    "Replace the furniture with fusion style: creative East-West mix, bold colors, eclectic art. Unique personality, cultural blend.",
  ethnic:
    "Replace the furniture with ethnic style: tribal patterns, handwoven textiles, carved wood. Rich colors, global artisan pieces.",
};

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
  style: string,
  customStyle?: string,
): Promise<string> {
  const replicate = getReplicate();

  let stylePrompt: string;
  if (style === "custom" && customStyle) {
    stylePrompt = `Add furniture in the following style: ${customStyle}. Make it look professional and realistic.`;
  } else {
    stylePrompt = STYLE_PROMPTS_STAGE[style] || STYLE_PROMPTS_STAGE.modern;
  }

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
  style: string,
  customStyle?: string,
): Promise<string> {
  const replicate = getReplicate();

  let stylePrompt: string;
  if (style === "custom" && customStyle) {
    stylePrompt = `Replace the furniture with this style: ${customStyle}. Make it look professional and realistic.`;
  } else {
    stylePrompt = STYLE_PROMPTS_REDESIGN[style] || STYLE_PROMPTS_REDESIGN.modern;
  }

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
          { type: "image_url", image_url: { url: imgSrc, detail: "low" } },
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

/**
 * Score photo — GPT-4o Vision rates the real estate photo quality 1-10 with recommendations.
 */
export async function scorePhoto(imageBase64: string): Promise<string> {
  const imgSrc = await compressForAnalysis(imageBase64);

  console.log("[score] Scoring photo quality...");

  const text = await openaiChatViaProxy(
    [
      {
        role: "user",
        content: [
          { type: "image_url", image_url: { url: imgSrc, detail: "low" } },
          {
            type: "text",
            text: `Ты — эксперт по фотографии недвижимости. Оцени это фото квартиры/дома по шкале от 1 до 10.

Критерии оценки:
1. Освещение (яркость, естественный свет, тени)
2. Композиция (ракурс, симметрия, охват комнаты)
3. Порядок (чистота, отсутствие бардака, подготовка к съёмке)
4. Качество (резкость, баланс белого)
5. Привлекательность (насколько фото продаёт объект)

Формат ответа:

ОЦЕНКА: X/10

КРИТЕРИИ:
- Освещение: X/10
- Композиция: X/10
- Порядок: X/10
- Качество: X/10
- Привлекательность: X/10

СИЛЬНЫЕ СТОРОНЫ:
- пункт 1
- пункт 2

ЧТО УЛУЧШИТЬ:
- конкретная рекомендация 1
- конкретная рекомендация 2
- конкретная рекомендация 3

РЕКОМЕНДУЕМЫЕ РЕЖИМЫ GPT ESTATE:
- режим: зачем использовать

Пиши на русском. Будь конкретен и полезен. Давай практичные советы.`,
          },
        ],
      },
    ],
    1000,
  );

  return text;
}

/**
 * Analyze room — GPT-4o Vision identifies room characteristics for listing auto-fill.
 */
export async function analyzeRoom(imageBase64: string): Promise<string> {
  const imgSrc = await compressForAnalysis(imageBase64);

  console.log("[analyze] Analyzing room characteristics...");

  const text = await openaiChatViaProxy(
    [
      {
        role: "user",
        content: [
          { type: "image_url", image_url: { url: imgSrc, detail: "low" } },
          {
            type: "text",
            text: `Ты — эксперт по недвижимости. Проанализируй это фото и определи все характеристики помещения.

Заполни каждый раздел:

ТИП ПОМЕЩЕНИЯ: (кухня / спальня / гостиная / ванная / прихожая / балкон / студия / офис)

ПЛОЩАДЬ (примерно): X м²

РЕМОНТ: (евроремонт / хороший / косметический / требует ремонта / черновая отделка)

СТИЛЬ: (если определяется)

ОТДЕЛКА:
- Стены: материал, цвет, состояние
- Пол: материал, цвет, состояние
- Потолок: тип, примерная высота

МЕБЕЛЬ И ТЕХНИКА:
- перечислить всё, что видно на фото

ОКНА:
- Количество, тип (пластиковые/деревянные), состояние

ОСВЕЩЕНИЕ:
- Естественное, искусственное, тип светильников

ДОСТОИНСТВА:
- что привлечёт покупателя

НЕДОСТАТКИ:
- что может оттолкнуть

РЕКОМЕНДАЦИИ ДЛЯ ПРОДАЖИ:
- что улучшить перед показом/фото
- какие режимы GPT Estate использовать

Пиши на русском. Если что-то не определяется — напиши "не видно на фото".`,
          },
        ],
      },
    ],
    1200,
  );

  return text;
}

/**
 * Renovate room — virtual wall/floor replacement using Flux Kontext Pro.
 */
export async function renovateRoom(
  imageBase64: string,
  renovationType: string,
): Promise<string> {
  const replicate = getReplicate();

  const renovationPrompts: Record<string, string> = {
    white_walls:
      "Repaint all walls to clean bright white color. Smooth matte finish. Fresh, clean, bright white walls throughout the room.",
    beige_walls:
      "Repaint all walls to warm beige/cream color. Smooth finish. Elegant, warm, inviting beige tone throughout the room.",
    gray_walls:
      "Repaint all walls to modern light gray color. Smooth matte finish. Contemporary, sophisticated light gray walls.",
    laminate:
      "Replace the floor with modern light oak laminate flooring. Clean, uniform planks, modern laminate with natural wood pattern.",
    tile:
      "Replace the floor with modern large-format light gray porcelain tiles. Clean even grout lines, contemporary polished tile floor.",
    parquet:
      "Replace the floor with classic herringbone parquet in warm natural oak color. Elegant, traditional herringbone parquet flooring.",
    full_light:
      "Complete light renovation: repaint all walls pure white, replace floor with light oak laminate. Clean modern white baseboards. Fresh, bright, modern renovation.",
    full_dark:
      "Complete dark renovation: paint all walls sophisticated dark charcoal gray, replace floor with dark walnut laminate. Modern dark baseboards. Dramatic, modern, sophisticated look.",
  };

  const renovationPrompt = renovationPrompts[renovationType] || renovationPrompts.white_walls;

  console.log("[renovation] Type:", renovationType);
  const output = await replicate.run("black-forest-labs/flux-kontext-pro", {
    input: {
      prompt:
        "Virtual renovation of this room. " + renovationPrompt +
        " CRITICAL: Keep ALL furniture, fixtures, appliances, windows, window frames, doors, " +
        "ceiling, light fixtures, and room layout PIXEL-PERFECT identical. " +
        "Only change the walls and/or floor as specified. " +
        "Keep the same camera angle, perspective, and lighting. Professional real estate photo.",
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
