import { sing } from "./2-sing.ts";
import { assertEquals } from "jsr:@std/assert";

Deno.test("sing repeats a phrase", () => {
  const result = sing("Woof", 3);
  assertEquals(result, "Woof Woof Woof");
});

// deno test
// deno test --coverage
// deno coverage
