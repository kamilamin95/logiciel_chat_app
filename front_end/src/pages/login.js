import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { userLogin } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { emailValidator } from "../helpers/validator";

const defaultTheme = createTheme();
export default function Login() {
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    let name = event.target.name;
    if (name === "email") {
      setEmailError(false);
      setEmail(event.target.value);
      setErrorMessage("");
    }

    if (name === "password") {
      setPasswordError(false);
      setPassword(event.target.value);
      setErrorMessage("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let email = data.get("email");
    let password = data.get("password");
    if (email === "" && password === "") {
      setEmailError(true);
      setPasswordError(true);
      return;
    }
    if (email === "") {
      setEmailError(true);
      return;
    }
    if (password === "") {
      setPasswordError(true);
      return;
    }

    if (emailValidator(email) === false) {
      setEmailError(true);
      return;
    }

    try {
      await userLogin({ email, password }).then((response) => {
        if (response.status === 200) {
          sessionStorage.setItem("user_accessToken", response.data.accessToken);
          sessionStorage.setItem("userLogin", true);
          navigate("/chatPage");
        }
      });
    } catch (error) {
      console.log("Error", error);
      if (error.response.status === 404) {
        setErrorMessage(error.response.data.message);
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              error={emailError}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(event) => handleChange(event)}
            />
            <TextField
              error={passwordError}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => handleChange(event)}
            />
            {errorMessage && (
              <p style={{ color: "red", fontSize: "15px" }}>{errorMessage}</p>
            )}
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
