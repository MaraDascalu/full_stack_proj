// ? Import required modules
import http from "http";
import url from "url";

// ? Define the handler
const requestHandler = (request, response) => {
  const parsedUrl = url.parse(request.url, true);
  const pathname = parsedUrl.pathname;
  const pathCompponent = pathname.split("/").filter(Boolean);
  if (pathCompponent[0] === "products" && pathCompponent[1]) {
    const productId = pathCompponent[1];
    // send to the user
    response.writeHead(200, { "content-type": "text/ plain" });
    response.end(`Product id: ${productId}`);
  } else {
    response.writeHead(200, { "content-type": "text/ plain" });
    response.end("Not found!");
  }
  console.log(parsedUrl);
};

// ? Create the server
const server = http.createServer(requestHandler);

// ? Start our server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
