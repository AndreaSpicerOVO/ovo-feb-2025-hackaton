### Exercise: Stream-Based Logging System

#### Objective:
Create a stream-based logging system that writes structured log messages to a file. The system should handle errors gracefully and clean up resources on process shutdown.

#### Tasks:
1. **Implement the `LogStream` class**:
   - Use the `Writable` stream interface.
   - Write structured log messages (e.g., `{ level: "INFO", message: "This is a log" }`) to a file.
   - Format each log message with a timestamp and level, e.g., `[2025-01-07T12:00:00Z] [INFO]: This is a log`.

2. **Handle Errors**:
   - Log errors to the console when the stream encounters issues.
   - Ensure the stream shuts down cleanly in case of errors.

3. **Graceful Shutdown**:
   - Ensure the log stream is properly closed on `SIGINT`, `SIGTERM`, or process exit.

4. **Bonus Challenge**:
   - Implement log rotation:
     - Rotate the log file when it exceeds a certain size.
     - Rename the current log file and start a new one.


