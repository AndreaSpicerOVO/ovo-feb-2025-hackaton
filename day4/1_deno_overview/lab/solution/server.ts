const port = 8080;
const store = new Map<string, string>();

console.log(`Server running on http://localhost:${port}/`);

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const id = url.pathname.substring(1);

  if (req.method === "POST" && url.pathname === "/shorten") {
    const body = await req.json();
    const originalUrl = body.url;

    const shortId = crypto.randomUUID().substring(0, 6);
    store.set(shortId, originalUrl);

    return new Response(
      JSON.stringify({ shortUrl: `http://localhost:${port}/${shortId}` }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  if (req.method === "GET" && store.has(id)) {
    const originalUrl = store.get(id)!;
    return new Response(null, {
      status: 302,
      headers: { Location: originalUrl },
    });
  }

  return new Response("Not Found", { status: 404 });
});
