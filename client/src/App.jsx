import React, { useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Booking from "./Booking";
import Login from "./Login";
import Class from "./Class";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/book" element={<Booking />} />
      <Route path="/class" element={<Class />} />
    </Routes>
  );
}

export default App;
