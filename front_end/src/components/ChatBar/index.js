import React from "react";

function ChatBar({ socket }) {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    socket.on("newUserResponse", (data) => setUsers(data));
  }, [socket, users]);
  return (
    <div className="chat__sidebar">
      <div>
        <h4 className="chat__header">ONLINE USERS</h4>
        <div className="chat__users">
          {users.map((user) => (
            <p key={user.socketId}>{user.userName}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatBar;
