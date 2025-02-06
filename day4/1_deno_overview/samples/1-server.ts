const handler = (): Response => {
  return new Response("Hello from Deno!", {
    headers: { "content-type": "text/plain" },
  });
};

Deno.serve(handler);
