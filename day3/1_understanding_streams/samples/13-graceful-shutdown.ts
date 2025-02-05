import { createWriteStream } from "node:fs";

const writeStream = createWriteStream("output.txt");

process.on("SIGINT", () => {
  console.log("Received SIGINT. Cleaning up...");
  writeStream.end(() => {
    console.log("Write stream closed.");
    process.exit(0); // Exit gracefully
  });
});

writeStream.on("error", (error) => {
  console.error("Error in write stream:", error.message);
});
