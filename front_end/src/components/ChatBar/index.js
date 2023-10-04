import React from "react";
import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton
} from "@mui/material";

function ChatBar({ socket, privateChat }) {
  const [users, setUsers] = React.useState([]);
  // const navigate = useNavigate()

  const navigateToPrivateChat = () => {
    privateChat = true
  }

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
                    <ListItemButton onClick={() => navigateToPrivateChat()}>
                      <ListItemAvatar>
                        <Avatar>{user.userName[0].toUpperCase()}</Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={user.userName} />
                    </ListItemButton>
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
