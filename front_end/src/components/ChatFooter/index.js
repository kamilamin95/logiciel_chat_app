import React from "react";

function ChatFooter({ socket }) {
  const [message, setMessage] = React.useState("");

  const handleTyping = () =>
    socket.emit("typing", `${sessionStorage.getItem("firstName")} is typing`);

  const handleSendMessage = (e) => {
    e.preventDefault();
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
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyDown={handleTyping}
        />
        <button disabled={message === "" ? true : false} className="sendBtn">SEND</button>
      </form>
    </div>
  );
}

export default ChatFooter;
