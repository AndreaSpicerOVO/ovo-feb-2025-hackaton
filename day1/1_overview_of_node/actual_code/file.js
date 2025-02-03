import fs from "node:fs";

console.log(process.argv[2]);

fs.readFile(process.argv[2], "utf-8", (error, data) => {
  if (error) {
    console.log(error);
  }
  console.log(data);
});
