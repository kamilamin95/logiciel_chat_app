import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ChatPage from "./pages/chatPage";
import socketClient from "socket.io-client";


const socket = socketClient('http://localhost:5000')

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/chatPage" element={<ChatPage socket={socket} />} />
    </Routes>
  );
}

export default App;
