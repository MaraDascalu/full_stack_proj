// ? Import required modules
import http from "http";

// mimic (database)
const employees = [
  { id: 1, name: "Emmanuel" },
  { id: 2, name: "Marie" },
];

// ? Define the handler
const requestHandler = (request, response) => {
  const { method, url } = request;
  const parts = url.split("/");
  const id = parseInt(parts[2]);
  console.log(parts);

  // ! Get all employees
  if (method === "GET" && url === "/employees") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(employees));
  }
  // ! Get single employee
  else if (method === "GET" && parts[1] === "employees" && id) {
    const employee = employees.find((emp) => {
      return emp.id === id;
    });
    if (employee) {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(employee));
    } else {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "Employee not found!" }));
    }
  }
  // ! Create new employee
  else if (method === "POST" && url === "/employees") {
    let body = "";
    // Listen to the event of making a post request
    request.on("data", (chunk) => {
      body += chunk;
    });
    // Send the response
    request.on("end", () => {
      const newEmployee = JSON.parse(body);
      employees.push(newEmployee);
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(employees));
    });
  }
};

// ? Create the server
const server = http.createServer(requestHandler);

// ? Start our server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
