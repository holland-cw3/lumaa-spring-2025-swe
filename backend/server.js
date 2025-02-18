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

///// ---------Token Verification--------- /////
// For Secure Task Endpoints

function verifyJWT(token) {
  if (!token) {
    res.status(200).json({
      success: false,
      message: "Error! User Not Authenticated.",
    });
  }
  return;
}

///// -------------Endpoints------------- /////

/**** -------------Register------------- ****/

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
          res.json("Success!");
        }
      });
    });
  });
});

/**** -------------Login------------- ****/

app.post("/auth/login", (req, res) => {
  const { username, password } = req.body;

  client.query(`SELECT id, username, password FROM users WHERE username=$1`, [username], (err, result) => {
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

/**** -----------Get Tasks----------- ****/
// GET/Retrieve a list of tasks (optionally filtered by user).

app.get("/tasks", (req, res) => {
  // User Authentication
  const token = req.headers.authorization.split(" ")[1];
  verifyJWT(token);

  // Decode JWT
  const decodedToken = jwt.verify(token, JWT_SECRET);
  const id = decodedToken.userId;

  // Query DB
  client.query(`SELECT * FROM tasks WHERE userId=$1`, [id], (err, result) => {
    if (err) {
      res.status(500).send("No User Exists");
    } else {
      res.json(result.rows);
    }
  });
});

/**** -------------Create Tasks------------- ****/
// POST/Create a new task.

app.post("/tasks", (req, res) => {
  // User Authentication
  const token = req.headers.authorization.split(" ")[1];
  verifyJWT(token);

  // Decode JWT and Get Body
  const decodedToken = jwt.verify(token, JWT_SECRET);
  const id = decodedToken.userId;
  const { title, description, isComplete } = req.body;

  // Query DB
  client.query(
    `INSERT INTO tasks (title, description, iscomplete, userid) VALUES ($1, $2, $3, $4)`,
    [title, description, isComplete, id],
    (err, result) => {
      if (err) {
        console.error("Error inserting data:", err.stack);
        res.status(500).send("Failed to insert data into the database");
      } else {
        res.json("result.rows[0]");
      }
    }
  );
});

/**** -------------Update Tasks------------- ****/
// PUT/Update a task.

app.put("/tasks/:id", (req, res) => {
  // User Authentication
  const token = req.headers.authorization.split(" ")[1];
  verifyJWT(token);

  // Get Params
  const { id } = req.params;
  const { title, description, isComplete } = req.body;

  // Query DB
  client.query(
    `UPDATE tasks SET title = $1, description = $2, iscomplete = $3 WHERE id = $4`,
    [title, description, isComplete, id],
    (err, result) => {
      if (err) {
        res.status(500).send("Failed to update data");
      } else {
        res.json("Updated");
      }
    }
  );
});

/**** -------------DELETE Tasks------------- ****/
// DELETE a task

app.delete("/tasks/:id", (req, res) => {
  // User Authentication
  const token = req.headers.authorization.split(" ")[1];
  verifyJWT(token);

  const { id } = req.params;

  // Query DB
  client.query(`DELETE FROM tasks WHERE id=$1`, [id], (err, result) => {
    if (err) {
      res.status(500).send("Failed to delete from the database");
    } else {
      res.json("Deleted");
    }
  });
});