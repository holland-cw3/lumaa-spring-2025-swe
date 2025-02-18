import React from "react";
import "./App.css";
import Login from "./login";
import Register from "./register";
import Tasks from "./userTasks";
import Create from "./createTask"
import Update from "./updateTask"

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
