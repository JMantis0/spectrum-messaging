import React, { useState, useEffect, useRef } from "react";
import "react-pro-sidebar/dist/css/styles.css";
import "./MainPage.css";
import "@material-ui/core/";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SpectrumBar from "../SpectrumBar/SpectrumBar";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import DrawerContents from "./DrawerList";
import Conversation from "../Conversation/Conversation";
import Input from "../Input/Input";

import axios from "axios";

const drawerWidth = 240;

const MainPage = ({
  userList,
  setUserList,
  user,
  isAuthenticated,
  isLoading,
}) => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [localUser, setLocalUser] = useState("");
  const [remoteUser, setRemoteUser] = useState("");
  const [conversation, setConversation] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }));
  const classes = useStyles();

  function addMessage() {
    const sendThis = messageInput;
    setMessageInput("");
    axios
      .post("/crud/addMessage", {
        message: sendThis,
        recipientEmail: remoteUser,
        senderEmail: localUser,
      })
      .then((response) => {
        console.log("response from /crud/addMessage: ", response);
      })
      .then(() => {
        console.log("Is this being executed?");
        getConversation();
      })
      .catch((err) => {
        console.log("There was an error: ", err);
      });
  }

  function getConversation() {
    if (localUser && remoteUser) {
      console.log(
        `Sending GET request to server on route /crud/getConversation/${localUser}/${remoteUser}`
      );
      axios
        .get(`/crud/getConversation/${localUser}/${remoteUser}`)
        .then((conversationObject) => {
          console.log("Response from server: ", conversationObject);
          setConversation(conversationObject.data);
        })
        .catch((err) => {
          console.log("There was an error: ", err);
        });
    } else {
      console.log(
        "Error getting conversation: localUser and remoteUser required."
      );
    }
  }

  //  Why is this here?  this will trigger when conversation changes.
  useEffect(() => {}, [conversation]);

  //
  useEffect(() => {
    if (isAuthenticated) {
      // set local user to user.email
      setLocalUser(user.email);
      axios
        .post("/crud/checkIfUserExistsAndCreate", { email: user.email })
        .then(() => {
          axios.get("/crud/getAllUsers").then((users) => {
            console.log("Setting user list to email array");
            const userNames = users.data.map((user) => {
              return user.email;
            });
            setUserList(userNames);
          });
        })
        .catch((error) => {
          console.log("There was an error: ", error);
        });
    } else {
      console.log("No authenticated user");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    let interval = setInterval(() => getConversation(), 2000);
    const cleanup = () => {
      clearInterval(interval);
    };
    return cleanup;
  }, [remoteUser]);

  useEffect(() => {
    console.log("conversation", conversation);
    console.log("localUser", localUser);
    console.log("remoteUser", remoteUser);
  }, [conversation]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className="outerContainer">
      <div className={classes.root}>
        <SpectrumBar
          localUser={localUser}
          remoteUser={remoteUser}
          setLocalUser={setLocalUser}
          getConversation={getConversation}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
        <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true,
              }}
            >
              <DrawerContents
                userList={userList}
                setRemoteUser={setRemoteUser}
                remoteUser={remoteUser}
              />
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              <DrawerContents
                userList={userList}
                setRemoteUser={setRemoteUser}
                remoteUser={remoteUser}
              />
            </Drawer>
          </Hidden>
        </nav>
        <div className="container">
          <div className={classes.toolbar}>Conversation with {remoteUser} as {localUser}</div>
          <Conversation
            conversation={conversation}
            localUser={localUser}
            remoteUser={remoteUser}
          />
          <Input
            messageInput={messageInput}
            setMessageInput={setMessageInput}
            addMessage={addMessage}
            getConversation={getConversation}
            localUser={localUser}
            remoteUser={remoteUser}
          />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
