import React from "react";
import Header from "../components/header";

function ChatRoom({ setUserLogin, userLogin }) {
  return (
    <>
      <Header setUserLogin={setUserLogin} userLogin={userLogin} />
    </>
  );
}

export default ChatRoom;
