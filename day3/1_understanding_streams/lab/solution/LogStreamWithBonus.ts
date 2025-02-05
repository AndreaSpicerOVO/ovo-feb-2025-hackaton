import fs from "fs";
import path from "path";
import { Writable } from "stream";

// Define the interface for log data
interface LogData {
  level: string;
  message: string;
}

// Custom Writable stream class for logging with log rotation
class LogStream extends Writable {
  private currentLogSize: number;
  private maxLogSize: number;
  private logFilePath: string;

  constructor(logFilePath: string, maxLogSize: number) {
    super({ objectMode: true });
    this.logFilePath = logFilePath;
    this.maxLogSize = maxLogSize;
    this.currentLogSize = 0;

    // Initialize log file size
    if (fs.existsSync(logFilePath)) {
      this.currentLogSize = fs.statSync(logFilePath).size;
    }
  }

  private rotateLogFile() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const rotatedFilePath = path.join(
      path.dirname(this.logFilePath),
      `application-${timestamp}.log`
    );

    fs.renameSync(this.logFilePath, rotatedFilePath);
    console.log(`Log file rotated to: ${rotatedFilePath}`);
    this.currentLogSize = 0;
  }

  _write(
    logData: LogData,
    encoding: BufferEncoding,
    callback: (error?: Error | null) => void
  ): void {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} [${logData.level}]: ${logData.message}\n`;

    // Rotate log file if size exceeds the max size
    this.currentLogSize += Buffer.byteLength(logEntry);
    if (this.currentLogSize > this.maxLogSize) {
      this.rotateLogFile();
    }

    // Append the log entry to the file
    fs.appendFile(this.logFilePath, logEntry, (err) => {
      if (err) {
        console.error("Error writing to log file:", err);
        return callback(err);
      }
      callback();
    });
  }
}

// Instantiate the LogStream with a max size of 1 MB
const logger = new LogStream("application.log", 1 * 1024 * 1024); // 1 MB

// Handle process shutdown and clean up resources
function handleShutdown() {
  logger.end(() => {
    console.log("Process is shutting down. Closing log stream.");
  });
}

// Setup signal handlers for graceful shutdown
process.on("SIGINT", handleShutdown);
process.on("SIGTERM", handleShutdown);
process.on("exit", handleShutdown);

// Error handling for the logger
logger.on("error", (error) => {
  console.error("Stream error:", error);
});

// Test the logging system
function testLoggingSystem() {
  for (let i = 0; i < 100; i++) {
    logger.write({ level: "INFO", message: `Log message ${i + 1}` });
  }
}

// Run the test function
testLoggingSystem();
