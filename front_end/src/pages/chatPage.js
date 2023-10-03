import React, { useEffect, useState, useRef } from "react";
import Header from "../components/header";
import "../styles/chatRoom.css";
import { generateRefreshToken, getUserDetails } from "../services/auth";
import ChatBar from "../components/ChatBar";
import ChatBody from "../components/ChatBody";
import ChatFooter from "../components/ChatFooter";

let firstRender = true;
function ChatPage({ socket }) {
  const [serverMessages, setServerMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");
  const lastMessageScroll = useRef(null);

  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      getUserDetails()
        .then((response) => {
          sessionStorage.setItem("firstName", response.data.user.firstName);
          sessionStorage.setItem("lastName", response.data.user.lastName);
          sessionStorage.setItem("email", response.data.user.email);
          socket.emit("newUser", {
            userName: response.data.user.firstName,
            socketID: socket.id,
          });
        })
        .catch((error) => console.log("error", error));
    }
    let interval = setInterval(() => {
      generateRefreshToken().then((response) => {
        sessionStorage.setItem("firstName", response.data.user.firstName);
        sessionStorage.setItem("lastName", response.data.user.lastName);
        sessionStorage.setItem("email", response.data.user.email);
      });
    }, 1000 * 28);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    socket.on("message", function (msg) {
      setServerMessages([...serverMessages, msg]);
    });
  }, [socket, serverMessages]);

  useEffect(() => {
    lastMessageScroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [serverMessages]);

  useEffect(() => {
    socket.on("typingResponse", (data) => setTypingStatus(data));
  }, [socket]);

  return (
    <>
      <Header socket={socket} />
      <div className="chat">
        <ChatBar socket={socket} />
        <div className="chat__main">
          <ChatBody
            messages={serverMessages}
            lastMessageScroll={lastMessageScroll}
            typingStatus={typingStatus}
          />
          <ChatFooter socket={socket} />
        </div>
      </div>
    </>
  );
}

export default ChatPage;
