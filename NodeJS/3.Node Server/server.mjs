// ? Import required modules
import http from "http";
// console.log(http);

// ? Define the handler
const requestHandler = (request, response) => {
  console.log(request);
  // send response
  response.writeHead(200, { "content-type": "text/ plain" });
  response.end("Hello world!");
};

// ? Create the server
const server = http.createServer(requestHandler);

// ? Start our server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
