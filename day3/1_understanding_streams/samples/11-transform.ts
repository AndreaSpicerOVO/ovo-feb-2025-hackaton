import { createReadStream, createWriteStream, read } from "fs";
import { Transform, TransformCallback, PassThrough, pipeline } from "stream";
import { createGzip } from "node:zlib";

// open the text file
// get rid of the word test
// write the solution to a new file

const readStream = createReadStream("longtext.txt");
const writeStream = createWriteStream("no-test.txt.gz");

const transformStream = new Transform({
  transform(chunk, encoding, callback) {
    const result = chunk.toString().replaceAll("test", "");
    this.push(result);
    callback();
  },
});

const monitor = new PassThrough();

monitor.on("data", (chunk) => {
  const data = chunk.toString();
  console.log("Contains test?", data.includes("test"));
});

monitor.on("error", () => console.log("whoops!"));

// readStream
//   .pipe(transformStream)
//   .pipe(monitor)
//   .pipe(createGzip())
//   .pipe(writeStream)
//   .on("finish", () => {
//     console.log("all done");
//   })
//   .on("error", () => console.log("something went wrong"));

transformStream.on("error", () => { });

pipeline(
  readStream,
  monitor,
  transformStream,
  createGzip(),
  writeStream,
  (err) => {
    if (err) {
      console.log("error", err);
    } else {
      console.log("Stream is done!");
    }
  }
);
