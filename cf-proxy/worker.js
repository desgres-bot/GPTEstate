export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Image hosting endpoint: POST /image -> stores image, returns URL
    if (url.pathname === "/image" && request.method === "POST") {
      const body = await request.arrayBuffer();
      const id = crypto.randomUUID();
      const key = `img_${id}`;

      // Store in KV with 1 hour TTL
      await env.IMAGES.put(key, body, {
        expirationTtl: 3600,
        metadata: { contentType: request.headers.get("content-type") || "image/jpeg" },
      });

      const imageUrl = `${url.origin}/image/${key}`;
      return new Response(JSON.stringify({ url: imageUrl }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // Serve stored image
    if (url.pathname.startsWith("/image/img_")) {
      const key = url.pathname.replace("/image/", "");
      const { value, metadata } = await env.IMAGES.getWithMetadata(key, { type: "arrayBuffer" });
      if (!value) {
        return new Response("Not found", { status: 404 });
      }
      return new Response(value, {
        headers: { "Content-Type": metadata?.contentType || "image/jpeg" },
      });
    }

    // OpenAI proxy for all other requests
    const targetUrl = "https://api.openai.com" + url.pathname + url.search;

    const newHeaders = new Headers();
    for (const [key, value] of request.headers.entries()) {
      if (key.toLowerCase() !== "host") {
        newHeaders.set(key, value);
      }
    }

    const init = {
      method: request.method,
      headers: newHeaders,
    };

    if (request.method !== "GET" && request.method !== "HEAD") {
      init.body = request.body;
    }

    const response = await fetch(targetUrl, init);

    const newResponseHeaders = new Headers(response.headers);
    newResponseHeaders.set("Access-Control-Allow-Origin", "*");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newResponseHeaders,
    });
  },
};
