const file = await Deno.open("thoughts.txt", {
  read: true,
  write: true,
  create: true,
  append: true,
});

const encoder = new TextEncoder();
const data = encoder.encode("This is a thought.\n");

await file.write(data);
file.close();

const revisitFile = await Deno.readTextFile("thoughts.txt");
console.log(revisitFile);

await Deno.writeTextFile("thoughts.txt", "This is a new thought.", {
  append: true,
});

const name = Deno.args[0];
console.log(`Hello, ${name}!`);

const home = Deno.env.get("HOME");
console.log(home);

function handler(): Response {
  return new Response("Hello from Deno!");
}

Deno.serve(handler);
