import { useState } from "react";


async function register(username: String, password: String) {

  try {
    const response = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username, password}),
    });

    if (response.ok) {
      alert('Registered! Redirecting to login');
      window.location.href='/login';
    } else {
      alert('Failed to Register. Please Try Again');
    }
  } catch (error) {
    console.error("Error submitting data:", error);
  }
}

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await register(username, password);
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
       
        <button type="submit" className="loginBtn">Register</button>
        <div>Already a User? Login <a href='/login'>Here</a></div>
      </form>
    </div>
  );
}
