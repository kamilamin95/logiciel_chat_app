import React, { useEffect, useState } from "react";
import Header from "../components/header";
// // import {io} from 'socket.io-client'
import socketClient from "socket.io-client";
import "../styles/chatRoom.css";
import { Button, TextField } from "@mui/material";

function ChatRoom() {
  const [textMessage, setTextMessage] = useState("");
  // const [serverMessages, setServerMessages] = useState("");

  var socket = socketClient("http://localhost:5000");
  socket.on("connection", () => {
    console.log("Socket connection is established");
  });

  const sendMessage = () => {
    socket.emit("chat message", textMessage);
  };

  // socket.on("chat message", function (msg) {
  //   console.log("received Messages", msg);
  //   setServerMessages(msg);
  //   msgArr.push(msg);
  // });

  // useEffect(() => {
  //   socket.on("connection", () => {
  //     console.log("Socket connection is established");
  //   });
  // }, []);

  // console.log("messages array", msgArr);
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

      {/* {msgArr.map((item, i) => {
        console.log(item);
        return <li key={i}>{item}</li>;
      })} */}
    </>
  );
}

export default ChatRoom;
