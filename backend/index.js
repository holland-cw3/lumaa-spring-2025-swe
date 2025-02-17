const express = require("express");
const portNumber = 5000;
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.listen(portNumber, (err) => {
  if (err) {
    console.log("Error: Server failed. As lawyers say, you've been served");
  }
  console.log(
    `Web server started and running at http://localhost:${portNumber}`
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

// app.post("/", (req, res) => {

// });
