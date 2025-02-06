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
