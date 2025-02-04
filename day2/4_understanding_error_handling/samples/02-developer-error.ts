function addNumbers(a: number, b: number) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("addNumbers expects numbers.");
  }
  return a + b;
}

try {
  addNumbers(10, "20");
} catch (error) {
  console.error(error.message); // Output: addNumbers expects numbers.
}
