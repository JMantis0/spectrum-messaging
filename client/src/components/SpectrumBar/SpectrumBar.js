import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LogoutButton from "../LogoutButton/LogoutButton";
import MenuIcon from "@material-ui/icons/Menu";

import { makeStyles, useTheme } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

const SpectrumBar = ({
  localUser,
  remoteUser,
  setLocalUser,
  getConversation,
  mobileOpen,
  setMobileOpen,
}) => {
  const classes = useStyles();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          Spectrum Messaging{" "}
          <span role="img" aria-label="spectrum-emoji">
            😑
          </span>
        </Typography>
        <LogoutButton />
        {localUser
          ? `||  Logged in as: ${localUser}  || `
          : "  Logged in as: nobody  ||"}
        {remoteUser
          ? `||  Talking to: ${remoteUser}  || `
          : "  Talking to: nobody  ||"}
        <button
          onClick={() => {
            console.log("setting localUser");
            setLocalUser("localUser");
          }}
        >
          SET LOCAL USER
        </button>
        <button onClick={getConversation}>get conversation</button>
      </Toolbar>
    </AppBar>
  );
};

export default SpectrumBar;
