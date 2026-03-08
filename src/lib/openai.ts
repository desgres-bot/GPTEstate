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
 * Generate checklist — GPT-4o Vision analyzes photo and creates a pre-sale preparation checklist.
 */
export async function generateChecklist(imageBase64: string): Promise<string> {
  const imgSrc = await compressForAnalysis(imageBase64);

  console.log("[checklist] Generating preparation checklist...");

  const text = await openaiChatViaProxy(
    [
      {
        role: "user",
        content: [
          { type: "image_url", image_url: { url: imgSrc, detail: "low" } },
          {
            type: "text",
            text: `Ты — опытный риелтор-стейджер с 15-летним стажем. Проанализируй это фото квартиры/дома и составь подробный чеклист подготовки к продаже.

Формат ответа:

ЧЕКЛИСТ ПОДГОТОВКИ К ПРОДАЖЕ

СРОЧНО (влияет на цену):
☐ конкретное действие — как это влияет на цену, примерный бюджет
☐ ...

ПЕРЕД ПОКАЗОМ:
☐ конкретное действие — почему это важно
☐ ...

ДЛЯ ФОТОСЪЁМКИ:
☐ конкретный совет — как сделать лучше
☐ ...

РЕКОМЕНДУЕМЫЕ РЕЖИМЫ GPT ESTATE:
- режим: что он даст для этого объекта

ПОТЕНЦИАЛЬНЫЙ ПРИРОСТ СТОИМОСТИ:
- Общая оценка: +X-Y тыс. ₽ при бюджете ~Z тыс. ₽

Правила:
1. Пиши на русском
2. Анализируй только то, что ВИДНО на фото
3. Давай конкретные суммы в рублях (примерные)
4. Минимум 3 пункта в каждой секции
5. Указывай что улучшить и ПОЧЕМУ это важно для продажи
6. В "Для фотосъёмки" рекомендуй конкретные режимы GPT Estate (Уборка, Новый стиль, Ремонт и т.д.)
7. Если видишь серьёзные проблемы — не молчи, укажи прямо`,
          },
        ],
      },
    ],
    1500,
  );

  return text;
}

/**
 * Generate full listing — GPT-4o Vision creates a complete listing package
 * (titles, description, features, tags) for a real estate platform.
 */
export async function generateListing(
  imageBase64: string,
  platform: string,
): Promise<string> {
  const imgSrc = await compressForAnalysis(imageBase64);

  const platformNames: Record<string, string> = {
    avito: "Авито",
    cian: "ЦИАН",
    domclick: "ДомКлик",
  };

  const platformName = platformNames[platform] || "Авито";

  console.log("[listing] Generating full listing for", platformName);

  const text = await openaiChatViaProxy(
    [
      {
        role: "user",
        content: [
          { type: "image_url", image_url: { url: imgSrc, detail: "low" } },
          {
            type: "text",
            text: `Ты — лучший копирайтер ${platformName} с конверсией описаний 95%. Проанализируй фото квартиры и создай ПОЛНОЕ объявление, готовое для публикации.

Формат ответа:

ЗАГОЛОВКИ (3 варианта, до 50 символов каждый):
1. [цепляющий заголовок с ключевыми деталями]
2. [заголовок с акцентом на преимущества]
3. [эмоциональный заголовок]

ОПИСАНИЕ (800-1200 символов):
[Полный текст описания. Начни с самого привлекательного. Опиши комнату, ремонт, планировку, свет. Добавь эмоции и выгоды. Закончи призывом к действию. Формат оптимизирован для ${platformName}.]

ПРЕИМУЩЕСТВА:
• [достоинство 1]
• [достоинство 2]
• [достоинство 3]
• [достоинство 4]
• [достоинство 5]
• [достоинство 6]

ТЕГИ:
#тег1 #тег2 #тег3 #тег4 #тег5 #тег6 #тег7 #тег8

Правила:
1. Пиши на русском
2. Описывай только то, что ВИДНО на фото (не придумывай метраж и этаж)
3. Не упоминай цену
4. Теги должны быть релевантны для ${platformName}
5. Используй продающий стиль, создавай срочность
6. Каждый заголовок — уникальный подход (факт, выгода, эмоция)
7. В описании используй короткие абзацы для удобного чтения
8. Преимущества — только то, что реально видно на фото`,
          },
        ],
      },
    ],
    2000,
  );

  return text;
}

/**
 * Compare styles — generates 4 redesigns of the same room in different styles.
 * Uses Promise.all for parallel execution.
 */
