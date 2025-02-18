import { useState } from "react";

async function send(username: String, password: String) {
  const data = { username, password };

  try {
    const response = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseBody = await response.json(); // Get response body
    if (response.ok) {
      console.log("User data submitted successfully:", responseBody);
    } else {
      console.error("Failed to submit data:", responseBody);
    }
  } catch (error) {
    console.error("Error submitting data:", error);
  }
}

export default function UserTasks() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await send(username, password);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
