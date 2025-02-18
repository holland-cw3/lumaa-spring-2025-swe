const express = require("express");
const app = express();
const cors = require("cors");
const client = require("./db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_SECRET = "your-secret-key";

app.use(express.json());
app.set("view engine", "ejs");
app.use(cors());

app.listen(5000, (err) => {
  if (err) {
    console.log("Error: Server failed. As lawyers say, you've been served");
  }
  console.log(`Web server started and running at http://localhost:${5000}`);
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

///// -------------Endpoints------------- /////

// Register
app.post("/auth/register", (req, res) => {
  const { username, password } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return;
    }
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        return;
      }

      const values = [username, hash];
      const query = `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`;

      client.query(query, values, (err, result) => {
        if (err) {
          console.error("Error inserting data:", err.stack);
          res.status(500).send("Failed to insert data into the database");
        } else {
          res.json("result.rows[0]");
        }
      });
    });
  });
});

// Login
app.post("/auth/login", (req, res) => {
  const { username, password } = req.body;
  const values = [username];

  const query = `SELECT id, username, password FROM users WHERE username=$1`;

  client.query(query, values, (err, result) => {
    if (err) {
      res.status(500).send("No User Exists");
    } else {
      const storedPass = result.rows[0].password;

      bcrypt.compare(password, storedPass, (err, isMatch) => {
        if (err) {
          console.error("Error comparing password:", err);
          return res.status(500).send("Server error, please try again later");
        }

        if (!isMatch) {
          return res.status(401).send("Invalid username or password");
        }

        const user = result.rows[0];

        const payload = {
          userId: user.id,
          username: user.username,
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

        res.json({
          message: "Login successful",
          token: token,
        });
      });
    }
  });
});

// GET /tasks – Retrieve a list of tasks (optionally filtered by user).
app.get("/tasks", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    res.status(200).json({
      success: false,
      message: "Error! User Not Authenticated.",
    });
  }
  const decodedToken = jwt.verify(token, JWT_SECRET);

  const id = decodedToken.userId;
  
  const query = `SELECT * FROM tasks WHERE userId=$1`;

  values = [id];

  client.query(query, values, (err, result) => {
    if (err) {
      res.status(500).send("No User Exists");
    } else {
      res.json(result.rows);
    }
  });
});

// POST /tasks – Create a new task.
app.post("/tasks", (req, res) => {
  const { id, token } = req.body;

  // const query = `INSERT INTO tasks (title, description, iscomplete, userid) VALUES ($1, $2, $3, $4)`;

  //   client.query(query, values, (err, result) => {
  //     if (err) {
  //       console.error("Error inserting data:", err.stack);
  //       res.status(500).send("Failed to insert data into the database");
  //     } else {
  //       res.json("result.rows[0]");
  //     }
  //   });
  // });
});

// PUT /tasks/:id – Update a task (e.g., mark as complete, edit text).
app.put("/tasks:id", (req, res) => {
  const { id, token } = req.body;

  // const query = `INSERT INTO tasks (title, description, iscomplete, userid) VALUES ($1, $2, $3, $4)`;

  //   client.query(query, values, (err, result) => {
  //     if (err) {
  //       console.error("Error inserting data:", err.stack);
  //       res.status(500).send("Failed to insert data into the database");
  //     } else {
  //       res.json("result.rows[0]");
  //     }
  //   });
  // });
});

// DELETE /tasks/:id – Delete a task.
app.delete("/tasks:id", (req, res) => {
  const { id, token } = req.body;

  // const query = `INSERT INTO tasks (title, description, iscomplete, userid) VALUES ($1, $2, $3, $4)`;

  //   client.query(query, values, (err, result) => {
  //     if (err) {
  //       console.error("Error inserting data:", err.stack);
  //       res.status(500).send("Failed to insert data into the database");
  //     } else {
  //       res.json("result.rows[0]");
  //     }
  //   });
  // });
});
