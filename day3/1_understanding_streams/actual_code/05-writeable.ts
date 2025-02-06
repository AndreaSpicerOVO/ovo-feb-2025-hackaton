import { Writable } from "node:stream";
import { appendFile } from "node:fs/promises";

// class MyWritable extends Writable {
//   constructor(options = { objectMode: true }) {
//     super(options);
//   }

//   _write() {}
// }

const MyWritable = new Writable({
  async write(chunk: string, encoding, callback) {
    console.log(typeof chunk);
    const date = new Date();
    console.log(`Log: ${date.toISOString()}`);
    await appendFile("test.txt", `${chunk} - ${date.toISOString()}\n`);
    callback();
  },
  objectMode: true,
});

MyWritable.write(121);
MyWritable.write("HOw are you?");
MyWritable.write("Fine.");
