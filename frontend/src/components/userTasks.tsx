import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


interface Task {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
}

function logout() {
  localStorage.setItem("token", "");
  alert("You Have Logged Out, Redirecting to Login...");
  window.location.href = "/login";
}

async function Delete(taskId: number, setTasks: (tasks: Task[]) => void) {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      load(setTasks);

      return;
    } else {
      alert("Login Failed: Username or Password is incorrect");
    }
  } catch (error) {
    console.error("Error submitting data:", error);
  }

  return;
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
      console.log(data);
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
    <div className="page2">
      <div className="header">
        <button onClick={logout}>logout</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>isComplete</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td>{t.description}</td>
              <td>{t.isComplete ? "False" : "True"}</td>
              <td>
                <button
                  className="deleteBtn"
                  onClick={() => {
                    Delete(t.id, setTasks);
                  }}
                >
                  Delete Task
                </button>
              </td>
              <td>
                <a href={`/tasks/update?id=${t.id}`}>
                  <button className="updateBtn">Update Task</button>{" "}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href={`/tasks/create`}>
        <button className="createBtn">Create Task</button>
      </a>
    </div>
  );
}
