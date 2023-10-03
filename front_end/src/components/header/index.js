import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { logOutUser } from "../../services/auth";

function Header({ socket }) {
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = React.useState(false);

  const logout = async () => {
    try {
      await logOutUser().then((response) => {
        if (response.status === 200) {
          socket.disconnect();
          sessionStorage.clear();
          navigate("/login");
          setUserLogin(false);
        }
      });
    } catch (error) {
      console.log("Error", error);
    }
  };
  React.useEffect(() => {
    if (sessionStorage.getItem("userLogin") !== null) {
      setUserLogin(true);
    } else {
      setUserLogin(false);
    }
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Logiciel Chat App
          </Typography>
          {/* <Button onClick={() => navigate("/login")} color="inherit">
            Login
          </Button> */}
          {userLogin ? (
            <Button onClick={() => logout()} color="error" variant="contained">
              Signout
            </Button>
          ) : (
            <Button onClick={() => navigate("/login")} color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
