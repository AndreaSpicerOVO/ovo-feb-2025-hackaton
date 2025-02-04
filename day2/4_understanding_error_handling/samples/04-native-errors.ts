// 04-native-errors.ts

// EvalError
try {
  throw new EvalError("This is an EvalError");
} catch (e) {
  console.log(e.name + ": " + e.message);
}

// RangeError
try {
  throw new RangeError("This is a RangeError");
} catch (e) {
  console.log(e.name + ": " + e.message);
}

// ReferenceError
try {
  throw new ReferenceError("This is a ReferenceError");
} catch (e) {
  console.log(e.name + ": " + e.message);
}

// SyntaxError
try {
  eval("foo bar");
} catch (e) {
  console.log(e.name + ": " + e.message);
}

// TypeError
try {
  throw new TypeError("This is a TypeError");
} catch (e) {
  console.log(e.name + ": " + e.message);
}

// URIError
try {
  decodeURIComponent("%");
} catch (e) {
  console.log(e.name + ": " + e.message);
}

// AggregateError (ES2021)
try {
  throw new AggregateError(
    [new Error("Error 1"), new Error("Error 2")],
    "This is an AggregateError"
  );
} catch (e) {
  console.log(e.name + ": " + e.message);
  for (const err of (e as AggregateError).errors) {
    console.log(err.message);
  }
}
