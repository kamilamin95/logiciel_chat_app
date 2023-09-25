import React from "react";

function ChatFooter({ socket }) {
  const [message, setMessage] = React.useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log({ userName: sessionStorage.getItem("firstName"), message });
    // socket.emit("message", );
    socket.emit("message", {
      text: message,
      name: sessionStorage.getItem("firstName"),
      id: `${socket.id}${Math.random()}`,
      socketID: socket.id,
    });
    setMessage("");
  };
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
}

export default ChatFooter;
