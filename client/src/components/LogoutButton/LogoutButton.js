import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 40,
    padding: '0 30px',
  },
});

const LogoutButton = () => {
  const { logout } = useAuth0();
  const classes= useStyles();
  return <Button variant="contained" className={classes.root} onClick={() => logout()}>Log Out</Button>;
};

export default LogoutButton;
