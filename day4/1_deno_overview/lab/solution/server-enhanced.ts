const port = 8000;

const store = new Map<string, { url: string; count: number }>();

console.log(`Server running on http://localhost:${port}/`);

// Load mappings from file
const storeFile = "./store.json";
if (await Deno.stat(storeFile).catch(() => null)) {
  const data = JSON.parse(await Deno.readTextFile(storeFile));
  for (const [key, value] of Object.entries(data)) {
    store.set(key, value as { url: string; count: number });
  }
}

// Save mappings to file
async function saveToFile() {
  const data = Object.fromEntries(store);
  await Deno.writeTextFile(storeFile, JSON.stringify(data, null, 2));
}

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const id = url.pathname.substring(1);

  // POST /shorten: Shorten a URL
  if (req.method === "POST" && url.pathname === "/shorten") {
    const body = await req.json();
    const originalUrl = body.url;
    const customId = body.customId;
    let shortId = "";

    if (customId) {
      if (store.has(customId)) {
        return new Response("Custom ID already exists", { status: 400 });
      }
      shortId = customId;
    } else {
      shortId = crypto.randomUUID().substring(0, 6);
    }

    store.set(shortId, { url: originalUrl, count: 0 });
    await saveToFile();

    return new Response(
      JSON.stringify({ shortUrl: `http://localhost:${port}/${shortId}` }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // GET /:id: Resolve a shortened URL
  if (req.method === "GET" && store.has(id)) {
    const entry = store.get(id)!;
    entry.count += 1; // Increment visit count
    store.set(id, entry);
    await saveToFile();
    return new Response(null, {
      status: 302,
      headers: { Location: entry.url },
    });
  }

  // GET /stats: Retrieve access stats
  if (req.method === "GET" && url.pathname === "/stats") {
    return new Response(JSON.stringify([...store.entries()], null, 2), {
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response("Not Found", { status: 404 });
});
