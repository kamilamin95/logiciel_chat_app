import React from "react";
import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

function ChatBar({ socket }) {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    socket.on("newUserResponse", (data) => setUsers(data));
  }, [socket, users]);
  return (
    <div className="chat__sidebar">
      <div>
        <h2>Welcome {sessionStorage.getItem("firstName")}</h2>
        <h4 className="chat__header">Available USERS</h4>
        <div className="chat__users">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <List>
                {users.map((user, i) => (
                  <ListItem key={i}>
                    <ListItemAvatar>
                      <Avatar>{user.userName[0].toUpperCase()}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={user.userName} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default ChatBar;
