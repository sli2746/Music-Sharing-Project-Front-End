import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import HeadphonesOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import { login, googleLogin,changePassword } from "../api/user";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import DialogTitle from "@mui/material/DialogTitle";
import { GoogleLogin } from "@react-oauth/google";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/privacypolicy">
        privacy policy
      </Link>{" "}
      ,
      <Link color="inherit" href="/aup">
        Acceptable Use Policy
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn(props) {
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const [loginState, setloginState] = React.useState(false);
  const [googleUser, setGoogleUser] = React.useState({});
  const [passwordOpen, setPasswordOpen] = React.useState(false);

  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  const onGoogleLoginSuccess = (credentialResponse) => {
    console.log(credentialResponse.credential);
    var decoded = jwt_decode(credentialResponse.credential);
    setGoogleUser(decoded);

    googleLogin({
      email: googleUser.email,
      given_name: googleUser.given_name,
      family_name: googleUser.family_name,
    })
      .then((res) => {
        alert("Login Successfully");
        localStorage.setItem("token", res.data.data);
        localStorage.setItem("userName", res.data.userName);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("loginState", true);
        setloginState(true);
      })
      .catch((error) => {
        setError(error.response.data.message);
        handleClickOpen();
      });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePasswordClickOpen = () => {
    setPasswordOpen(true);
  };

  const handlePasswordClose = () => {
    setPasswordOpen(false);
  };

  const onPasswordChange = () => {
    changePassword({email:email,old_password:oldPassword,new_password:newPassword})
    .then((res) => {
      setError(res.data.msg);
      handleClickOpen();
      setPasswordOpen(false);
    })
    .catch((error) => {
      setError(error.response.data.message);
      handleClickOpen();
      setPasswordOpen(false);
    });


  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    const handelLogin = () => {
      login({ email: data.get("email"), password: data.get("password") })
        .then((res) => {
          setLoading(false);
          if (res.data.code === 200) {
            console.log(res.data.data);
            alert("Login Successfully");
            localStorage.setItem("token", res.data.data);
            localStorage.setItem("userName", res.data.userName);
            localStorage.setItem("email", res.data.email);
            localStorage.setItem("loginState", true);
            setloginState(true);
          } else if (res.data.code === 201) {
            setError(res.data.message);
            handleClickOpen();
            setloginState(false);
          } else {
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log(error.response.data.message);
          setError(error.response.data.message);
          handleClickOpen();
        });
    };
    handelLogin();
  };

  if (loginState) {
    return <Navigate to="/home"></Navigate>;
  }

  return (
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1 }}>
            <HeadphonesOutlinedIcon />
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
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <LoadingButton
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              type="submit"
              size="small"
              loading={loading}
              loadingIndicator="Login…"
            >
              Sign In
            </LoadingButton>
            <Grid id="signInDiv" fullWidth>
              <GoogleLogin
                onSuccess={onGoogleLoginSuccess}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </Grid>

            <Grid container sx={{ mt: 2 }}>
              <Grid item xs>
                <Link
                  variant="body2"
                  onClick={() => {
                    handlePasswordClickOpen();
                  }}
                >
                  Renew password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 20, mb: 4 }} />

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {/* <DialogTitle id="alert-dialog-title">
          {error}
        </DialogTitle> */}
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {error}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={passwordOpen} onClose={handlePasswordClose}>
          <DialogTitle>Change password</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the old-password and new password
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="email"
              type="email"
              fullWidth
              variant="standard"
              onChange={(event)=>{setEmail(event.target.value)}}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="old password"
              type="password"
              fullWidth
              variant="standard"
              onChange={(event)=>{setOldPassword(event.target.value)}}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="new password"
              type="password"
              fullWidth
              variant="standard"
              onChange={(event)=>{setNewPassword(event.target.value)}}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handlePasswordClose}>Cancel</Button>
            <Button onClick={onPasswordChange}>submit</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}
