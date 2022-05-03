import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Container,
  CssBaseline,
  FormControlLabel,
  IconButton,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import React, { useEffect, useState } from "react";
import LoginStyle from "./Login_Style";
import { LinkApi } from "../../ApiConnection";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.acledabank.com.la/">
        ACLEDA Bank Laos
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Login = () => {

  const [openAlert, setOpenAlert] = useState(false);
  const [Message, setMessage] = useState("Error");
  const classes = LoginStyle();
  const [UserPassword, setUserPassword] = useState({
    username: "",
    password: "",
  });
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("TOKEN")) {
      history.push("/");
    }
    
  }, []);
  const SumbmitLogin = (event) => {
    event.preventDefault();
    axios
      .post(
        LinkApi + "Token",
        "username=" +
          UserPassword.username +
          "&password=" +
          UserPassword.password +
          "&grant_type=password"
      )
      .then((response) => {
        localStorage.setItem("TOKEN", response.data.access_token);
        if (window.location.pathname == "/Login") {
          history.push("/");
        } else {
           history.go(0);
        }
       
      })
      .catch((err) => {
        setUserPassword({ ...UserPassword, username: "", password: "" });
        setMessage(String(err.response.data["error_description"]));
        setOpenAlert(true);
        // console.log(err.response.data["error_description"]);
      });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar
            className={classes.avatar}
            variant="rounded"
            src={process.env.PUBLIC_URL + "ACLEDAICON.png"}
          ></Avatar> */}
        <img
          src={process.env.PUBLIC_URL + "ACLEDA.png"}
          style={{ height: "200px", width: "200px" }}
        />
        <Typography component="h1" variant="h5">
          Incoming call record system
        </Typography>
        <Collapse in={openAlert}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {Message}
          </Alert>
        </Collapse>
        
        <form className={classes.form} onSubmit={SumbmitLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="User name"
            name="username"
            autoComplete="username"
            autoFocus
            value={UserPassword.username}
            onChange={(e) =>
              setUserPassword({ ...UserPassword, username: e.target.value })
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={UserPassword.password}
            onChange={(e) =>
              setUserPassword({ ...UserPassword, password: e.target.value })
            }
          />
          {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Login;
