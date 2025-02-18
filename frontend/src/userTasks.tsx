import {useNavigate} from 'react-router-dom';
import { useEffect } from 'react';


async function load() {
   const token = localStorage.getItem('token')

  try {
    const response = await fetch("http://localhost:5000/tasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (response.ok) {
      const res = await response.json();
      console.log(res)
    
    } else {
      alert("Login Failed: Username or Password is incorrect")
    }
  } catch (error) {
    console.error("Error submitting data:", error);
  }
}

export default function UserTasks() {

  const navigate = useNavigate();


  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  load();



  return (
    <div>
      {localStorage.getItem('token')}
      <table>

      </table>
    </div>
  );
}