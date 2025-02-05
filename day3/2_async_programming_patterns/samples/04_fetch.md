Introducing `fetch` with the AbortController is a great way to showcase handling asynchronous operations in a more granular way, especially with the ability to cancel requests which wasn't native in earlier promise implementations.

Here's a guided breakdown and introduction to this topic:

---

### **Introduction to Fetch**

`fetch` is a modern way to make HTTP requests in JavaScript. It returns a Promise that resolves with the `Response` object representing the response to the request. It's more flexible and versatile than `XMLHttpRequest`.

### **Example:**

Making a GET request is as simple as:
```javascript
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

### **The Limitation of Promises**

While Promises provide a great way to deal with asynchronous operations, one of their limitations historically has been that they couldn't be canceled once initiated. For long-running operations or ones that might not be needed if certain conditions change (like a user navigating away from a page or another event occurring that makes the result of the operation irrelevant), the inability to cancel can be problematic.

### **Introduction to AbortController**

To address this limitation, the `AbortController` and `AbortSignal` are introduced. They provide a way to cancel operations like Fetch requests.

- `AbortController`: This is the main controller object which has the `abort` method to signal a cancellation.
  
- `AbortSignal`: This is retrieved from an instance of `AbortController` and can be passed to any fetch request to allow for it to be aborted.

### **Worked Example:**

The following example showcases how to use `fetch` in conjunction with the `AbortController`:

```javascript
// [Insert your provided code here]
```

In this example:
1. The `getJson` function is an asynchronous function that makes a fetch request. The `signal` from `AbortController` is passed to it to allow for the request to be aborted.
2. If the request is aborted, an `AbortError` is thrown which is then caught in the catch block, logging "Request Aborted".
3. The `run` function demonstrates the use of our `getJson` function.
4. Finally, the request is aborted after a delay, showcasing the aborting in action.

### **Things to Note:**
- The `AbortController` can be used for other promises, not just fetch.
- Aborted fetch requests will reject with a `DOMException` named `AbortError`.
- It's a best practice to handle errors and potential abort scenarios gracefully for a better user experience.

