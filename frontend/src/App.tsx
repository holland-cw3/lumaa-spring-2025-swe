import React from 'react';
import './App.css';
import Login from './login'
import Register from './register'
import Tasks from './userTasks'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default function App() {
  return (
    <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/tasks' element={<Tasks />}/>
        </Routes>
    </Router>
  );
}