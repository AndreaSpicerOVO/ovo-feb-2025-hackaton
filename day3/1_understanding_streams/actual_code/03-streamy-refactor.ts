import { createReadStream, createWriteStream } from "node:fs";
import { createGzip } from "node:zlib";

const filename = process.argv[2];
console.time();
createReadStream(filename)
  .pipe(createGzip())
  .pipe(createWriteStream(`${filename}.stream.gz`))
  .on("finish", () => {
    console.log("File successfully compressed.");
    console.timeEnd();
  });
