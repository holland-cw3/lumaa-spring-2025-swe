import {useNavigate} from 'react-router-dom';
import { useEffect } from 'react';


export default function UserTasks() {

  const navigate = useNavigate();


  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);



  return (
    <div>
      {localStorage.getItem('token')}
      <table>

      </table>
    </div>
  );
}