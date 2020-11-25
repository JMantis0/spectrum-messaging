import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";

//  Component imports
import Login from "./components/Login/Login";
import Chat from "./components/Chat/Chat";

// mui imports
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CssBaseLine from "@material-ui/core/CssBaseline";

//  auth0 imort
import { useAuth0 } from "@auth0/auth0-react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const App = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userList, setUserList] = useState([]);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseLine />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Spectrum
          </Typography>
        </Toolbar>

        <Router>
          <Route exact path="/">
            <Login
              user={user}
              isAuthenticated={isAuthenticated}
              isLoading={isLoading}
            />
          </Route>
          <Route exact path="/chat">
            <Chat
              userList={userList}
              setUserList={setUserList}
              user={user}
              isAuthenticated={isAuthenticated}
              isLoading={isLoading}
            />
          </Route>
        </Router>
      </AppBar>
    </div>
  );
};

export default App;
