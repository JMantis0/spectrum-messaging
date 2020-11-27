import React from "react";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { makeStyles } from "@material-ui/core/styles";

const DrawerList = ({ userList, setRemoteUser, remoteUser }) => {
  const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
  }));

  const classes = useStyles();
  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {["Spectrum Messaging"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {userList.map((userName, index) => (
          <ListItem
            onClick={(e) => {
              e.preventDefault();
              console.log("listitem click");
              console.log("event: ", e);
              console.log("event.target: ", e.target);
              console.log("event.target.val", e.target.innerText);
              setRemoteUser(e.target.innerText);
              console.log("The remote user is now: ", remoteUser);
            }}
            button
            key={userName}
          >
            <ListItemText primary={userName} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );
};

export default DrawerList;
