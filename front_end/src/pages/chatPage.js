import React, { useEffect, useState, useRef } from "react";
import Header from "../components/header";
import "../styles/chatRoom.css";
import { getUserDetails } from "../services/auth";
import ChatBar from "../components/ChatBar";
import ChatBody from "../components/ChatBody";
import ChatFooter from "../components/ChatFooter";

function ChatPage({ socket }) {
  const [serverMessages, setServerMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");
  const lastMessageScroll = useRef(null);

  const fetchUserDetails = async () => {
    try {
      await getUserDetails().then((response) => {
        sessionStorage.setItem("firstName", response.data.user.firstName);
        sessionStorage.setItem("lastName", response.data.user.lastName);
        sessionStorage.setItem("email", response.data.user.email);
        socket.emit("newUser", {
          userName: response.data.user.firstName,
          socketID: socket.id,
        });
      });
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    socket.on("message", function (msg) {
      setServerMessages([...serverMessages, msg]);
    });
  }, [socket, serverMessages]);

  useEffect(() => {
    fetchUserDetails();
  }, []);

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
      {/* <TextField
        type="text"
        value={textMessage}
        onChange={(ev) => setTextMessage(ev.target.value)}
      />
      <Button onClick={() => sendMessage()} color="inherit">
        Send Message
      </Button>

      {serverMessages.map((item, i) => {
        return <li key={i}>{item}</li>;
      })} */}
    </>
  );
}

export default ChatPage;
