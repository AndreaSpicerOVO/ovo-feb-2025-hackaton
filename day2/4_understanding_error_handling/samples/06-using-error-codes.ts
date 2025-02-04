export class CustomError extends Error {
  code: string;

  constructor(message: string, code: string) {
    super(message);
    this.code = code;
  }
}

function riskyOperation() {
  // Simulate different types of errors
  const errorType = Math.floor(Math.random() * 3);
  if (errorType === 0) {
    throw new CustomError("Failed to connect to the network", "NETWORK_ERROR");
  } else if (errorType === 1) {
    throw new CustomError("Invalid input data", "INVALID_INPUT");
  } else {
    throw new CustomError("An unknown error occurred", "UNKNOWN_ERROR");
  }
}

try {
  riskyOperation();
} catch (error) {
  if (error instanceof CustomError) {
    switch (error.code) {
      case "NETWORK_ERROR":
        console.error("Network error:", error.message);
        break;
      case "INVALID_INPUT":
        console.error("Input error:", error.message);
        break;
      case "UNKNOWN_ERROR":
        console.error("Unknown error:", error.message);
        break;
      default:
        console.error("Unhandled error:", error.message);
    }
  } else {
    console.error("General error:", error.message);
  }
}
