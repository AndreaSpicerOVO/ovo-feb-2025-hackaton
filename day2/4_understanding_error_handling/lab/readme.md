
### Exercise 1: Creating a Custom Error Class

**Objective**: Create a custom error class for handling specific validation errors.

**Scenario**: You're building a validation function for processing user input in a web application. Invalid inputs should throw a clear and specific error.

**Task**:
1. Create a custom error class called `InvalidInputError` that extends the `Error` class.
   - Include a property for the invalid input value (e.g., `inputValue`) and a custom message.
2. Write a function `processData(input)`:
   - Throw `InvalidInputError` if the input is not a string or is empty.
3. Use a `try/catch` block to:
   - Call `processData` with invalid input.
   - Catch and log the error message and input value.

### Exercise 2: Handling Different Types of Errors

**Objective**: Differentiate and handle multiple error types in a single `catch` block.

**Scenario**: You're building a calculator API. The API needs to validate input and handle edge cases, such as dividing by zero.

**Task**:
1. Write a function `calculate(a, b, operation)`:
   - Throw a `TypeError` if `a` or `b` is not a number.
   - Throw a `RangeError` if the operation is `divide` and `b` is 0.
   - Perform the calculation and return the result.
2. Use a `try/catch` block to:
   - Call `calculate` with various inputs (valid and invalid).
   - Distinguish between `TypeError` and `RangeError` in the `catch` block, logging a clear message for each.

**Starter Code**:
```javascript
function calculate(a, b, operation) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Inputs must be numbers');
  }
  if (operation === 'divide' && b === 0) {
    throw new RangeError('Cannot divide by zero');
  }

  switch (operation) {
    case 'add': return a + b;
    case 'subtract': return a - b;
    case 'multiply': return a * b;
    case 'divide': return a / b;
    default: throw new Error('Unknown operation');
  }
}

// Test the function
try {
  console.log(calculate(10, 2, 'add'));       // 12
  console.log(calculate('10', 2, 'add'));    // Should throw TypeError
  console.log(calculate(10, 0, 'divide'));   // Should throw RangeError
} catch (error) {
  if (error instanceof TypeError) {
    console.error('Type Error:', error.message);
  } else if (error instanceof RangeError) {
    console.error('Range Error:', error.message);
  } else {
    throw error;
  }
}