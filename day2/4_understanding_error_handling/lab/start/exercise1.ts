class InvalidInputError extends Error {
  // TODO: Add properties and constructor
}

function processData(input) {
  // TODO: Implement validation logic
}

// Test the function with try/catch
try {
  processData(123); // Should throw an InvalidInputError
} catch (error) {
  if (error instanceof InvalidInputError) {
    console.error("Error:", error.message, "Invalid Input:", error.inputValue);
  } else {
    throw error;
  }
}
