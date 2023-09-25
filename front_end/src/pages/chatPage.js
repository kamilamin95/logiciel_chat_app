import React, { useEffect, useState } from "react";
import Header from "../components/header";
import "../styles/chatRoom.css";
import { Button, TextField } from "@mui/material";
import { getUserDetails } from "../services/auth";
import ChatBar from "../components/ChatBar";
import ChatBody from '../components/ChatBody'
import ChatFooter from "../components/ChatFooter";

function ChatPage({ socket }) {
  const [textMessage, setTextMessage] = useState("");
  const [serverMessages, setServerMessages] = useState([]);

  const sendMessage = () => {
    socket.emit("message", textMessage);
    setTextMessage("");
  };

  const fetchUserDetails = async () => {
    await getUserDetails()
      .then((response) => {
        sessionStorage.setItem("firstName", response.data.user.firstName);
        sessionStorage.setItem("lastName", response.data.user.lastName);
        sessionStorage.setItem("email", response.data.user.email);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    socket.on("message", function (msg) {
      setServerMessages([...serverMessages, msg]);
    });
  }, [socket, serverMessages]);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <>
      <Header />
      <div className="chat">
        <ChatBar />
        <div className="chat__main">
          <ChatBody />
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
