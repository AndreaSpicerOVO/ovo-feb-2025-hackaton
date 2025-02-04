// Define the calculate function
function calculate(a: number, b: number, operation: string): number {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("Inputs must be numbers");
  }

  if (operation === "divide" && b === 0) {
    throw new RangeError("Cannot divide by zero");
  }

  switch (operation) {
    case "add":
      return a + b;
    case "subtract":
      return a - b;
    case "multiply":
      return a * b;
    case "divide":
      return a / b;
    default:
      throw new Error(`Unknown operation: ${operation}`);
  }
}

// Test the function with error handling
try {
  console.log("Result:", calculate(10, 5, "add")); // 15
  console.log("Result:", calculate(10, 0, "divide")); // Should throw RangeError
  console.log("Result:", calculate("10" as any, 5, "add")); // Should throw TypeError
  console.log("Result:", calculate(10, 5, "mod")); // Should throw Error for unknown operation
} catch (error) {
  if (error instanceof TypeError) {
    console.error("Type Error:", error.message);
  } else if (error instanceof RangeError) {
    console.error("Range Error:", error.message);
  } else {
    console.error("Error:", error.message);
    throw error; // Re-throw unexpected errors
  }
}
