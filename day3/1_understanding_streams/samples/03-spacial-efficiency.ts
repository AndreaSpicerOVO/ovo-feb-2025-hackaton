import buffer from "node:buffer";
console.log(buffer.constants.MAX_LENGTH);
import { promises as fs } from "node:fs";
import { gzip } from "node:zlib";
import { promisify } from "node:util";

const gzipPromise = promisify(gzip);

const filename = process.argv[2];

async function main() {
  const data = await fs.readFile(filename);
  const gzippedData = await gzipPromise(data);
  await fs.writeFile(`${filename}.gz`, gzippedData);
  console.log("File successfully compressed");
}

main();

/**
 * 
 * If we choose a file that is big enough, we'll get an error message like this:

```
RangeError [ERR_FS_FILE_TOO_LARGE]: File size is greater than possible Buffer
```
 * 
 */