export async function compareStyles(
  imageBase64: string,
  styles: string[],
): Promise<string[]> {
  console.log("[compare] Generating", styles.length, "style variants...");

  const results = await Promise.all(
    styles.map(async (style) => {
      console.log("[compare] Starting style:", style);
      const result = await redesignRoom(imageBase64, style);
      console.log("[compare] Completed style:", style);
      return result;
    }),
  );

  return results;
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

/**
 * Change exterior style — transform building facade to a different architectural style.
 */
export async function changeExterior(
  imageBase64: string,
  exteriorStyle: string,
  customExterior?: string,
): Promise<string> {
  const replicate = getReplicate();

  const exteriorPrompts: Record<string, string> = {
    modern:
      "Transform this building exterior to modern contemporary style: clean geometric lines, large windows, flat roof or subtle angles, combination of glass, concrete and wood cladding. Minimalist, sleek facade.",
    classic:
      "Transform this building exterior to classic traditional style: symmetrical facade, elegant moldings, crown details, traditional windows with shutters, warm neutral colors. Timeless, refined look.",
    minimalist:
      "Transform this building exterior to ultra-minimalist style: pure white or light gray walls, no ornaments, floor-to-ceiling windows, clean surfaces. Stark, pristine appearance.",
    scandinavian:
      "Transform this building exterior to Scandinavian style: light wood cladding, white/gray tones, large windows, simple gable roof. Clean, natural Nordic look with greenery.",
    mediterranean:
      "Transform this building exterior to Mediterranean style: terracotta roof tiles, stucco walls in warm cream/beige, arched windows, wrought iron details. Sun-kissed coastal villa look.",
    craftsman:
      "Transform this building exterior to Craftsman style: wide front porch with columns, natural stone or wood siding, exposed rafters, earth-tone colors. Warm, handcrafted character.",
    colonial:
      "Transform this building exterior to Colonial style: symmetrical design, centered entrance with columns, dormer windows, brick or clapboard siding. Stately, dignified appearance.",
  };

  let prompt: string;
  if (exteriorStyle === "custom" && customExterior) {
    prompt = `Transform this building exterior in the following style: ${customExterior}. Make it look professional and realistic.`;
  } else {
    prompt = exteriorPrompts[exteriorStyle] || exteriorPrompts.modern;
  }

  console.log("[exterior] Style:", exteriorStyle);
  const extOutput = await replicate.run("black-forest-labs/flux-kontext-pro", {
    input: {
      prompt:
        prompt +
        " CRITICAL: Keep the building's overall shape, size, roof line, driveway, trees and landscaping IDENTICAL. " +
        "Only change the facade materials, colors, and architectural details. " +
        "Keep the same camera angle, perspective, and sky. Professional real estate photography.",
      input_image: imageBase64,
      aspect_ratio: "match_input_image",
      output_format: "jpg",
    },
  });

  const extUrl = extractUrl(extOutput);
  const extResp = await fetch(extUrl);
  const extBuf = await extResp.arrayBuffer();
  return `data:image/jpeg;base64,${Buffer.from(extBuf).toString("base64")}`;
}

/**
 * Landscape design — add landscaping, gardens, patios, etc.
 */
export async function designLandscape(
  imageBase64: string,
  landscapeType: string,
): Promise<string> {
  const replicate = getReplicate();

  const landscapePrompts: Record<string, string> = {
    garden: "Add beautiful garden landscaping: colorful flower beds, ornamental shrubs, stone edging, mulch paths.",
    lawn: "Add a perfect green lawn: thick, evenly trimmed grass, clean edges, healthy vibrant green color.",
    patio: "Add an elegant outdoor patio area: stone or wood deck, modern outdoor furniture, string lights, potted plants.",
    pool: "Add a beautiful swimming pool: rectangular pool with clear blue water, stone coping, sun loungers, surrounding greenery.",
    lights: "Add professional landscape lighting: pathway lights, up-lighting on trees, accent lights on facade, warm ambient glow.",
    full: "Complete landscape makeover: manicured lawn, flower beds, stone pathway, decorative trees, outdoor lighting, clean driveway.",
  };

  const landscapePrompt = landscapePrompts[landscapeType] || landscapePrompts.full;

  console.log("[landscape] Type:", landscapeType);
  const lndOutput = await replicate.run("black-forest-labs/flux-kontext-pro", {
    input: {
      prompt:
        "Landscape design for this property. " + landscapePrompt +
        " CRITICAL: Keep the building structure, windows, doors, roof, and all architectural elements PIXEL-PERFECT identical. " +
        "Only add/improve the landscaping and outdoor elements. " +
        "Keep the same camera angle and sky. Professional real estate photography.",
      input_image: imageBase64,
      aspect_ratio: "match_input_image",
      output_format: "jpg",
    },
  });

  const lndUrl = extractUrl(lndOutput);
  const lndResp = await fetch(lndUrl);
  const lndBuf = await lndResp.arrayBuffer();
  return `data:image/jpeg;base64,${Buffer.from(lndBuf).toString("base64")}`;
}

/**
 * Change wall color — repaint walls to a specific color.
 */
export async function changeWallColor(
  imageBase64: string,
  wallColor: string,
  customColor?: string,
): Promise<string> {
  const replicate = getReplicate();

  const colorPrompts: Record<string, string> = {
    white: "Repaint all walls to clean bright pure white. Smooth matte finish, crisp and fresh.",
    beige: "Repaint all walls to warm beige/cream tone. Soft, warm, inviting atmosphere.",
    gray: "Repaint all walls to modern light gray. Sophisticated, contemporary, neutral.",
    blue: "Repaint all walls to soft sky blue. Calming, serene, airy feeling.",
    green: "Repaint all walls to olive green. Natural, earthy, warm and grounding.",
    terracotta: "Repaint all walls to warm terracotta. Rich, Mediterranean, warm and bold.",
    lavender: "Repaint all walls to soft lavender. Delicate, calming, romantic atmosphere.",
    sage: "Repaint all walls to sage green. Muted, organic, subtle and sophisticated.",
    navy: "Repaint all walls to deep navy blue. Bold, dramatic, elegant statement.",
  };

  let colorPrompt: string;
  if (wallColor === "custom" && customColor) {
    colorPrompt = `Repaint all walls to the following color: ${customColor}. Smooth finish.`;
  } else {
    colorPrompt = colorPrompts[wallColor] || colorPrompts.white;
  }

  console.log("[wallcolor] Color:", wallColor);
  const wcOutput = await replicate.run("black-forest-labs/flux-kontext-pro", {
    input: {
      prompt:
        "Wall color change in this room. " + colorPrompt +
        " CRITICAL: Keep ALL furniture, fixtures, appliances, windows, window frames, doors, " +
        "ceiling, floor, light fixtures, and room layout PIXEL-PERFECT identical. " +
        "Only change the wall color. Keep the same camera angle, perspective, and lighting.",
      input_image: imageBase64,
      aspect_ratio: "match_input_image",
      output_format: "jpg",
    },
  });

  const wcUrl = extractUrl(wcOutput);
  const wcResp = await fetch(wcUrl);
  const wcBuf = await wcResp.arrayBuffer();
  return `data:image/jpeg;base64,${Buffer.from(wcBuf).toString("base64")}`;
}

/**
 * Improve lighting — fix dark, underexposed photos.
 */
export async function improveLighting(imageBase64: string): Promise<string> {
  const replicate = getReplicate();

  console.log("[lighting] Improving lighting...");
  const litOutput = await replicate.run("black-forest-labs/flux-kontext-pro", {
    input: {
      prompt:
        "Improve the lighting in this real estate photo. " +
        "Brighten dark areas and shadows. Balance the exposure evenly across the entire room. " +
        "Make windows show a pleasant outdoor view (not blown out white). " +
        "Add natural-looking warm fill light to dark corners. " +
        "The result should look like a professionally lit real estate photo with HDR quality. " +
        "CRITICAL: Keep ALL furniture, walls, decor, floor, and room layout PIXEL-PERFECT identical. " +
        "Only improve the lighting and exposure. Same camera angle and composition.",
      input_image: imageBase64,
      aspect_ratio: "match_input_image",
      output_format: "jpg",
    },
  });

  const litUrl = extractUrl(litOutput);
  const litResp = await fetch(litUrl);
  const litBuf = await litResp.arrayBuffer();
  return `data:image/jpeg;base64,${Buffer.from(litBuf).toString("base64")}`;
}

/**
 * Fix perspective — correct vertical lines and lens distortion.
 */
export async function fixPerspective(imageBase64: string): Promise<string> {
  const replicate = getReplicate();

  console.log("[perspective] Correcting perspective...");
  const persOutput = await replicate.run("black-forest-labs/flux-kontext-pro", {
    input: {
      prompt:
        "Correct the perspective distortion in this real estate photo. " +
        "Make all vertical lines perfectly vertical (walls, door frames, window frames). " +
        "Fix the horizon line to be perfectly level. " +
        "Correct any wide-angle lens barrel distortion. " +
        "The result should look like it was taken with a professional tilt-shift lens. " +
        "CRITICAL: Keep ALL room contents, furniture, colors, lighting PIXEL-PERFECT identical. " +
        "Only correct the geometric perspective.",
      input_image: imageBase64,
      aspect_ratio: "match_input_image",
      output_format: "jpg",
    },
  });

  const persUrl = extractUrl(persOutput);
  const persResp = await fetch(persUrl);
  const persBuf = await persResp.arrayBuffer();
  return `data:image/jpeg;base64,${Buffer.from(persBuf).toString("base64")}`;
}

/**
 * Upscale image — increase resolution using AI super-resolution model.
 */
export async function upscaleImage(imageBase64: string): Promise<string> {
  const replicate = getReplicate();

  console.log("[upscale] Upscaling image...");
  const upOutput = await replicate.run(
    "nightmareai/real-esrgan:f121d640bd286e1fdc67f9799164c1d5be36ff74576ee11c803ae5b665dd46aa",
    {
      input: {
        image: imageBase64,
        scale: 2,
        face_enhance: false,
      },
    },
  );

  const upUrl = extractUrl(upOutput);
  const upResp = await fetch(upUrl);
  const upBuf = await upResp.arrayBuffer();
  return `data:image/jpeg;base64,${Buffer.from(upBuf).toString("base64")}`;
}

/**
 * Remove watermark — remove logos, watermarks, text overlays from photos.
 */
export async function removeWatermark(imageBase64: string): Promise<string> {
  const replicate = getReplicate();

  console.log("[watermark] Removing watermark...");
  const wmOutput = await replicate.run("black-forest-labs/flux-kontext-pro", {
    input: {
      prompt:
        "Remove all watermarks, logos, text overlays, dates, and stamps from this photo. " +
        "Replace the removed areas with clean background that matches the surrounding area seamlessly. " +
        "The result should be a clean photo with no visible text, logos, or watermarks. " +
        "CRITICAL: Keep ALL other elements PIXEL-PERFECT identical — furniture, walls, " +
        "floors, windows, lighting, colors. Same camera angle and composition.",
      input_image: imageBase64,
      aspect_ratio: "match_input_image",
      output_format: "jpg",
    },
  });

  const wmUrl = extractUrl(wmOutput);
  const wmResp = await fetch(wmUrl);
  const wmBuf = await wmResp.arrayBuffer();
  return `data:image/jpeg;base64,${Buffer.from(wmBuf).toString("base64")}`;
}

/**
 * Replace specific furniture — swap out a described furniture piece for a new one.
 */
export async function replaceFurniture(
  imageBase64: string,
  description: string,
): Promise<string> {
  const replicate = getReplicate();

  console.log("[furnish] Replacing furniture:", description.substring(0, 100));
  const frnOutput = await replicate.run("black-forest-labs/flux-kontext-pro", {
    input: {
      prompt:
        `Edit this room photo: ${description}. ` +
        "The replacement should look natural and realistic, matching the room's style and lighting. " +
        "CRITICAL: Keep everything else PIXEL-PERFECT identical — walls, floors, " +
        "other furniture, windows, lighting. Same camera angle and composition.",
      input_image: imageBase64,
      aspect_ratio: "match_input_image",
      output_format: "jpg",
    },
  });

  const frnUrl = extractUrl(frnOutput);
  const frnResp = await fetch(frnUrl);
  const frnBuf = await frnResp.arrayBuffer();
  return `data:image/jpeg;base64,${Buffer.from(frnBuf).toString("base64")}`;
}

/**
 * Generate social media post — create a ready-to-publish post for Instagram/VK/Telegram.
 */
export async function generateSocialPost(
  imageBase64: string,
  socialPlatform: string,
): Promise<string> {
  const imgSrc = await compressForAnalysis(imageBase64);

  const platformNames: Record<string, string> = {
    instagram: "Instagram",
    vk: "ВКонтакте",
    telegram: "Telegram",
    facebook: "Facebook",
  };

  const platformFormats: Record<string, string> = {
    instagram: "Формат: 2-3 коротких абзаца, эмодзи в начале каждого, 20-30 хештегов в конце. Стиль — визуальный и эмоциональный.",
    vk: "Формат: 3-4 абзаца, умеренное использование эмодзи, 5-10 хештегов. Стиль — дружелюбный и информативный.",
    telegram: "Формат: 2-3 коротких абзаца, минимум эмодзи, без хештегов, ссылка в конце. Стиль — лаконичный и информативный.",
    facebook: "Формат: 2-3 абзаца, умеренно эмодзи, 5-10 хештегов. Стиль — профессиональный и продающий.",
  };

  const platformName = platformNames[socialPlatform] || "Instagram";
  const formatGuide = platformFormats[socialPlatform] || platformFormats.instagram;

  console.log("[social] Generating post for", platformName);

  const text = await openaiChatViaProxy(
    [
      {
        role: "user",
        content: [
          { type: "image_url", image_url: { url: imgSrc, detail: "low" } },
          {
            type: "text",
            text: `Ты — SMM-специалист для риелтора. Создай готовый пост для ${platformName} по этому фото квартиры/дома.

${formatGuide}

Требования:
1. Пиши на русском
2. Начни с цепляющей первой строки (hook)
3. Опиши ключевые достоинства объекта по фото
4. Добавь эмоциональный призыв к действию
5. Не упоминай цену (риелтор добавит сам)
6. Текст должен быть готов к копированию и публикации
7. Хештеги должны быть релевантны для ${platformName} и недвижимости

Формат ответа — только текст поста с хештегами, без пояснений.`,
          },
        ],
      },
    ],
    1500,
  );

  return text;
}

/**
 * Describe floor plan — analyze photo and describe the room layout.
 */
export async function describeFloorPlan(imageBase64: string): Promise<string> {
  // Use higher resolution for floor plan analysis — need to see room details
  const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");
  const compressed = await sharp(buffer)
    .resize(512, 512, { fit: "inside" })
    .jpeg({ quality: 50 })
    .toBuffer();
  const imgSrc = `data:image/jpeg;base64,${compressed.toString("base64")}`;

  console.log("[floorplan] Describing floor plan... Image size:", compressed.length);

  const text = await openaiChatViaProxy(
    [
      {
        role: "user",
        content: [
          { type: "image_url", image_url: { url: imgSrc, detail: "low" } },
          {
            type: "text",
            text: `Ты — эксперт-архитектор. Проанализируй это фото помещения и заполни каждый раздел:

ПЛАНИРОВКА ПОМЕЩЕНИЯ

ТИП: (студия / 1-комнатная / 2-комнатная / комната / кухня / ванная / офис)

ПРИМЕРНЫЕ РАЗМЕРЫ:
- Общая площадь: ~X м²
- Длина: ~X м, Ширина: ~X м, Высота потолков: ~X м

РАСПОЛОЖЕНИЕ:
- Окна: количество, размер
- Двери: количество, расположение
- Зонирование: описание функциональных зон

ОСОБЕННОСТИ ПЛАНИРОВКИ:
- Форма помещения
- Наличие ниш, выступов, колонн
- Балкон/лоджия

РЕКОМЕНДАЦИИ ПО МЕБЛИРОВКЕ:
- Оптимальная расстановка мебели
- Что учесть при планировке

ТЕКСТ ДЛЯ ОБЪЯВЛЕНИЯ:
[Готовый абзац с описанием планировки для Авито/ЦИАН]

Пиши на русском. Размеры определяй по видимым предметам (диван ~2м, дверь ~2м высотой). Если что-то не видно — пиши "не видно на фото".`,
          },
        ],
      },
    ],
    1500,
  );

  return text;
}

/**
 * Change flooring — replace floor type in a room photo.
 */
export async function changeFlooring(
  imageBase64: string,
  flooringType: string,
  customFlooring?: string,
): Promise<string> {
  const replicate = getReplicate();

  const floorPrompts: Record<string, string> = {
    laminate: "Replace the floor with new light oak laminate flooring with realistic wood grain texture",
    parquet: "Replace the floor with herringbone parquet flooring in warm walnut tone",
    tile: "Replace the floor with large format porcelain tile in light gray color",
    marble: "Replace the floor with polished white marble flooring with subtle gray veining",
    vinyl: "Replace the floor with luxury vinyl plank flooring in light ash color",
    concrete: "Replace the floor with polished concrete floor with smooth finish",
    carpet: "Replace the floor with wall-to-wall plush carpet in neutral beige color",
  };

  const prompt = customFlooring || floorPrompts[flooringType] || floorPrompts.laminate;

  console.log("[flooring] Changing floor to:", flooringType);
  const flrOutput = await replicate.run("black-forest-labs/flux-kontext-pro", {
    input: {
      prompt:
        prompt +
        " CRITICAL: Keep ALL furniture, fixtures, walls, ceiling, windows, doors, and room layout PIXEL-PERFECT identical. " +
        "Only change the floor. Same camera angle and composition. Professional real estate photography.",
      input_image: imageBase64,
      aspect_ratio: "match_input_image",
      output_format: "jpg",
    },
  });

  const flrUrl = extractUrl(flrOutput);
  const flrResp = await fetch(flrUrl);
  const flrBuf = await flrResp.arrayBuffer();
  return `data:image/jpeg;base64,${Buffer.from(flrBuf).toString("base64")}`;
}

/**
 * Change kitchen — transform kitchen cabinets and style.
 */
export async function changeKitchen(
  imageBase64: string,
  kitchenStyle: string,
  customKitchen?: string,
): Promise<string> {
  const replicate = getReplicate();

  const kitchenPrompts: Record<string, string> = {
    modern_white: "Transform the kitchen cabinets to modern flat-panel white cabinets with quartz countertop and subway tile backsplash",
    modern_dark: "Transform the kitchen cabinets to modern flat-panel dark charcoal cabinets with dark stone countertop",
    classic_wood: "Transform the kitchen cabinets to classic raised-panel natural wood cabinets with granite countertop",
    scandinavian: "Transform the kitchen to Scandinavian style with light wood cabinets, white countertop, minimal design",
    industrial: "Transform the kitchen to industrial style with dark metal and wood cabinets, concrete countertop, exposed hardware",
    shaker: "Transform the kitchen cabinets to white shaker-style cabinets with butcher block countertop",
  };

  const prompt = customKitchen || kitchenPrompts[kitchenStyle] || kitchenPrompts.modern_white;

  console.log("[kitchen] Changing kitchen style to:", kitchenStyle);
  const kitOutput = await replicate.run("black-forest-labs/flux-kontext-pro", {
    input: {
      prompt:
        prompt +
        " CRITICAL: Keep the room layout, floor, ceiling, windows, doors, and appliances positions PIXEL-PERFECT identical. " +
        "Only change kitchen cabinets, countertops, and backsplash. Same camera angle and composition. Professional real estate photography.",
      input_image: imageBase64,
      aspect_ratio: "match_input_image",
      output_format: "jpg",
    },
  });

  const kitUrl = extractUrl(kitOutput);
  const kitResp = await fetch(kitUrl);
  const kitBuf = await kitResp.arrayBuffer();
  return `data:image/jpeg;base64,${Buffer.from(kitBuf).toString("base64")}`;
}

/**
 * Change season — transform exterior photo to a different season.
 */
export async function changeSeason(
  imageBase64: string,
  seasonType: string,
): Promise<string> {
  const replicate = getReplicate();

  const seasonPrompts: Record<string, string> = {
    spring: "Transform to spring season: green leaves, blooming flowers, fresh green grass, bright daylight",
    summer: "Transform to peak summer: lush green trees, bright sunshine, blue sky, vibrant green lawn",
    autumn: "Transform to autumn: orange and red foliage, fallen leaves on the ground, warm golden light",
    winter: "Transform to winter: snow covering the roof and ground, bare trees with frost, winter atmosphere",
  };

  const prompt = seasonPrompts[seasonType] || seasonPrompts.summer;

  console.log("[season] Changing season to:", seasonType);
  const ssnOutput = await replicate.run("black-forest-labs/flux-kontext-pro", {
    input: {
      prompt:
        prompt +
        " CRITICAL: Keep the building structure, architecture, roads, and all man-made elements PIXEL-PERFECT identical. " +
        "Only change vegetation, sky, and seasonal elements. Same camera angle and composition. Professional real estate photography.",
      input_image: imageBase64,
      aspect_ratio: "match_input_image",
      output_format: "jpg",
    },
  });

  const ssnUrl = extractUrl(ssnOutput);
  const ssnResp = await fetch(ssnUrl);
  const ssnBuf = await ssnResp.arrayBuffer();
  return `data:image/jpeg;base64,${Buffer.from(ssnBuf).toString("base64")}`;
}

/**
 * Add decor — add holiday or themed decorations to a room.
 */
export async function addDecor(
  imageBase64: string,
  decorType: string,
): Promise<string> {
  const replicate = getReplicate();

  const decorPrompts: Record<string, string> = {
    newyear: "Add New Year holiday decorations: Christmas tree, garlands with lights, festive ornaments, cozy winter atmosphere",
    christmas: "Add Christmas decorations: decorated tree, wreaths, stockings, warm firelight, festive red and green decor",
    halloween: "Add Halloween decorations: carved pumpkins, spider webs, orange and black decor, spooky candles",
    easter: "Add Easter decorations: colorful eggs, spring flowers, pastel colors, bunny figurines",
    birthday: "Add birthday party decorations: colorful balloons, banner, gift boxes, festive table setting",
    romantic: "Add romantic decorations: rose petals, candles, soft pink lighting, heart-shaped elements",
  };

  const prompt = decorPrompts[decorType] || decorPrompts.newyear;

  console.log("[decor] Adding decor:", decorType);
  const decOutput = await replicate.run("black-forest-labs/flux-kontext-pro", {
    input: {
      prompt:
        prompt +
        " CRITICAL: Keep the room structure, walls, floor, ceiling, windows, doors, and existing furniture PIXEL-PERFECT identical. " +
        "Only ADD decorative elements. Same camera angle and composition. Professional real estate photography.",
      input_image: imageBase64,
      aspect_ratio: "match_input_image",
      output_format: "jpg",
    },
  });

  const decUrl = extractUrl(decOutput);
  const decResp = await fetch(decUrl);
  const decBuf = await decResp.arrayBuffer();
  return `data:image/jpeg;base64,${Buffer.from(decBuf).toString("base64")}`;
}

/**
 * Stage commercial — transform empty space into a commercial interior.
 */
export async function stageCommercial(
  imageBase64: string,
  commercialType: string,
): Promise<string> {
  const replicate = getReplicate();

  const commercialPrompts: Record<string, string> = {
    office: "Transform into a modern professional office space with desks, ergonomic chairs, computers, meeting area, plants",
    restaurant: "Transform into an upscale restaurant with dining tables, chairs, ambient lighting, bar area, decorative elements",
    cafe: "Transform into a cozy cafe with small tables, counter with espresso machine, menu boards, pendant lighting",
    retail: "Transform into a modern retail store with display shelves, racks, checkout counter, good lighting",
    hotel: "Transform into a luxury hotel room with king bed, nightstands, seating area, elegant decor, artwork",
    coworking: "Transform into a modern coworking space with shared desks, lounge area, phone booths, plants, whiteboards",
    gym: "Transform into a modern gym with exercise equipment, mirrors, rubber flooring, good lighting",
    salon: "Transform into a beauty salon with styling stations, mirrors, salon chairs, wash basins, modern decor",
  };

  const prompt = commercialPrompts[commercialType] || commercialPrompts.office;

  console.log("[commercial] Staging commercial:", commercialType);
  const comOutput = await replicate.run("black-forest-labs/flux-kontext-pro", {
    input: {
      prompt:
        prompt +
        " CRITICAL: Keep the room structure, walls, ceiling, windows, doors, and architectural elements PIXEL-PERFECT identical. " +
        "Only add furniture and equipment appropriate for the space. Same camera angle and composition. Professional real estate photography.",
      input_image: imageBase64,
      aspect_ratio: "match_input_image",
      output_format: "jpg",
    },
  });

  const comUrl = extractUrl(comOutput);
  const comResp = await fetch(comUrl);
  const comBuf = await comResp.arrayBuffer();
  return `data:image/jpeg;base64,${Buffer.from(comBuf).toString("base64")}`;
}

/**
 * Check compliance — analyze photo for marketplace publishing readiness.
 */
export async function checkCompliance(imageBase64: string): Promise<string> {
  const imgSrc = await compressForAnalysis(imageBase64);

  console.log("[compliance] Checking photo compliance...");

  const text = await openaiChatViaProxy(
    [
      {
        role: "user",
        content: [
          { type: "image_url", image_url: { url: imgSrc, detail: "low" } },
          {
            type: "text",
            text: `Ты — эксперт по публикации фото недвижимости на площадках Авито, ЦИАН, ДомКлик. Проверь это фото и заполни каждый пункт:

ПРОВЕРКА ФОТО ДЛЯ ПЛОЩАДОК

ОБЩИЙ СТАТУС: ✅ Готово к публикации / ⚠️ Нужны улучшения / ❌ Не публиковать

ЯРКОСТЬ И ЭКСПОЗИЦИЯ: (✅/⚠️/❌) — описание
РЕЗКОСТЬ И ФОКУС: (✅/⚠️/❌) — описание
КОМПОЗИЦИЯ И РАКУРС: (✅/⚠️/❌) — описание
ПОРЯДОК В КАДРЕ: (✅/⚠️/❌) — описание
ЦВЕТОПЕРЕДАЧА: (✅/⚠️/❌) — описание
ВОДЯНЫЕ ЗНАКИ/ТЕКСТ: (✅/⚠️/❌) — есть ли лишний текст
РАЗМЕР И РАЗРЕШЕНИЕ: (✅/⚠️/❌) — достаточно ли для площадки
ВЕРТИКАЛИ: (✅/⚠️/❌) — ровные ли стены

РЕКОМЕНДАЦИИ:
- конкретное действие 1
- конкретное действие 2

РЕКОМЕНДУЕМЫЕ СЕРВИСЫ GPT ESTATE:
- режим: зачем использовать

Пиши на русском. Будь строг — лучше указать на проблему, чем пропустить.`,
          },
        ],
      },
    ],
    1000,
  );

  return text;
}

/**
 * Render from text — transform room based on free-text description.
 */
export async function renderFromText(
  imageBase64: string,
  textrenderPrompt: string,
): Promise<string> {
  const replicate = getReplicate();

  console.log("[textrender] Rendering from prompt:", textrenderPrompt.substring(0, 100));
  const txtOutput = await replicate.run("black-forest-labs/flux-kontext-pro", {
    input: {
      prompt:
        `Transform this room completely based on description: ${textrenderPrompt}. ` +
        "Make it photorealistic, professional real estate photography style. " +
        "Same camera angle and composition.",
      input_image: imageBase64,
      aspect_ratio: "match_input_image",
      output_format: "jpg",
      guidance_scale: 4.0,
      num_inference_steps: 30,
      seed: 42,
    },
  });

  const txtUrl = extractUrl(txtOutput);
  const txtResp = await fetch(txtUrl);
  const txtBuf = await txtResp.arrayBuffer();
  return `data:image/jpeg;base64,${Buffer.from(txtBuf).toString("base64")}`;
}

/**
 * Remodel bathroom — transform bathroom with new tiles, vanity, fixtures.
 */
export async function remodelBathroom(
  imageBase64: string,
  bathroomStyle: string,
  customBathroom?: string,
): Promise<string> {
  const replicate = getReplicate();

  const bathroomPrompts: Record<string, string> = {
    modern_white: "Transform this bathroom to modern white style: white large-format wall tiles, floating white vanity with integrated sink, frameless glass shower, chrome fixtures, LED mirror",
    marble: "Transform this bathroom to luxurious marble style: marble wall and floor tiles with gray veining, marble-top vanity, freestanding bathtub, gold or brass fixtures",
    industrial: "Transform this bathroom to industrial style: concrete-look walls, black metal fixtures, exposed pipe details, wooden vanity with vessel sink, matte black shower",
    wood: "Transform this bathroom to warm wood style: wood-look tiles on walls, wooden vanity cabinet, warm lighting, natural stone accents, brass fixtures",
    minimalist: "Transform this bathroom to ultra-minimalist style: seamless white walls, hidden storage, walk-in shower with no frame, wall-mounted toilet, simple round mirror",
    classic: "Transform this bathroom to classic elegant style: subway tiles, pedestal sink or traditional vanity, clawfoot bathtub, polished chrome fixtures, decorative mirror frame",
  };

  let prompt: string;
  if (bathroomStyle === "custom" && customBathroom) {
    prompt = `Transform this bathroom in the following style: ${customBathroom}. Make it look professional and realistic.`;
  } else {
    prompt = bathroomPrompts[bathroomStyle] || bathroomPrompts.modern_white;
  }

  console.log("[bathroom] Style:", bathroomStyle);
  const bathOutput = await replicate.run("black-forest-labs/flux-kontext-pro", {
    input: {
      prompt:
        prompt +
        " CRITICAL: Keep the room layout, size, window positions, and door positions PIXEL-PERFECT identical. " +
        "Only change tiles, vanity, fixtures, shower/bathtub, and decorative elements. " +
        "Same camera angle and composition. Professional real estate photography.",
      input_image: imageBase64,
      aspect_ratio: "match_input_image",
      output_format: "jpg",
    },
  });

  const bathUrl = extractUrl(bathOutput);
  const bathResp = await fetch(bathUrl);
  const bathBuf = await bathResp.arrayBuffer();
  return `data:image/jpeg;base64,${Buffer.from(bathBuf).toString("base64")}`;
}

/**
 * Add item — add a specific object to the room (fireplace, plant, bookshelf, etc.)
 */
export async function addItem(
  imageBase64: string,
  description: string,
): Promise<string> {
  const replicate = getReplicate();

  console.log("[additem] Adding:", description.substring(0, 100));
  const addOutput = await replicate.run("black-forest-labs/flux-kontext-pro", {
    input: {
      prompt:
        `Add the following item to this room: ${description}. ` +
        "Place it naturally and realistically, matching the room's scale, lighting, and style. " +
        "The added item should look like it belongs in this space. " +
        "CRITICAL: Keep everything else PIXEL-PERFECT identical — walls, floor, ceiling, " +
        "existing furniture, windows, lighting. Same camera angle and composition. " +
        "Professional real estate photography.",
      input_image: imageBase64,
      aspect_ratio: "match_input_image",
      output_format: "jpg",
    },
  });

  const addUrl = extractUrl(addOutput);
  const addResp = await fetch(addUrl);
  const addBuf = await addResp.arrayBuffer();
  return `data:image/jpeg;base64,${Buffer.from(addBuf).toString("base64")}`;
}

/**
 * Greenify — make lawn greener, trees lush, vegetation healthier.
 */
export async function greenifyExterior(imageBase64: string): Promise<string> {
  const replicate = getReplicate();

  console.log("[greenify] Enhancing vegetation...");
  const grnOutput = await replicate.run("black-forest-labs/flux-kontext-pro", {
    input: {
      prompt:
        "Enhance all vegetation in this exterior photo. " +
        "Make the lawn thick, lush, and vibrant green. " +
        "Make trees full and leafy with healthy green foliage. " +
        "Make shrubs and bushes neatly trimmed and green. " +
        "Make flower beds colorful and well-maintained. " +
        "The yard should look professionally landscaped in peak summer condition. " +
        "CRITICAL: Keep the building, driveway, fences, paths, sky, and all man-made elements " +
        "PIXEL-PERFECT identical. Only enhance the vegetation and lawn. " +
        "Same camera angle, perspective, and lighting. Professional real estate photography.",
      input_image: imageBase64,
      aspect_ratio: "match_input_image",
      output_format: "jpg",
    },
  });

  const grnUrl = extractUrl(grnOutput);
  const grnResp = await fetch(grnUrl);
  const grnBuf = await grnResp.arrayBuffer();
  return `data:image/jpeg;base64,${Buffer.from(grnBuf).toString("base64")}`;
}

/**
 * Refine — iteratively edit a generated image by text prompt.
 */
export async function refineWithAI(
  imageBase64: string,
  editPrompt: string,
): Promise<string> {
  const replicate = getReplicate();

  console.log("[refine] Editing:", editPrompt.substring(0, 100));
  const refOutput = await replicate.run("black-forest-labs/flux-kontext-pro", {
    input: {
      prompt:
        `Edit this photo according to user request: ${editPrompt}. ` +
        "Apply the requested change naturally and realistically. " +
        "CRITICAL: Keep everything else PIXEL-PERFECT identical — " +
        "same composition, camera angle, and overall layout. " +
        "Only modify what the user specifically asked for. " +
        "Professional real estate photography result.",
      input_image: imageBase64,
      aspect_ratio: "match_input_image",
      output_format: "jpg",
    },
  });

  const refUrl = extractUrl(refOutput);
  const refResp = await fetch(refUrl);
  const refBuf = await refResp.arrayBuffer();
  return `data:image/jpeg;base64,${Buffer.from(refBuf).toString("base64")}`;
}

/**
 * Make room vacant — remove ALL furniture and belongings, show empty room.
 */
export async function makeVacant(imageBase64: string): Promise<string> {
  const replicate = getReplicate();

  console.log("[vacant] Removing all furniture...");
  const vacOutput = await replicate.run("black-forest-labs/flux-kontext-pro", {
    input: {
      prompt:
        "Remove ALL furniture, belongings, and movable objects from this room. " +
        "Remove sofas, tables, chairs, beds, shelves, cabinets, TVs, rugs, curtains, artwork, " +
        "plants, lamps, personal items, electronics — everything that is not a fixed building element. " +
        "Show a completely EMPTY room with only walls, floor, ceiling, windows, doors, " +
        "built-in closets, radiators, and light fixtures remaining. " +
        "The empty room should look clean and spacious, ready for new owners to furnish. " +
        "CRITICAL: Keep walls, floor material, ceiling, windows, doors, built-in elements " +
        "PIXEL-PERFECT identical. Same camera angle, perspective, and lighting. " +
        "Professional real estate photography of an empty room.",
      input_image: imageBase64,
      aspect_ratio: "match_input_image",
      output_format: "jpg",
    },
  });

  const vacUrl = extractUrl(vacOutput);
  const vacResp = await fetch(vacUrl);
  const vacBuf = await vacResp.arrayBuffer();
  return `data:image/jpeg;base64,${Buffer.from(vacBuf).toString("base64")}`;
}

/**
 * Declutter — automatically remove clutter, personal items, and mess from a room.
 */
export async function declutterRoom(imageBase64: string): Promise<string> {
  const replicate = getReplicate();

  console.log("[declutter] Auto-cleaning room...");
  const dclOutput = await replicate.run("black-forest-labs/flux-kontext-pro", {
    input: {
      prompt:
        "Clean up and declutter this room photo. " +
        "Remove all clutter, mess, personal belongings, scattered items: " +
        "clothes on chairs, shoes on floor, toys, papers, dishes, bags, boxes, " +
        "toiletries, cables, laundry, trash, random objects on surfaces. " +
        "Keep all FURNITURE in place (sofas, tables, beds, shelves, cabinets) — " +
        "just remove the mess and personal items from them and from the floor. " +
        "Surfaces should be clean and tidy. Floor should be clear. " +
        "The room should look professionally staged and ready for a real estate photo. " +
        "CRITICAL: Keep ALL furniture, walls, floor, ceiling, windows, doors, " +
        "and room layout PIXEL-PERFECT identical. Only remove clutter and personal items. " +
        "Same camera angle, perspective, and lighting.",
      input_image: imageBase64,
      aspect_ratio: "match_input_image",
      output_format: "jpg",
    },
  });

  const dclUrl = extractUrl(dclOutput);
  const dclResp = await fetch(dclUrl);
  const dclBuf = await dclResp.arrayBuffer();
  return `data:image/jpeg;base64,${Buffer.from(dclBuf).toString("base64")}`;
}

/**
 * Estimate repair cost — analyze room photo and calculate renovation costs.
 */
export async function estimateRepairCost(imageBase64: string): Promise<string> {
  const imgSrc = await compressForAnalysis(imageBase64);

  console.log("[repaircost] Estimating repair cost...");

  const text = await openaiChatViaProxy(
    [
      {
        role: "user",
        content: [
          { type: "image_url", image_url: { url: imgSrc, detail: "low" } },
          {
            type: "text",
            text: `Ты — строительный эксперт-оценщик. Проанализируй фото помещения и рассчитай стоимость ремонта.

КАЛЬКУЛЯТОР РЕМОНТА

ТИП ПОМЕЩЕНИЯ: (комната/кухня/ванная/...)
ПРИМЕРНАЯ ПЛОЩАДЬ: ~X м²
ТЕКУЩЕЕ СОСТОЯНИЕ: (описание)

НЕОБХОДИМЫЕ РАБОТЫ:

1. СТЕНЫ:
   - Работы: (описание)
   - Материалы: X ₽
   - Работа: X ₽

2. ПОЛЫ:
   - Работы: (описание)
   - Материалы: X ₽
   - Работа: X ₽

3. ПОТОЛОК:
   - Работы: (описание)
   - Материалы: X ₽
   - Работа: X ₽

4. ЭЛЕКТРИКА: X ₽
5. САНТЕХНИКА: X ₽ (если применимо)
6. ДВЕРИ/ОКНА: X ₽ (если нужно)

ИТОГО:
- Косметический ремонт: XX 000 — XX 000 ₽
- Капитальный ремонт: XX 000 — XX 000 ₽
- Евроремонт: XX 000 — XX 000 ₽

ВЛИЯНИЕ НА СТОИМОСТЬ КВАРТИРЫ:
Ремонт за ~X ₽ может увеличить стоимость на ~X ₽

Пиши на русском. Цены указывай по московским расценкам 2024-2025. Размеры определяй по видимым предметам.`,
          },
        ],
      },
    ],
    1500,
  );

  return text;
}
