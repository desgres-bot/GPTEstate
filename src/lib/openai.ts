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
    "Add a light gray linen sectional sofa against the main wall, a round walnut coffee table with a stack of architecture books, two cream armchairs. A wool throw draped over the armrest, a potted fiddle leaf fig in the corner. Warm pendant lighting.",
  scandinavian:
    "Add a cream boucle sofa with oak legs against the main wall, a light birch coffee table, two linen cushions. A sheepskin throw, a ceramic vase with dried pampas grass, a woven jute rug. Soft natural light.",
  loft:
    "Add a cognac leather Chesterfield sofa, a reclaimed wood coffee table on iron hairpin legs, an industrial floor lamp with Edison bulb. A vintage area rug, exposed-style metal bookshelf with books and plants.",
  classic:
    "Add an ivory tufted sofa with rolled arms, a mahogany coffee table with curved legs, two wingback chairs in sage green velvet. Silk curtains, a crystal chandelier, a Persian area rug.",
  japanese:
    "Add a low walnut platform sofa with linen cushions, a round stone coffee table, a floor tatami mat. A bonsai tree on a wooden stand, rice paper floor lamp, minimal ceramics on a floating shelf.",
  minimalist:
    "Add a single white linen sofa, a slim black metal side table, one large ceramic floor vase. Nothing else — clean open space, monochrome palette, intentional emptiness.",
  boho:
    "Add a rust-colored velvet sofa with mixed-pattern cushions, a round rattan coffee table, macrame wall hanging. Layered kilim rugs, trailing pothos plants, brass moroccan lantern.",
  provence:
    "Add a whitewashed oak dining table with four ladder-back chairs, linen seat cushions in lavender. A ceramic jug with dried lavender, distressed white sideboard, floral curtains in soft blue.",
  artdeco:
    "Add an emerald green velvet sofa with gold legs, a mirrored geometric coffee table, two brass table lamps. A black and gold area rug, sunburst mirror on the wall, crystal decanter on a bar cart.",
  hightech:
    "Add a black leather modular sofa with chrome frame, a glass and steel coffee table, LED strip under-lighting. A wall-mounted flat screen, minimal black shelving with tech accessories.",
  country:
    "Add a large plaid upholstered sofa in warm brown, a distressed pine coffee table, a woven basket with blankets. Gingham cushions, a table lamp with burlap shade, braided oval rug.",
  eco:
    "Add a natural linen sofa on bamboo frame, a live-edge wood slab coffee table, cork side table. Five potted plants of varying heights, linen curtains, a jute area rug. Earthy warm tones.",
  industrial:
    "Add a dark gray canvas sofa on black metal frame, a cart-style coffee table with iron wheels, a factory pendant lamp. Concrete-look accessories, metal wire baskets, a reclaimed wood bookshelf.",
  mediterranean:
    "Add a white linen sofa with terracotta and blue cushions, a mosaic-top round coffee table, wrought iron candle holders. Olive branches in a ceramic vase, blue and white patterned rug.",
  retro:
    "Add a curved orange velvet sofa on wooden legs, a kidney-shaped teak coffee table, a lava lamp and rotary phone. Geometric wallpaper accent, shag rug in cream, a sunburst clock.",
  neoclassic:
    "Add a dove gray silk sofa with fluted wooden legs, a marble-top round side table, two matching armchairs. Pleated silk curtains, a gilt-framed mirror, a crystal table lamp.",
  midcentury:
    "Add an Eames-style walnut lounge chair with ottoman, a teak credenza, a tulip side table. A Nelson saucer pendant lamp, an abstract print on the wall, a low sheepskin rug.",
  coastal:
    "Add a white slipcovered sofa with navy and coral striped cushions, a driftwood coffee table, a rope-wrapped basket. Sheer white curtains, a blue glass vase with sea grass, sisal rug.",
  farmhouse:
    "Add a deep-seated white linen sofa, a reclaimed barnwood coffee table, a galvanized metal side table. Mason jar with wildflowers, woven throw blanket, a vintage ladder as decor.",
  rustic:
    "Add a chunky leather sofa with nail-head trim, a tree-trunk coffee table with clear lacquer, a stone table lamp. A thick wool area rug, antler wall mount, stack of firewood in a metal basket.",
  glam:
    "Add a blush pink velvet sofa with gold legs, a mirrored coffee table, a faux fur throw. Crystal table lamps on marble side tables, a large gold-framed mirror, metallic accent pillows.",
  transitional:
    "Add a charcoal linen sofa with clean lines and walnut legs, a round marble-top coffee table, two neutral upholstered chairs. Simple white curtains, a ceramic table lamp, a soft gray area rug.",
  baroque:
    "Add an ornate carved wood sofa in deep burgundy velvet, a gilded oval coffee table, two high-back throne chairs. Heavy brocade curtains with gold tassels, a large crystal chandelier.",
  fusion:
    "Add a teal velvet sofa with embroidered silk cushions, a brass-inlay wooden coffee table, a moroccan pouf. Japanese ceramic vases, an Indian silk rug, contemporary art on the wall.",
  ethnic:
    "Add a low carved wooden daybed with indigo batik cushions, a hammered copper tray table, hand-woven textile wall hanging. Tribal print rug, carved wooden masks, brass oil lamps.",
};

