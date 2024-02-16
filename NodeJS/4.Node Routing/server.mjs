// ? Import required modules
import http from "http";
import url from "url";
// console.log(http);

// ? Define the handler
const requestHandler = (request, response) => {
  const parsedUrl = url.parse(request.url, true);
  console.log(parsedUrl);

  // ? Create 2 new rooutes: home (/) and /about
  // ! Home page
  if (parsedUrl.pathname === "/" && request.method === "GET") {
    // send response
    response.writeHead(200, { "content-type": "text/ plain" });
    response.end("Welcome to the home page!");
  }

  // ! About page
  else if (parsedUrl.pathname === "/about" && request.method === "GET") {
    // send response
    response.writeHead(200, { "content-type": "text/ plain" });
    response.end("This is the about page!");
  } else {
    // send response
    response.writeHead(200, { "content-type": "text/ plain" });
    response.end("Not found!");
  }
};

// ? Create the server
const server = http.createServer(requestHandler);

// ? Start our server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
