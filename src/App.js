import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import DynamicForm from "./components/DynamicForm";
import Dashboard  from "./components/Dashboard";
import Register from "./components/Registeration";
import Login from "./components/Login";


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1 className="text-center mt-10">Welcome to Document Approval</h1>} />
        <Route path="/form" element={<DynamicForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}/>
      </Routes>
    </Router>
  );
};

export default App;
