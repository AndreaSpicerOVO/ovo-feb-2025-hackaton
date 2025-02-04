function riskyOperation() {
  // Simulate different types of errors
  const errorType = Math.floor(Math.random() * 3);
  if (errorType === 0) {
    throw new Error("Failed to connect to the network");
  } else if (errorType === 1) {
    throw new TypeError("Invalid input data");
  } else {
    throw new Error("An unknown error occurred");
  }
}

try {
  riskyOperation();
} catch (error) {
  if (error instanceof TypeError) {
    console.error("Type error:", error.message);
  } else {
    console.error("General error:", error.message);
  }
}
