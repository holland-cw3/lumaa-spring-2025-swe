import React from "react";
import "./App.css";
import Login from "./components/login";
import Register from "./components/register";
import Tasks from "./components/userTasks";
import Create from "./components/createTask"
import Update from "./components/updateTask"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/create" element={<Create />} />
        <Route path="/tasks/update" element={<Update />} />
      </Routes>
    </Router>
  );
}
