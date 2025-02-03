// const http = require("node:http");
import http from "node:http";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<h1>Welcome to Bristol</h1>");
  res.end();
});
server.listen(4321);
