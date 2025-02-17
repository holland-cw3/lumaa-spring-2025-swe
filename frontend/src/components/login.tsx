import { useState } from "react";

async function login(username: String, password: String) {
  try {
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify( { username, password }),
    });
   
    if (response.ok) {
      const res = await response.json();
      localStorage.setItem("token", res.token);
      alert("Login Successful!");
      window.location.href='/tasks'
    } else {
      alert("Login Failed: Username or Password is incorrect")
    }
  } catch (error) {
    console.error("Error submitting data:", error);
  }
}

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await login(username, password);
  };

  return (
    <div className='page'>
     
      <form onSubmit={handleSubmit}>
      <h1>Login</h1>
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
        <div>New User? Register <a href='/register'>Here</a></div>
      </form>
    </div>
  );
}
