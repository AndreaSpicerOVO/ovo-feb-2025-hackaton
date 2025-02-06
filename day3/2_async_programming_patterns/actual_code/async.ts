import { setTimeout } from "node:timers/promises";

const inputData = [1, 2, 3, 4, 5, 6, 7];
const outputData: number[] = [];

async function doSomething(input: any) {
  await setTimeout(100);
  return input;
}

function* getData() {
  await setTimeout(100);
  return inputData;
}

async function run() {
  for (let data of getData()) {
    const result = await doSomething(data);
    outputData.push(result);
  }
  console.log(outputData);
}

run();
