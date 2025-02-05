// Import the necessary modules

// Create a buffer from a string
const buffer = Buffer.from("Hello, World!", "utf-8");

console.log("Original Buffer:", buffer);

// Convert the buffer to a JSON object using toJSON method
const jsonObject = buffer.toJSON();

console.log("Buffer to JSON Object:", jsonObject);

// Convert the JSON object back to a buffer
const jsonBuffer = Buffer.from(jsonObject.data);

console.log("JSON Object to Buffer:", jsonBuffer);
