import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages//Login";
import Users from "./pages/Users";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/users" element={<Users/>} />
    </Routes>
  );
};

export default App;