const STYLE_PROMPTS_REDESIGN: Record<string, string> = {
  modern:
    "Replace all furniture with: a light gray linen sectional sofa, a round walnut coffee table with architecture books, two cream armchairs. Add a wool throw, a potted fiddle leaf fig, warm pendant lighting.",
  scandinavian:
    "Replace all furniture with: a cream boucle sofa with oak legs, a light birch coffee table, linen cushions. Add a sheepskin throw, dried pampas in a ceramic vase, a woven jute rug.",
  loft:
    "Replace all furniture with: a cognac leather Chesterfield sofa, a reclaimed wood coffee table on iron hairpin legs, an industrial floor lamp with Edison bulb. Add a vintage rug, metal bookshelf.",
  classic:
    "Replace all furniture with: an ivory tufted sofa with rolled arms, a mahogany coffee table, two sage green velvet wingback chairs. Add silk curtains, crystal chandelier, Persian rug.",
  japanese:
    "Replace all furniture with: a low walnut platform sofa with linen cushions, a round stone coffee table, floor tatami mat. Add a bonsai on wooden stand, rice paper floor lamp.",
  minimalist:
    "Replace all furniture with: a single white linen sofa and a slim black metal side table. Add one large ceramic floor vase. Remove everything else — clean open space, monochrome palette.",
  boho:
    "Replace all furniture with: a rust-colored velvet sofa with mixed-pattern cushions, a round rattan coffee table, macrame wall hanging. Add layered kilim rugs, trailing pothos, brass lantern.",
  provence:
    "Replace all furniture with: a whitewashed oak dining table, four ladder-back chairs with lavender linen seats. Add a ceramic jug with dried lavender, distressed white sideboard, soft blue floral curtains.",
  artdeco:
    "Replace all furniture with: an emerald green velvet sofa with gold legs, a mirrored geometric coffee table, brass table lamps. Add a black and gold rug, sunburst mirror, crystal decanter on bar cart.",
  hightech:
    "Replace all furniture with: a black leather modular sofa with chrome frame, a glass and steel coffee table, LED strip under-lighting. Add a wall-mounted screen, minimal black shelving.",
  country:
    "Replace all furniture with: a large plaid upholstered sofa in warm brown, a distressed pine coffee table, a woven basket with blankets. Add gingham cushions, burlap lamp, braided rug.",
  eco:
    "Replace all furniture with: a natural linen sofa on bamboo frame, a live-edge wood coffee table, a cork side table. Add five potted plants of varying heights, linen curtains, jute rug.",
  industrial:
    "Replace all furniture with: a dark gray canvas sofa on black metal frame, a cart-style iron coffee table, a factory pendant lamp. Add metal wire baskets, reclaimed wood bookshelf.",
  mediterranean:
    "Replace all furniture with: a white linen sofa with terracotta and blue cushions, a mosaic-top round coffee table, wrought iron candle holders. Add olive branches in ceramic vase, blue-white rug.",
  retro:
    "Replace all furniture with: a curved orange velvet sofa on wooden legs, a kidney-shaped teak coffee table, a vintage lava lamp. Add geometric accents, cream shag rug, sunburst wall clock.",
  neoclassic:
    "Replace all furniture with: a dove gray silk sofa with fluted wooden legs, a marble-top round side table, two matching armchairs. Add pleated silk curtains, gilt-framed mirror, crystal lamp.",
  midcentury:
    "Replace all furniture with: an Eames-style walnut lounge chair with ottoman, a teak credenza, a tulip side table. Add a Nelson saucer pendant lamp, abstract art print, low sheepskin rug.",
  coastal:
    "Replace all furniture with: a white slipcovered sofa with navy and coral cushions, a driftwood coffee table, rope-wrapped basket. Add sheer white curtains, blue glass vase with sea grass, sisal rug.",
  farmhouse:
    "Replace all furniture with: a deep-seated white linen sofa, a reclaimed barnwood coffee table, a galvanized metal side table. Add mason jar with wildflowers, woven throw, vintage ladder decor.",
  rustic:
    "Replace all furniture with: a chunky leather sofa with nail-head trim, a tree-trunk coffee table with clear lacquer, a stone lamp. Add thick wool rug, antler wall mount, firewood in metal basket.",
  glam:
    "Replace all furniture with: a blush pink velvet sofa with gold legs, a mirrored coffee table, a faux fur throw. Add crystal lamps on marble side tables, large gold-framed mirror, metallic pillows.",
  transitional:
    "Replace all furniture with: a charcoal linen sofa with walnut legs, a round marble-top coffee table, two neutral upholstered chairs. Add simple white curtains, ceramic lamp, soft gray rug.",
  baroque:
    "Replace all furniture with: an ornate carved wood sofa in deep burgundy velvet, a gilded oval coffee table, two high-back throne chairs. Add heavy brocade curtains with gold tassels, crystal chandelier.",
  fusion:
    "Replace all furniture with: a teal velvet sofa with embroidered silk cushions, a brass-inlay wooden coffee table, a moroccan pouf. Add Japanese ceramic vases, Indian silk rug, contemporary art.",
  ethnic:
    "Replace all furniture with: a low carved wooden daybed with indigo batik cushions, a hammered copper tray table, hand-woven wall hanging. Add tribal print rug, carved wooden masks, brass lamps.",
};

/**
 * Enhance photo = Improve lighting, colors, contrast, white balance.
 * GPT-4o first analyzes photo issues, then Flux applies targeted corrections.
 */
