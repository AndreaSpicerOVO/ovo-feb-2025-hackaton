import { Readable } from "node:stream";

async function* generateNumbers(max) {
  let current = 1;
  while (current <= max) {
    console.log(`Pushing number: ${current}`);
    yield new Promise((resolve) =>
      setTimeout(() => resolve(String(current++)), 1000)
    );
  }
}

function NumberStreamFunction(max, options) {
  return Readable.from(generateNumbers(max), options);
}

const numberStreamFunction = NumberStreamFunction(10);
numberStreamFunction.on("data", (data) => console.log(data));
