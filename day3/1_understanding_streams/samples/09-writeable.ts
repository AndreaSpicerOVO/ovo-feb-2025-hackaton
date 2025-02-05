import { Writable } from "node:stream";
import { appendFile } from "node:fs/promises";

class FileLogger extends Writable {
  constructor(logFilePath, options = {}) {
    super(options);
    this.logFilePath = logFilePath;
  }

  async _write(chunk, encoding, callback) {
    try {
      const logMessage = `[${new Date().toISOString()}] ${chunk.toString()}\n`;
      await appendFile(this.logFilePath, logMessage);
      console.log(`Logged: ${logMessage.trim()}`);
      callback(); // Signal that the chunk has been processed
    } catch (err) {
      callback(err); // Pass the error to indicate failure
    }
  }
}

// Example usage
const logger = new FileLogger("app.log");

// Write some log messages
logger.write("Server started");
logger.write("User logged in");
logger.write("Error: Unable to fetch data");

// End the stream
logger.end(() => console.log("Finished logging."));
