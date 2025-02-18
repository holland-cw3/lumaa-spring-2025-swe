import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

async function update(title: string, description: string, isComplete: boolean) {
  const token = localStorage.getItem("token");

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  const data = { title, description, isComplete };
  try {
    const response = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Successfully Updated Task");
      window.location.href = "/tasks";
      return;
    } else {
      alert("Update Failed");
    }
  } catch (error) {
    console.error("Error submitting data:", error);
  }
}

export default function UserTasks() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isComplete, setIsComplete] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const complete = isComplete.toUpperCase() === "TRUE" ? true : false;
    await update(title, description, complete);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="page">
      <form onSubmit={handleSubmit}>
        <h1>Update Task</h1>
        <div>
          <input
            type="text"
            placeholder="Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Is Complete? ('True' or 'False')"
            required
            value={isComplete}
            onChange={(e) => setIsComplete(e.target.value)}
          />
        </div>

        <button type="submit" className="loginBtn">
          Update
        </button>
        <div>
          <a href="/tasks" className="cancelBtn">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
