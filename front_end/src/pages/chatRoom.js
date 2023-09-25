import React, { useEffect, useState } from "react";
import Header from "../components/header";
import "../styles/chatRoom.css";
import { Button, TextField } from "@mui/material";

function ChatRoom({ socket }) {
  const [textMessage, setTextMessage] = useState("");
  const [serverMessages, setServerMessages] = useState([]);

  const sendMessage = () => {
    socket.emit("message", textMessage);
    setTextMessage('')
  };

  useEffect(() => {
    socket.on("message", function (msg) {
      setServerMessages([...serverMessages, msg]);
    });
  }, [socket, serverMessages]);

  return (
    <>
      <Header />
      <TextField
        type="text"
        value={textMessage}
        onChange={(ev) => setTextMessage(ev.target.value)}
      />
      <Button onClick={() => sendMessage()} color="inherit">
        Send Message
      </Button>

      {serverMessages.map((item, i) => {
        console.log(item);
        return <li key={i}>{item}</li>;
      })}
    </>
  );
}

export default ChatRoom;
