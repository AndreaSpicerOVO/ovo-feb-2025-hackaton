function calculate(a, b, operation) {
  // Implement your logic here
}

// Test the function with different scenarios
try {
  console.log(calculate(10, 2, "add")); // 12
  console.log(calculate("10", 2, "add")); // Should throw TypeError
  console.log(calculate(10, 0, "divide")); // Should throw RangeError
} catch (error) {
  // TODO: Handle the different error types
}
