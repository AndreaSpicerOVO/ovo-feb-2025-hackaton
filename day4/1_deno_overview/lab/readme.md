# Create a URL Shortener with Deno

The aim of this lab is to create a REST API that has two endpoints:
- `POST /shorten`: Accepts a long URL and returns a shortened version
- `GET /:id`: Resolves the shortened URL to its original URL

You can use an in-memory store (e.g. a `Map`) to save mappings.

You need to generate unique identifiers for shortened URLs.


## Extra Credit
- Add automated testing
- Use a file to store mappings between server restarts
- Allow users to specify a custom short ID when shortening URLs
- Add an endpoint to track the number of times each short URL has been accessed



### **Step-by-Step Breakdown of the Deno URL Shortener**

This Deno script creates a simple **URL shortener** that allows users to shorten URLs via a `POST` request and redirects them when they visit the shortened URL via a `GET` request.

---

## **1️⃣ Set Up Server Variables**
```ts
const port = 8080;
const store = new Map<string, string>();
```
- **`port = 8080`** → The server will run on `http://localhost:8080/`.
- **`store = new Map<string, string>()`** → A **key-value store** (in-memory database) where:
  - **Key** → A short ID.
  - **Value** → The original URL.

---

## **2️⃣ Log the Server Start Message**
```ts
console.log(`Server running on http://localhost:${port}/`);
```
- This prints a message to confirm the server is running.

---

## **3️⃣ Start the Server with `Deno.serve()`**
```ts
Deno.serve(async (req) => {
```
- `Deno.serve()` starts an **HTTP server** and handles each incoming request using the callback function `(req) => {}`.

---

## **4️⃣ Extract the Requested URL Path**
```ts
const url = new URL(req.url);
const id = url.pathname.substring(1);
```
- **`req.url`** contains the full request URL (e.g., `http://localhost:8080/shorten`).
- **`new URL(req.url)`** parses it into an object, allowing easy access to the `pathname`.
- **`url.pathname.substring(1)`** removes the leading `/` from the path.

  | Example Request | `url.pathname` | `id` |
  |---------------|--------------|------|
  | `http://localhost:8080/abc123` | `/abc123` | `abc123` |
  | `http://localhost:8080/shorten` | `/shorten` | `"shorten"` |

---

## **5️⃣ Handle the `POST /shorten` Request (Create a Short URL)**
```ts
if (req.method === "POST" && url.pathname === "/shorten") {
  const body = await req.json();
  const originalUrl = body.url;
```
- If the request is a **POST to `/shorten`**, it reads the request **JSON body** and extracts `body.url`.

```ts
  const shortId = crypto.randomUUID().substring(0, 6);
```
- **`crypto.randomUUID()`** generates a unique identifier.
- **`.substring(0, 6)`** trims it to **6 characters** for a short URL.

```ts
  store.set(shortId, originalUrl);
```
- Saves the **original URL** in the `store` using `shortId` as the key.

```ts
  return new Response(
    JSON.stringify({ shortUrl: `http://localhost:${port}/${shortId}` }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
```
- Returns a JSON response containing the shortened URL.

### **Example Request:**
#### Request:
```http
POST /shorten HTTP/1.1
Content-Type: application/json

{
  "url": "https://example.com"
}
```
#### Response:
```json
{
  "shortUrl": "http://localhost:8080/abc123"
}
```

---

## **6️⃣ Handle the `GET /:shortId` Request (Redirect)**
```ts
if (req.method === "GET" && store.has(id)) {
```
- If a `GET` request is made **and the short ID exists in `store`**, proceed.

```ts
  const originalUrl = store.get(id)!;
```
- Retrieves the **original URL**.

```ts
  return new Response(null, {
    status: 302,
    headers: { Location: originalUrl },
  });
```
- Returns a **302 Redirect** to the original URL.

### **Example Request:**
#### Request:
```http
GET /abc123 HTTP/1.1
```
#### Response:
```http
HTTP/1.1 302 Found
Location: https://example.com
```
📌 The browser automatically **redirects** to `https://example.com`.

---

## **7️⃣ Handle Invalid Requests**
```ts
return new Response("Not Found", { status: 404 });
```
- If **no match** is found (invalid path or ID), return a **404 Not Found** response.

---

### **🚀 Full Process Summary**
| Step | Action |
|------|--------|
| 1️⃣ | Start the server on `http://localhost:8080/`. |
| 2️⃣ | When a `POST /shorten` request comes in: Extract the original URL, generate a short ID, store it, and return a short URL. |
| 3️⃣ | When a `GET /:shortId` request comes in: Look up the short ID, return a **302 Redirect** to the original URL. |
| 4️⃣ | If an unknown route is requested, return **404 Not Found**. |

---

### **✅ Running the Code**
1. **Save this script as `server.ts`**.
2. **Run the server with Deno**:
   ```sh
   deno run --allow-net --allow-read server.ts
   ```
3. **Test it using `curl` or Postman**.

