const express = require("express");
const app = express();
const cors = require("cors"); 

app.use(express.json());  // This middleware parses JSON body data
app.set("view engine", "ejs");

app.use(cors());

app.listen(3000, (err) => {
  if (err) {
    console.log("Error: Server failed. As lawyers say, you've been served");
  }
  console.log(
    `Web server started and running at http://localhost:${3000}`
  );
  process.stdin.setEncoding("utf8");
  process.stdout.write("Type stop to shutdown the server: ");
  process.stdin.on("readable", () => {
    let input = process.stdin.read();
    if (input !== null) {
      const command = input.trim();

      if (command === "stop") {
        console.log("Shutting down the server");
        process.exit(0);
      }

      process.stdout.write("Type stop to shutdown the server: ");
      input = process.stdin.read();
    }
  });
});

app.get("/", (req, res) => {
  res.send("hello world!");
});

// GET /tasks – Retrieve a list of tasks (optionally filtered by user).
app.get("/tasks", (req, res) => {
  res.send("Tasks");
});
// POST /tasks – Create a new task.
app.post("/tasks", (req, res) => {
  const data = req.body;
  console.log(data);
  res.json(data)
});
// PUT /tasks/:id – Update a task (e.g., mark as complete, edit text).
app.put("/tasks:id", (req, res) => {

});
// DELETE /tasks/:id – Delete a task.
app.delete("/tasks:id", (req, res) => {

});
