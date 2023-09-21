import React, { useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ChatRoom from "./pages/chatRoom";

function Protected({ isSignedIn, children }) {
  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  const [userLogin, setUserLogin] = useState(false);
  return (
    <Routes>
      <Route path="/" element={<Home userLogin={userLogin} />} />
      <Route path="/login" element={<Login setUserLogin={setUserLogin} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/chatRoom" element={
        <Protected isSignedIn={userLogin}>
          <ChatRoom setUserLogin={setUserLogin} />
        </Protected>
      } />
      {/* <Route path="/chatRoom" element={<ChatRoom userLogin={userLogin} />} /> */}
    </Routes>
  );
}

export default App;
