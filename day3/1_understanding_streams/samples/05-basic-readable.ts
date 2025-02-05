import { createReadStream } from "fs";
import { EventEmitter } from "node:events";

const readStream = createReadStream("longtext.txt");

console.log(readStream instanceof EventEmitter); // true, streams extend EventEmitter

// Handling data event
readStream.on("data", (chunk) => {
  console.log(chunk.length); // Log chunk size
});

// Handling end event
readStream.on("end", () => {
  console.log("All done with the data!"); // Indicates the stream has finished
});

// Handling close event
readStream.on("close", () => {
  console.log("Close the file"); // Indicates the file descriptor is closed
});

// Handling error event
readStream.on("error", (error) => {
  console.log("Something went wrong.", error.message); // Log any errors
});
