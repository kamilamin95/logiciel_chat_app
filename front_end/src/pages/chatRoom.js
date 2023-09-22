import React from "react";
import Header from "../components/header";
// import {io} from 'socket.io-client'
import socketClient from 'socket.io-client'


function ChatRoom() {
  var socket = socketClient('http://localhost:5000')

  socket.on('connection', () => {
    console.log('Socket connection is established');
  })


  // console.log('SOCKET', socket);

  return (
    <>
      <Header />
      Chat room
    </>
  );
}

export default ChatRoom;
