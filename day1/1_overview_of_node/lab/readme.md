### Building with Node

This is a longer exercise and practices all of the things we've looked at so far.

Feel free to use the code we wrote during the class and the solution code to help you.

Do ask questions of me and of each other if you get stuck. Feel free to go off-piste and dive into aspects that interest you.

Keep note of any questions/wonderings/discoveries you have during the exercise so that we can share them together.

---

#### Stage 1: Setting Up the Server

**Objective:** Create a basic Node.js server that listens on a specified port.

- Set up a new project and create the initial `server.js` file.
- Write code to import the `http` module.
- Create a basic server that listens on port 3000.
- Test the server by running:
  ```bash
  node server.js
  ```
- **Optional:** Add the `--watch` flag to automatically restart the server on file changes:
  ```bash
  node --watch server.js
  ```

**Prompt:** What happens when you visit `http://localhost:3000` in your browser?

---

#### Stage 2: Serving Static HTML Content

**Objective:** Serve static HTML content for different routes.

- Import the `url` module to parse incoming request paths.
- Set up routes for `'/'` (homepage) and `'/about'`.
- Serve simple HTML content for these routes:
  - Homepage: Welcome message.
  - About: A brief description of yourself.
- Test the server to ensure it serves the correct content on each route.

**Prompt:** What happens when you navigate to a route that doesn’t exist? How could you improve the response?

---

#### Stage 3: Dynamic Content and Environment Variables

**Objective:** Introduce dynamic content and environment variables.

- Create a `.env` file and define a `PORT` variable:
  ```
  PORT=4000
  ```
- Update your server to read the port from the environment:
  ```javascript
  const port = process.env.PORT || 3000;
  ```
- Modify the homepage to include a dynamic message passed as a command-line argument. For example:
  ```bash
  node --watch --env-file=.env server.js "Hello from Ovo!"
  ```
- Use `process.argv` to display the dynamic message on the homepage.
- Test the server with different port configurations and command-line messages.

**Prompt:** Why is using environment variables beneficial for scalable applications?

---

#### Stage 4: Handling POST Requests and File Operations

**Objective:** Handle POST requests and perform file operations.

> Note: This part involves handling more complexity—refer to the solution code if needed. We will review it together.

- Import the `fs` and `querystring` modules.
- Add a `/contact` route that:
  - Serves a form on `GET` requests.
  - Processes form data on `POST` requests.
- Append submitted messages to a `messages.txt` file.
- Read and display the contents of `messages.txt` on the `/contact` page.

**Prompt:** What happens if `messages.txt` doesn’t exist? How can you ensure your code handles this gracefully?

---

#### Stage 5: Error Handling and Response Codes

**Objective:** Implement error handling and proper use of HTTP response codes.

- Add error handling for file operations:
  - Handle cases where `messages.txt` doesn’t exist.
  - Log any errors to the console and display a user-friendly message.
- Use appropriate HTTP response codes:
  - `302` for redirection after POST.
  - `404` for non-existent routes.
- Test the error handling by:
  - Navigating to invalid routes.
  - Deleting `messages.txt` and submitting a message.

**Prompt:** How can proper error handling improve the user experience and code reliability?

---

#### Stage 6: Refactoring and Best Practices

**Objective:** Refactor the code for better structure and apply best practices.

- Refactor repetitive code into modular functions (e.g., for generating HTML content or handling routes).
- Separate the server logic into different files/modules if necessary.
- Apply consistent coding standards and formatting.
- Test the refactored application to ensure it still functions as expected.

**Prompt:** How does modularizing your code improve maintainability and readability?

---

### Final Reflection

1. What did you find most challenging in this exercise?
2. How would you further improve or extend this application?
3. Why might you use a framework like Express in the future instead of writing a server from scratch?

---

### Optional Extensions

- Add CSS to style the HTML responses.
- Introduce additional routes, such as `/projects` or `/services`.
- Implement form validation on the `/contact` page.
- Explore advanced concepts like middleware, templating engines, or a database integration.