export async function enhancePhoto(imageBase64: string): Promise<string> {
  const replicate = getReplicate();

  // Step 1: GPT-4o analyzes photo quality issues
  console.log("[enhance] Step 1: Analyzing photo quality with GPT-4o...");
  const imgSrc = await compressForAnalysis(imageBase64);
  const analysis = await openaiChatViaProxy(
    [
      {
        role: "user",
        content: [
          { type: "image_url", image_url: { url: imgSrc, detail: "low" } },
          {
            type: "text",
            text: `Analyze this real estate photo quality. In 2-3 bullet points, describe:

LIGHTING ISSUES (e.g. "dark shadows in corners", "overexposed window", "yellow tungsten cast"):
- be specific about which areas

COLOR ISSUES (e.g. "overall blue tint", "desaturated colors", "warm orange cast from lamps"):
- describe the color temperature problem

WHAT TO PRESERVE (key room features — describe exact colors and materials):
- e.g. "cream walls", "dark wood floor"

Be very concise. English only.`,
          },
        ],
      },
    ],
    300,
  );
  console.log("[enhance] Photo analysis:", analysis.substring(0, 200));

  // Step 2: Flux Kontext Pro — enhance with targeted prompt
  console.log("[enhance] Step 2: Flux Kontext Pro enhancement...");
  const output = await replicate.run("black-forest-labs/flux-kontext-pro", {
    input: {
      prompt:
        "Improve this real estate photo quality: correct white balance to neutral daylight, " +
        "brighten dark shadow areas, balance exposure between windows and interior, " +
        "boost color saturation slightly for vivid but natural tones, " +
        "add natural HDR effect with detail in both shadows and highlights. " +
        "While maintaining all furniture, objects, room layout, and composition exactly as they are. " +
        "Shot on Canon 5D Mark IV, 16-35mm wide angle lens, f/8, properly exposed. Professional real estate photography.",
      input_image: imageBase64,
      prompt_upsampling: false,
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
        stylePrompt +
        " Place furniture naturally on the floor, grounded with proper shadows. " +
        "While maintaining the exact same walls, flooring, windows, and room architecture. " +
        "Same camera angle and perspective. Professional interior photography, shot on Canon 5D Mark IV, 16-35mm wide angle.",
      input_image: imageBase64,
      prompt_upsampling: false,
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
        stylePrompt +
        " Place furniture naturally on the floor, grounded with proper shadows. " +
        "While maintaining the exact same walls, flooring, windows, and room architecture. " +
        "Same camera angle and perspective. Professional interior photography, shot on Canon 5D Mark IV, 16-35mm wide angle.",
      input_image: imageBase64,
      prompt_upsampling: false,
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
        "Remove the following objects from this photo: " +
        combinedDescription +
        ". Reconstruct the floor and wall surfaces behind removed objects, matching existing textures seamlessly. " +
        "While maintaining all other furniture, fixtures, walls, and lighting exactly as they are. " +
        "Same camera angle and composition.",
      input_image: imageBase64,
      prompt_upsampling: false,
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
        "Change the time of day to golden hour dusk. Add warm sunset sky transitioning from deep blue to orange-pink at the horizon. " +
        "Add warm interior light glowing through all windows. Add subtle landscape lighting along pathways. " +
        "While maintaining the exact same building structure, landscaping, and camera angle. " +
        "Professional real estate twilight photography.",
      input_image: imageBase64,
      prompt_upsampling: false,
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
      "Replace the sky with a clear bright blue sky and a few white fluffy cumulus clouds. Bright warm daylight on the building.",
    sunset:
      "Replace the sky with a warm sunset gradient — orange, pink and purple tones. Golden hour light casting warm tones on the building facade.",
    dramatic:
      "Replace the sky with dramatic storm clouds in deep blue and gray. Moody cinematic atmosphere with strong contrast.",
    blue:
      "Replace the sky with a perfectly clear gradient blue sky, no clouds. Clean, crisp, fresh look.",
  };

  const skyPrompt = skyPrompts[skyType] || skyPrompts.sunny;

  console.log("[sky] Replacing sky:", skyType);
  const output = await replicate.run("black-forest-labs/flux-kontext-pro", {
    input: {
      prompt:
        skyPrompt +
        " While maintaining the exact same building, landscaping, roads, and all ground-level elements. " +
        "Only change the sky. Same camera angle. Professional real estate photography.",
      input_image: imageBase64,
      prompt_upsampling: false,
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
      "Repaint all walls to clean matte white #FFFFFF. Smooth finish, fresh bright look throughout the room.",
    beige_walls:
      "Repaint all walls to warm cream #F5F0EB. Smooth matte finish, warm inviting tone.",
    gray_walls:
      "Repaint all walls to modern light gray #D5D5D5. Smooth matte finish, contemporary sophisticated look.",
    laminate:
      "Replace the floor with light oak laminate planks with visible wood grain texture. Natural warm tone.",
    tile:
      "Replace the floor with large-format porcelain tiles in light gray #C8C8C8. Clean even grout lines.",
    parquet:
      "Replace the floor with herringbone parquet in warm natural oak. Classic elegant pattern.",
    full_light:
      "Repaint all walls pure white #FFFFFF and replace floor with light oak laminate. Add clean white baseboards. Fresh modern renovation.",
    full_dark:
      "Repaint all walls dark charcoal #3A3A3A and replace floor with dark walnut laminate. Add dark baseboards. Dramatic sophisticated look.",
  };

  const renovationPrompt = renovationPrompts[renovationType] || renovationPrompts.white_walls;

  console.log("[renovation] Type:", renovationType);
  const output = await replicate.run("black-forest-labs/flux-kontext-pro", {
    input: {
      prompt:
        renovationPrompt +
        " While maintaining all furniture, fixtures, appliances, windows, doors, ceiling, and room layout exactly as they are. " +
        "Only change walls and/or floor as specified. Same camera angle and lighting. " +
        "Professional interior photography, shot on Canon 5D Mark IV, 16-35mm wide angle.",
      input_image: imageBase64,
      prompt_upsampling: false,
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
      "Change the facade to modern contemporary: clean geometric lines, flat roof, combination of glass panels, smooth concrete, and horizontal wood cladding in warm cedar tone. Large floor-to-ceiling windows.",
    classic:
      "Change the facade to classic traditional: symmetrical design, elegant white moldings and crown details, traditional windows with decorative shutters in navy, warm cream stucco walls.",
    minimalist:
      "Change the facade to ultra-minimalist: smooth white rendered walls, no ornaments, large frameless windows, clean flat surfaces. Stark pristine appearance.",
    scandinavian:
      "Change the facade to Scandinavian: vertical light pine wood cladding, white trim, large windows, simple gable roof with dark tiles. Clean Nordic aesthetic with small garden.",
    mediterranean:
      "Change the facade to Mediterranean: terracotta clay roof tiles, warm cream stucco walls, arched windows, wrought iron balcony railings. Bougainvillea climbing the wall.",
    craftsman:
      "Change the facade to Craftsman: wide covered front porch with tapered stone columns, cedar shingle siding in warm brown, exposed rafter tails, earth-tone paint.",
    colonial:
      "Change the facade to Colonial: symmetrical brick facade with centered entrance, white column portico, dormer windows with white frames, black shutters.",
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
        " While maintaining the building's overall shape, size, roof line, driveway, and landscaping. " +
        "Only change facade materials and architectural details. Same camera angle and sky. " +
        "Professional architectural photography.",
      input_image: imageBase64,
      prompt_upsampling: false,
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
    garden: "Add colorful flower beds with roses, lavender, and ornamental grasses along the house. Stone edging, bark mulch paths, trimmed boxwood hedges.",
    lawn: "Add a thick, perfectly manicured green lawn with crisp clean edges. Healthy vibrant grass in peak summer condition.",
    patio: "Add a natural stone patio with teak outdoor dining set for six, string lights overhead, large terracotta planters with olive trees.",
    pool: "Add a rectangular swimming pool with clear turquoise water, limestone coping, two teak sun loungers with white cushions, surrounding lavender bushes.",
    lights: "Add warm landscape lighting: brass pathway lights along walkway, uplights on trees casting warm glow, accent spotlights on the facade.",
    full: "Add complete landscaping: manicured green lawn, stone pathway to the entrance, colorful flower beds, two ornamental trees, brass pathway lights, clean swept driveway.",
  };

  const landscapePrompt = landscapePrompts[landscapeType] || landscapePrompts.full;

  console.log("[landscape] Type:", landscapeType);
  const lndOutput = await replicate.run("black-forest-labs/flux-kontext-pro", {
    input: {
      prompt:
        landscapePrompt +
        " While maintaining the exact same building structure, windows, doors, roof, and architectural elements. " +
        "Only change landscaping and outdoor elements. Same camera angle and sky. " +
        "Professional real estate photography.",
      input_image: imageBase64,
      prompt_upsampling: false,
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
    white: "Repaint all walls to clean matte white #FFFFFF. Crisp, fresh, bright.",
    beige: "Repaint all walls to warm cream #F5F0EB. Soft, warm, inviting.",
    gray: "Repaint all walls to light gray #D5D5D5. Sophisticated, contemporary.",
    blue: "Repaint all walls to soft sky blue #B8D4E8. Calming, serene, airy.",
    green: "Repaint all walls to olive green #6B7F52. Natural, earthy, grounding.",
    terracotta: "Repaint all walls to warm terracotta #C4725A. Rich, Mediterranean warmth.",
    lavender: "Repaint all walls to soft lavender #C4B7D4. Delicate, calming, romantic.",
    sage: "Repaint all walls to sage green #B2BFA8. Muted, organic, sophisticated.",
    navy: "Repaint all walls to deep navy #2C3E6B. Bold, dramatic, elegant.",
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
        colorPrompt +
        " While maintaining all furniture, fixtures, windows, doors, ceiling, floor, and room layout exactly as they are. " +
        "Only change the wall color. Same camera angle and lighting. " +
        "Professional interior photography.",
      input_image: imageBase64,
      prompt_upsampling: false,
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
        "Improve the lighting to professional HDR real estate quality. Brighten dark areas evenly, balance exposure across the room. " +
        "Add warm natural fill light to dark corners. Windows should show a pleasant outdoor view, not blown out white. " +
        "While maintaining all furniture, walls, decor, and room layout exactly as they are. " +
        "Same camera angle. Shot on Canon 5D Mark IV with HDR bracketing.",
      input_image: imageBase64,
      prompt_upsampling: false,
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
        "Correct perspective distortion: make all vertical lines perfectly vertical — walls, door frames, window frames. " +
        "Level the horizon line. Correct wide-angle barrel distortion. " +
        "While maintaining all room contents, furniture, colors, and lighting exactly as they are. " +
        "Result should look like a professional tilt-shift lens shot.",
      input_image: imageBase64,
      prompt_upsampling: false,
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
        "Reconstruct clean background behind removed areas, matching surrounding textures seamlessly. " +
        "While maintaining all other elements exactly as they are. Same camera angle.",
      input_image: imageBase64,
      prompt_upsampling: false,
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
        `${description}. ` +
        "Place naturally with proper shadows, matching the room's existing lighting and style. " +
        "While maintaining walls, floors, other furniture, and windows exactly as they are. " +
        "Same camera angle. Professional interior photography.",
      input_image: imageBase64,
      prompt_upsampling: false,
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
    laminate: "Replace the floor with light oak laminate planks with realistic wood grain texture and natural knots. Warm honey tone #D4B896",
    parquet: "Replace the floor with classic herringbone parquet in warm walnut tone #8B6F47. Polished surface with subtle sheen",
    tile: "Replace the floor with large-format 60x60cm porcelain tiles in light gray #C8C8C8. Thin grout lines, smooth matte finish",
    marble: "Replace the floor with polished Carrara marble with subtle gray veining on white background. Glossy reflective surface",
    vinyl: "Replace the floor with luxury vinyl planks in light ash #C4B5A0 with realistic wood grain embossing",
    concrete: "Replace the floor with polished concrete in medium gray #999999. Smooth industrial finish with subtle sheen",
    carpet: "Replace the floor with wall-to-wall plush carpet in warm beige #D4C5A9. Soft thick pile texture",
  };

  const prompt = customFlooring || floorPrompts[flooringType] || floorPrompts.laminate;

  console.log("[flooring] Changing floor to:", flooringType);
  const flrOutput = await replicate.run("black-forest-labs/flux-kontext-pro", {
    input: {
      prompt:
        prompt +
        ". While maintaining all furniture, fixtures, walls, ceiling, windows, doors, and room layout exactly as they are. " +
        "Only change the floor. Same camera angle. Professional interior photography.",
      input_image: imageBase64,
      prompt_upsampling: false,
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
    modern_white: "Replace kitchen cabinets with modern flat-panel white matte cabinets, white quartz countertop with subtle veining, white subway tile backsplash, brushed nickel hardware",
    modern_dark: "Replace kitchen cabinets with modern flat-panel charcoal #3A3A3A cabinets, dark honed granite countertop, matte black hardware and fixtures",
    classic_wood: "Replace kitchen cabinets with classic raised-panel natural oak cabinets, speckled granite countertop in warm brown, brass cup-pull hardware",
    scandinavian: "Replace kitchen cabinets with light birch plywood fronts with finger-pull handles, white laminate countertop, open shelving with ceramics. Minimal clean design",
    industrial: "Replace kitchen cabinets with dark reclaimed wood and black metal frame fronts, poured concrete countertop, exposed black iron pipe hardware",
    shaker: "Replace kitchen cabinets with white shaker-style cabinets with rail detail, thick butcher block oak countertop, brushed brass knobs",
  };

  const prompt = customKitchen || kitchenPrompts[kitchenStyle] || kitchenPrompts.modern_white;

  console.log("[kitchen] Changing kitchen style to:", kitchenStyle);
  const kitOutput = await replicate.run("black-forest-labs/flux-kontext-pro", {
    input: {
      prompt:
        prompt +
        ". While maintaining room layout, floor, ceiling, windows, doors, and appliance positions exactly as they are. " +
        "Only change cabinets, countertops, and backsplash. Same camera angle. Professional interior photography.",
      input_image: imageBase64,
      prompt_upsampling: false,
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
    spring: "Change the season to spring: fresh green leaves on trees, blooming cherry blossoms and tulips, bright green lawn, clear bright daylight",
    summer: "Change the season to peak summer: lush dark green trees, bright sunshine, clear blue sky, thick vibrant green lawn, warm light",
    autumn: "Change the season to autumn: orange, red and golden foliage on trees, fallen leaves on the lawn and pathway, warm golden hour light",
    winter: "Change the season to winter: fresh snow covering the roof, lawn, and driveway. Bare frosted tree branches, overcast winter sky",
  };

  const prompt = seasonPrompts[seasonType] || seasonPrompts.summer;

  console.log("[season] Changing season to:", seasonType);
  const ssnOutput = await replicate.run("black-forest-labs/flux-kontext-pro", {
    input: {
      prompt:
        prompt +
        ". While maintaining the exact same building structure, architecture, roads, and all man-made elements. " +
        "Only change vegetation, sky, and seasonal elements. Same camera angle. Professional real estate photography.",
      input_image: imageBase64,
      prompt_upsampling: false,
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
    newyear: "Add a decorated Christmas tree with warm golden lights and red ornaments in the corner, pine garlands with fairy lights along the windows, a few wrapped gift boxes under the tree",
    christmas: "Add a tall decorated Christmas tree with red and gold ornaments, a fresh pine wreath on the door, knitted stockings hanging by the window, warm candlelight on surfaces",
    halloween: "Add carved jack-o-lanterns with candlelight on the porch, fake cobwebs in corners, a wreath of autumn leaves, orange and black bunting along the railing",
    easter: "Add a vase of fresh spring tulips on the table, decorated Easter eggs in a basket, pastel-colored bunting, small bunny figurines on shelves",
    birthday: "Add colorful helium balloons clustered in corners, a fabric birthday banner across the wall, wrapped gift boxes on the table, a festive table setting",
    romantic: "Add scattered red rose petals on the bed, tall white candles on surfaces casting warm glow, sheer fairy lights along the headboard, soft pink accent lighting",
  };

  const prompt = decorPrompts[decorType] || decorPrompts.newyear;

  console.log("[decor] Adding decor:", decorType);
  const decOutput = await replicate.run("black-forest-labs/flux-kontext-pro", {
    input: {
      prompt:
        prompt +
        ". While maintaining the room structure, walls, floor, ceiling, windows, doors, and existing furniture exactly as they are. " +
        "Only add decorative elements. Same camera angle. Professional interior photography.",
      input_image: imageBase64,
      prompt_upsampling: false,
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
    office: "Add modern office furniture: white standing desks with monitors, black mesh ergonomic chairs, a glass meeting table for 6, potted snake plants, pendant lighting",
    restaurant: "Add upscale restaurant interior: round walnut dining tables with white linen, dark velvet chairs, warm pendant lighting above each table, a polished bar counter with stools",
    cafe: "Add cozy cafe setup: small round marble tables with bent-wood chairs, an espresso bar with professional machine, chalkboard menu, industrial pendant lights, potted herbs",
    retail: "Add modern retail displays: sleek white shelving units, a glass checkout counter, track lighting, mannequins, polished concrete floors, clean signage",
    hotel: "Add luxury hotel room furnishing: king bed with crisp white duvet and upholstered headboard, walnut nightstands with reading lamps, a lounge chair by the window, framed art",
    coworking: "Add coworking furniture: long shared oak desks with task lamps, ergonomic chairs, a lounge corner with sofa, acoustic phone booths, large whiteboards, trailing plants",
    gym: "Add gym equipment: treadmills, free weights on racks, a bench press station, full-wall mirror, rubber flooring, bright overhead lighting",
    salon: "Add beauty salon setup: styling stations with large illuminated mirrors, hydraulic salon chairs in blush pink, shampoo wash stations, sleek reception desk",
  };

  const prompt = commercialPrompts[commercialType] || commercialPrompts.office;

  console.log("[commercial] Staging commercial:", commercialType);
  const comOutput = await replicate.run("black-forest-labs/flux-kontext-pro", {
    input: {
      prompt:
        prompt +
        ". While maintaining the room structure, walls, ceiling, windows, and doors exactly as they are. " +
        "Furniture grounded on the floor with natural shadows. Shot on Canon 5D Mark IV, 16-35mm wide angle lens.",
      input_image: imageBase64,
      aspect_ratio: "match_input_image",
      output_format: "jpg",
      prompt_upsampling: false,
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
        `Redesign this room based on the following vision: ${textrenderPrompt}. ` +
        "While maintaining the room shape, windows, and doors exactly as they are. " +
        "Shot on Canon 5D Mark IV, 16-35mm wide angle lens. Professional real estate photography.",
      input_image: imageBase64,
      aspect_ratio: "match_input_image",
      output_format: "jpg",
      prompt_upsampling: false,
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
    modern_white: "Replace bathroom surfaces with large-format white (#FFFFFF) wall tiles 60x120cm, floating white vanity with integrated basin and soft-close drawers, frameless glass walk-in shower with rain showerhead, chrome fixtures, round LED backlit mirror",
    marble: "Replace bathroom surfaces with Calacatta marble wall and floor tiles with gray veining, marble-top double vanity with brass legs, freestanding oval bathtub, brushed brass fixtures, rectangular framed mirror",
    industrial: "Replace bathroom surfaces with gray concrete-look wall panels, matte black fixtures and exposed pipe towel rack, reclaimed wood vanity with white vessel sink, walk-in shower with black frame, round mirror with black metal frame",
    wood: "Replace bathroom surfaces with warm wood-look porcelain tiles on walls, solid oak vanity cabinet with stone countertop, warm LED strip lighting behind mirror, natural river stone accent wall, brushed brass fixtures",
    minimalist: "Replace bathroom surfaces with seamless white microcement walls, wall-hung toilet and floating vanity with push-to-open drawers, frameless walk-in shower with linear drain, simple round mirror, recessed LED lighting",
    classic: "Replace bathroom surfaces with white subway tiles with gray grout, traditional vanity with marble top and porcelain legs, clawfoot cast iron bathtub, polished chrome cross-handle fixtures, ornate rectangular mirror with molded frame",
  };

  let prompt: string;
  if (bathroomStyle === "custom" && customBathroom) {
    prompt = `Replace bathroom tiles, vanity, and fixtures with: ${customBathroom}.`;
  } else {
    prompt = bathroomPrompts[bathroomStyle] || bathroomPrompts.modern_white;
  }

  console.log("[bathroom] Style:", bathroomStyle);
  const bathOutput = await replicate.run("black-forest-labs/flux-kontext-pro", {
    input: {
      prompt:
        prompt +
        " While maintaining the room layout, window and door positions exactly as they are. " +
        "Shot on Canon 5D Mark IV, 16-35mm wide angle lens. Professional real estate photography.",
      input_image: imageBase64,
      aspect_ratio: "match_input_image",
      output_format: "jpg",
      prompt_upsampling: false,
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
        `Add ${description} to this room, placed naturally on the floor or against a wall. ` +
        "The item should match the room's lighting and cast realistic shadows. " +
        "While maintaining all existing furniture, walls, floor, and windows exactly as they are. " +
        "Professional real estate photography.",
      input_image: imageBase64,
      aspect_ratio: "match_input_image",
      output_format: "jpg",
      prompt_upsampling: false,
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
        "Change all lawn grass to thick vibrant emerald green, trees to full leafy canopy, " +
        "shrubs neatly trimmed, flower beds blooming with color. Peak summer landscaping condition. " +
        "While maintaining the building, driveway, fences, paths, sky, and all structures exactly as they are. " +
        "Shot on Canon 5D Mark IV, 24-70mm lens. Professional real estate photography.",
      input_image: imageBase64,
      aspect_ratio: "match_input_image",
      output_format: "jpg",
      prompt_upsampling: false,
    },
  });

  const grnUrl = extractUrl(grnOutput);
  const grnResp = await fetch(grnUrl);
  const grnBuf = await grnResp.arrayBuffer();
  return `data:image/jpeg;base64,${Buffer.from(grnBuf).toString("base64")}`;
}

/**
 * Refine — iteratively edit a generated image by text prompt.
 * When originalBase64 is provided, stitches original (left) + current (right) side-by-side
 * so the model can reference the original, then crops the right half from the result.
 */
export async function refineWithAI(
  imageBase64: string,
  editPrompt: string,
  originalBase64: string | null = null,
): Promise<string> {
  const replicate = getReplicate();

  let inputImage = imageBase64;
  let useSideBySide = false;
  let halfWidth = 0;
  let fullHeight = 0;

  // If we have the original, stitch side-by-side
  if (originalBase64) {
    console.log("[refine] Stitching original + result side-by-side...");
    const origBuf = Buffer.from(originalBase64.replace(/^data:image\/\w+;base64,/, ""), "base64");
    const currBuf = Buffer.from(imageBase64.replace(/^data:image\/\w+;base64,/, ""), "base64");

    const origMeta = await sharp(origBuf).metadata();
    const currMeta = await sharp(currBuf).metadata();
    const h = Math.max(origMeta.height || 0, currMeta.height || 0);
    const origW = origMeta.width || 0;
    const currW = currMeta.width || 0;

    // Resize both to same height
    const origResized = await sharp(origBuf).resize({ height: h }).toBuffer();
    const currResized = await sharp(currBuf).resize({ height: h }).toBuffer();

    const stitched = await sharp({
      create: { width: origW + currW, height: h, channels: 3, background: { r: 0, g: 0, b: 0 } },
    })
      .composite([
        { input: origResized, left: 0, top: 0 },
        { input: currResized, left: origW, top: 0 },
      ])
      .jpeg({ quality: 90 })
      .toBuffer();

    inputImage = `data:image/jpeg;base64,${stitched.toString("base64")}`;
    useSideBySide = true;
    halfWidth = currW;
    fullHeight = h;
  }

  const prompt = useSideBySide
    ? `This image has two photos side by side. LEFT = original photo, RIGHT = cleaned version. ` +
      `User request: "${editPrompt}". ` +
      `Copy the requested element exactly from the LEFT photo and place it in the same position on the RIGHT photo. ` +
      `The RIGHT photo must have this element restored exactly as it appears on the LEFT. ` +
      `Output must keep the side-by-side two-photo layout.`
    : `${editPrompt}. ` +
      "While maintaining everything else in the photo exactly as it is. " +
      "Professional real estate photography.";

  console.log("[refine] Editing:", editPrompt.substring(0, 100), useSideBySide ? "(with original reference)" : "");
  const refOutput = await replicate.run("black-forest-labs/flux-kontext-pro", {
    input: {
      prompt,
      input_image: inputImage,
      aspect_ratio: "match_input_image",
      output_format: "jpg",
      prompt_upsampling: false,
    },
  });

  const refUrl = extractUrl(refOutput);
  const refResp = await fetch(refUrl);
  const refBuf = Buffer.from(await refResp.arrayBuffer());

  // If side-by-side was used, crop the right half
  if (useSideBySide && halfWidth > 0) {
    console.log("[refine] Cropping right half from side-by-side result...");
    const resultMeta = await sharp(refBuf).metadata();
    const resultW = resultMeta.width || 0;
    const resultH = resultMeta.height || 0;
    // The right half starts at the midpoint
    const cropLeft = Math.floor(resultW / 2);
    const cropWidth = resultW - cropLeft;

    const cropped = await sharp(refBuf)
      .extract({ left: cropLeft, top: 0, width: cropWidth, height: resultH })
      .jpeg({ quality: 92 })
      .toBuffer();

    return `data:image/jpeg;base64,${cropped.toString("base64")}`;
  }

  return `data:image/jpeg;base64,${refBuf.toString("base64")}`;
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
        "Remove all furniture, rugs, curtains, artwork, and personal belongings from this room. " +
        "Show a completely empty room with clean bare walls and floor. " +
        "Reconstruct the floor and wall surfaces where furniture was removed. " +
        "While maintaining walls, floor material, ceiling, windows, and doors exactly as they are. " +
        "Shot on Canon 5D Mark IV, 16-35mm wide angle lens. Clean empty room ready for new owners.",
      input_image: imageBase64,
      aspect_ratio: "match_input_image",
      output_format: "jpg",
      prompt_upsampling: false,
    },
  });

  const vacUrl = extractUrl(vacOutput);
  const vacResp = await fetch(vacUrl);
  const vacBuf = await vacResp.arrayBuffer();
  return `data:image/jpeg;base64,${Buffer.from(vacBuf).toString("base64")}`;
}

/**
 * Detect removable objects in a room photo using GPT-4o Vision.
 * Returns a list of objects with names and approximate positions (% of image).
 */
export async function detectObjects(imageBase64: string): Promise<Array<{ id: number; name: string; x: number; y: number }>> {
  console.log("[detectObjects] Analyzing room for removable objects...");
  // Use higher resolution for detection — need to see small items
  const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");
  const compressed = await sharp(buffer)
    .resize(512, 512, { fit: "inside" })
    .jpeg({ quality: 50 })
    .toBuffer();
  console.log("[detectObjects] Compressed size:", compressed.length, "bytes");
  const compressedUri = `data:image/jpeg;base64,${compressed.toString("base64")}`;

  const result = await openaiChatViaProxy(
    [
      {
        role: "user",
        content: [
          { type: "image_url", image_url: { url: compressedUri, detail: "high" } },
          {
            type: "text",
            text: `Analyze this room photo. List EVERY single removable item — be very thorough, don't miss anything.
For each item provide:
- "name": short name in Russian (e.g. "полотенце", "кастрюля", "сковорода", "пакет хлеба")
- "x": horizontal center position as percentage (0-100, left to right)
- "y": vertical center position as percentage (0-100, top to bottom)

List ALL: dishes, pots, pans, utensils, towels, cloths, food packages, bottles, bags, boxes, papers, cables, shoes, toys, cleaning supplies, soap, sponges, personal items, decorations, magnets, etc.
Even small items like a single spoon or sponge should be listed separately.
Do NOT include: built-in furniture, appliances (oven, fridge, dishwasher, microwave, sink, stove), countertops, cabinets, walls, floor, ceiling.

Respond ONLY with a JSON array. Example:
[{"name":"полотенце","x":25,"y":60},{"name":"кастрюля","x":50,"y":35}]`,
          },
        ],
      },
    ],
    2000,
  );

  try {
    const cleaned = result.replace(/```json\n?|\n?```/g, "").trim();
    const objects = JSON.parse(cleaned) as Array<{ name: string; x: number; y: number }>;
    return objects.map((obj, i) => ({ id: i + 1, ...obj }));
  } catch {
    console.error("[detectObjects] Failed to parse GPT response:", result);
    return [];
  }
}

/**
 * Declutter — remove specific objects from a room (or all clutter if no list provided).
 */
export async function declutterRoom(imageBase64: string, objectsToRemove?: string[]): Promise<string> {
  const replicate = getReplicate();

  // Pass 1: Remove clutter
  const hasSpecificObjects = objectsToRemove && objectsToRemove.length > 0;
  const removeList = hasSpecificObjects ? objectsToRemove.join(", ") : null;

  console.log("[declutter] Pass 1: Removing", hasSpecificObjects ? removeList : "all clutter...");
  const dclOutput = await replicate.run("black-forest-labs/flux-kontext-pro", {
    input: {
      prompt: hasSpecificObjects
        ? `Remove only these specific items from this room: ${removeList}. ` +
          "Keep everything else exactly as it is — all furniture, appliances, and other objects must remain. " +
          "Clean the surfaces where removed items were. Professional real estate photography."
        : "Remove all clutter and personal items from this room: clothes, shoes, toys, papers, dishes, " +
          "bags, cables, laundry, trash, scattered objects on surfaces and floor. " +
          "Leave all furniture in place — only remove mess from surfaces and floor. " +
          "Clean tidy surfaces, clear floor. " +
          "While maintaining all furniture, walls, floor, ceiling, windows, and room layout exactly as they are. " +
          "Professional real estate photography.",
      input_image: imageBase64,
      aspect_ratio: "match_input_image",
      output_format: "jpg",
      prompt_upsampling: false,
    },
  });

  const dclUrl = extractUrl(dclOutput);
  const dclResp = await fetch(dclUrl);
  const dclBuf = await dclResp.arrayBuffer();
  const pass1Base64 = `data:image/jpeg;base64,${Buffer.from(dclBuf).toString("base64")}`;

  // Pass 2: Clean reflections and ghosting artifacts on glossy surfaces
  console.log("[declutter] Pass 2: Cleaning reflections on glossy surfaces...");
  const cleanOutput = await replicate.run("black-forest-labs/flux-kontext-pro", {
    input: {
      prompt:
        "Remove all phantom reflections and ghost artifacts from glass and glossy surfaces. " +
        "Glass should be clean and clear. Keep everything else exactly as it is.",
      input_image: pass1Base64,
      aspect_ratio: "match_input_image",
      output_format: "jpg",
      prompt_upsampling: false,
    },
  });

  const cleanUrl = extractUrl(cleanOutput);
  const cleanResp = await fetch(cleanUrl);
  const cleanBuf = await cleanResp.arrayBuffer();
  return `data:image/jpeg;base64,${Buffer.from(cleanBuf).toString("base64")}`;
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
