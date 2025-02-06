# API 

- You can build these entirely yourself and not use third party tools (but probably don't!)
- You can use a 3rd party library to help build them: [Express](https://www.npmjs.com/package/inquirer) and [Fastify](https://www.npmjs.com/package/commander) are big in the space. I'll give you an Express setup that you can ignore or not.
- The VS Code extension REST Client can be useful for testing API endpoints (changing methods, body, etc) - otherwise a client like Postman/Insomnia will be useful.
- Plan out the endpoints - which are you going to offer and why.
- For testing, I'd suggest can using vitest for unit tests and supertest for more functional end-to-end tests