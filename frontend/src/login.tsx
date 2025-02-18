import { useState } from 'react';

async function send(username:String, password:String) {
  const data = { username, password };

  try {
    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // Send username and password as JSON
    });

    if (response.ok) {
      // Attempt to parse the response as JSON (if the backend returns JSON)
      const responseData = await response.json();
      console.log('User data submitted successfully:');
      console.log(responseData);
    } else {
      // Handle error
      const errorText = await response.text(); // Get the response text if it's not JSON
      console.error('Failed to submit data:', errorText);
    }
  } catch (error) {
    console.error('Error submitting data:', error);
  }
}


export default function UserTasks() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event:any) => {
    event.preventDefault(); // Prevent default form submission

    // Call send function with the captured values
    await send(username, password);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Update state on change
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update state on change
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
