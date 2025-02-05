import { createReadStream } from "node:fs";

const readStream = createReadStream("example.txt");

readStream.on("data", (chunk) => {
  console.log("Received chunk:", chunk.toString());
});

readStream.on("error", (error) => {
  console.error("An error occurred while reading the file:", error.message);
});

readStream.on("end", () => {
  console.log("Stream ended successfully.");
});
