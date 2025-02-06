interface Person {
  name: string;
}

function sayHello(person: Person) {
  console.log(`Hello, ${person.name}`);
}

sayHello({ name: "Luke" });

const handler = (request: Request): Response => {
  console.log(request.method);
  const url = new URL(request.url);
  console.log(url);
  if (request.method === "POST") {
  }
  return new Response("Hello from Ovo!", {
    headers: { "content-type": "text/plain" },
  });
};

Deno.serve(handler);
