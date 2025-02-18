import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface Task {
  id: number;          
  title: string;
  description: string;
  iscomplete: boolean;
}

function logout(){
  localStorage.setItem('token', '');
  alert('You Have Logged Out, Redirecting to Login...')
  window.location.href='/login'

}

async function load(setTasks: (tasks: Task[]) => void) {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch("http://localhost:5000/tasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data)
      setTasks(data);
      return;
    } else {
      alert("Login Failed: Username or Password is incorrect");
    }
  } catch (error) {
    console.error("Error submitting data:", error);
  }
}

export default function UserTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    load(setTasks);
  }, []);

  return (
    <div>
      <div className='header'>
        <button onClick={logout}>
            logout
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>
              Title
            </th>
            <th>
              Description
            </th>
            <th>
              isComplete
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td>{t.description}</td>
              <td>{t.iscomplete}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
