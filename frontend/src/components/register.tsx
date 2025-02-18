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

    const responseBody = await response.json(); 
    if (response.ok) {
      console.log("User data submitted successfully:", responseBody);
      alert('Registered! Redirecting to login');
      window.location.href='/login';
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
    <div className='page'>
     
      <form onSubmit={handleSubmit}>
      <h1>Register</h1>
        <div>
        <input
          type="text"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        </div>
        <div>
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
       
        <button type="submit" className="loginBtn">Login</button>
        <div>Already a User? Login <a href='/login'>Here</a></div>
      </form>
    </div>
  );
}
