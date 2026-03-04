import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function enhancePhoto(imageUrl: string): Promise<string> {
  const output = await replicate.run(
    "tencentarc/gfpgan:0fbacf7afc6c144e5be9767cff80f25aff23e52b0708f17e20f9879b2f21516c",
    {
      input: {
        img: imageUrl,
        version: "v1.4",
        scale: 2,
      },
    }
  );
  return output as unknown as string;
}

export async function redesignRoom(
  imageUrl: string,
  style: string
): Promise<string> {
  const stylePrompts: Record<string, string> = {
    modern: "modern minimalist interior design, clean lines, neutral colors, professional real estate photo",
    scandinavian: "scandinavian interior design, light wood, white walls, cozy minimalist, professional real estate photo",
    loft: "industrial loft interior design, exposed brick, metal accents, open space, professional real estate photo",
    classic: "classic elegant interior design, warm colors, traditional furniture, professional real estate photo",
    japanese: "japanese minimalist interior design, zen style, natural materials, professional real estate photo",
  };

  const prompt = stylePrompts[style] || stylePrompts.modern;

  const output = await replicate.run(
    "jagilley/controlnet-hough:854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56c5c572c",
    {
      input: {
        image: imageUrl,
        prompt: prompt,
        num_samples: "1",
        image_resolution: "512",
        ddim_steps: 20,
        scale: 9,
        a_prompt: "best quality, extremely detailed, photo realistic, 8k, professional real estate photography",
        n_prompt: "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, blurry",
      },
    }
  );

  const outputArray = output as string[];
  return outputArray[1] || outputArray[0];
}
