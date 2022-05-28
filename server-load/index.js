const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;
//* Count the number of times the server has been visited
let count = 1;

const server = http.createServer((req, res) => {
  console.log(`VISITS: ${count++}`);
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");

  //? user-agent correpsonds to the user's browser
  res.end(`Hello ${req.headers["user-agent"]}`);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
