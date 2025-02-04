// Define the custom error class
export class InvalidInputError extends Error {
  inputValue: any;

  constructor(message: string, inputValue: any) {
    super(message);
    this.name = "InvalidInputError";
    this.inputValue = inputValue;
  }
}

// Function to process data
function processData(input: string): void {
  if (typeof input !== "string" || input.trim() === "") {
    throw new InvalidInputError("Input must be a non-empty string", input);
  }

  console.log("Processing:", input);
}

// Test the function
try {
  processData(123 as any); // Invalid input
} catch (error) {
  if (error instanceof InvalidInputError) {
    console.error("Error:", error.message);
    console.error("Invalid Input:", error.inputValue);
  } else {
    throw error; // Re-throw unexpected errors
  }
}

try {
  processData(""); // Invalid input
} catch (error) {
  if (error instanceof InvalidInputError) {
    console.error("Error:", error.message);
    console.error("Invalid Input:", error.inputValue);
  } else {
    throw error; // Re-throw unexpected errors
  }
}

try {
  processData("Valid input"); // Valid input
} catch (error) {
  console.error("Unexpected error:", error);
}
