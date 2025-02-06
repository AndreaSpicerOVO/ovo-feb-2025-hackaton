import fs from "node:fs/promises";
import { gzip } from "node:zlib";
import { promisify } from "node:util";
import buffer from "node:buffer";

console.log(buffer.constants.MAX_LENGTH);

const gzipPromise = promisify(gzip);

const filename = process.argv[2];

const gzipPromiseManually = (file) =>
  new Promise((resolve, reject) => {
    gzip(file, (error, data) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    });
  });

async function main() {
  console.time();
  const data = await fs.readFile(filename);
  const zippedFile = await gzipPromise(data);
  await fs.writeFile(`${filename}.gz`, zippedFile);
  console.log("File successfully compressed");
  console.timeEnd();
}

// RangeError [ERR_FS_FILE_TOO_LARGE]
main();
