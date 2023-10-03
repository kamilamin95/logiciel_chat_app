import React from "react";

function ChatBar({ socket }) {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    socket.on("newUserResponse", (data) => setUsers(data));
  }, [socket, users]);
  return (
    <div className="chat__sidebar">
      <div>
        <h2>Welcome {sessionStorage.getItem('firstName')}</h2>
        <h4 className="chat__header">Available USERS</h4>
        <div className="chat__users">
          {users.map((user, i) => (
            <p key={i}>{user.userName}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatBar;
