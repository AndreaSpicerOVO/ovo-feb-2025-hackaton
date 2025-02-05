const fs = require("fs");
const { Writable } = require("stream");

const logFile = fs.createWriteStream("application.log");

// Either:
class LogStream extends Writable {
  // Implement the _write method
}

const logger = new LogStream("application.log");

// Or

// function createLogStream(logFilePath: string) {
//   return new Writeable()
// }

// const logger = createLogStream("application.log")

// Handle process shutdown and clean up resources
function handleShutdown() {
  logger.end();
  console.log("Process is shutting down. Closing log stream.");
}

process.on("SIGINT", handleShutdown);
process.on("SIGTERM", handleShutdown);
process.on("exit", handleShutdown);
