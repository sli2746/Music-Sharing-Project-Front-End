import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import LoginIcon from "@mui/icons-material/Login";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Button from "@mui/material/Button";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import PersonIcon from "@mui/icons-material/Person";
import SearchTrack from "../components/HomePage/SearchTrack";
import Paper from "@mui/material/Paper";
import PublicIcon from "@mui/icons-material/Public";

import UnauthenUserSection from "../components/unauthenUserSection";
import AuthenUserSection from "../components/authenUserSection";
import AdminSection from '../components/adminComponent'


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
      ,
      <Link color="inherit" href="/dmca">
        DMCA
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const [navPosition, setNavPosition] = React.useState(0);
  const [loginState, setLoginState] = React.useState(
    localStorage.getItem("loginState")
  );
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const swithContent = (position) => {
    setNavPosition(position);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Music App(find your favourate music)
            </Typography>

   

            {!loginState && (
              <>
                {" "}
                <Link href="/signin">
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() => {
                      setTimeout(() => {
                        setLoginState(true);
                      }, 1000);
                    }}
                    endIcon={<LoginIcon />}
                  >
                    Sign in
                  </Button>
                </Link>{" "}
              </>
            )}

            {loginState && (
              <>
                {" "}
                <Button
                  variant="contained"
                  color="info"
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("userName");
                    localStorage.removeItem("email");
                    localStorage.setItem("loginState", false);
                    setLoginState(false);
                  }}
                  endIcon={<LoginIcon />}
                >
                  Sign out
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>

          <Divider />
          <List component="nav">
            <React.Fragment>
              <ListItemButton
                onClick={() => {
                  swithContent(0);
                }}
              >
                <ListItemIcon>
                  <AudiotrackIcon />
                </ListItemIcon>
                <ListItemText primary="Search Track" />
              </ListItemButton>

              <ListItemButton
                onClick={() => {
                  swithContent(1);
                }}
              >
                <ListItemIcon>
                  <PublicIcon />
                </ListItemIcon>
                <ListItemText primary="Public List" />
              </ListItemButton>

              <ListItemButton
                onClick={() => {
                  swithContent(2);
                }}
              >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="User" />
              </ListItemButton>

              <ListItemButton
                onClick={() => {
                  swithContent(3);
                }}
              >
                <ListItemIcon>
                  <AdminPanelSettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Admin" />
              </ListItemButton>
            </React.Fragment>
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Recent Orders */}
              {navPosition === 0 ? (
                <Grid item xs={12}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    <SearchTrack />
                  </Paper>
                </Grid>
              ) : (
                <></>
              )}
              {navPosition === 1 ? (
                <Grid item xs={12}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    
                    {/* <PublicList></PublicList> */}
                    <UnauthenUserSection></UnauthenUserSection>
                  </Paper>
                </Grid>
              ) : (
                <></>
              )}

              {navPosition === 2 ? (
                <Grid item xs={12}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    <AuthenUserSection></AuthenUserSection>
                  </Paper>
                </Grid>
              ) : (
                <></>
              )}
              {navPosition === 3 ? (
                <Grid item xs={12}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    <AdminSection></AdminSection>
                  </Paper>
                </Grid>
              ) : (
                <></>
              )}
            </Grid>
            <Copyright sx={{ pt: 8 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
