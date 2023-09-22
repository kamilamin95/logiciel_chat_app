import React, { useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ChatRoom from "./pages/chatRoom";

// function Protected({ isSignedIn, children }) {
//   if (!isSignedIn) {
//     return <Navigate to="/" replace />;
//   }
//   return children;
// }

function App() {
  // const [userLogin, setUserLogin] = useState(true);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/chatRoom" element={<ChatRoom />} />
      {/* <Route path="/chatRoom" element={
        <Protected isSignedIn={userLogin}>
          <ChatRoom setUserLogin={setUserLogin} />
        </Protected>
      } /> */}
    </Routes>
  );
}

export default App;
