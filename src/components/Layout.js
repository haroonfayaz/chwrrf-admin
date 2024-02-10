import { makeStyles } from "@material-ui/core";
import React from "react";
import { Typography } from "@material-ui/core";
import { Drawer } from "@material-ui/core";
import { useLocation, useNavigate } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { format } from "date-fns";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import EventNoteIcon from "@mui/icons-material/EventNote";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { Avatar, Divider } from "@mui/material";
import image from "../Images/logoimage.png";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: "#f9f9f9",
      width: "100%",
      padding: theme.spacing(3),
    },
    root: {
      display: "flex",
    },
    drawer: {
      width: drawerWidth,
      fontSize: "22px",
    },
    drawerPaper: {
      width: drawerWidth,
    },
    active: {
      background: "#5773ff",
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    avatar: {
      marginLeft: theme.spacing(2),
    },
    date: {
      // flexGrow: 1,
      color:"#5773ff",
      textAlign:"center",
      fontSize:"28px",
      alignItems:"center",

    },
    toolbar: theme.mixins.toolbar,
  };
});
const Layout = ({ children }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      text: "Events",
      icon: <EventNoteIcon color="secondary" />,
      path: "/",
    },
    {
      text: "Notifications",
      icon: <NotificationsNoneIcon color="secondary" />,
      path: "/notification",
    },
    {
      text: "Future Plans",
      icon: <TipsAndUpdatesIcon color="secondary" />,
      path: "/Plans",
    },
  ];

  return (
    <>
      <div className={classes.root}>
        {/* app bar */}

        {/* <AppBar
          position="fixed"
          className={classes.appBar}
          elevation={0}
          color="primary"
        >
          <Toolbar>
            <Typography className={classes.date}>
              Welcome to CHWRRF Admin
            </Typography>
            <Typography sx={{ padding: "10px",fontSize:"22px", fontWeight: "bolder",color:"#5773ff" }}>
              {/* {format( new Date(),"dd-MM-yyyy")} */}
            {/* </Typography>
            <Avatar src={image} variant="rounded" className={classes.avatar}
            style={{width:"50px",height:"50px"}}/>
          </Toolbar>
          <Divider/> */}
        {/* </AppBar> */} 

        {/* side drawer  */}
        <Drawer
          className={classes.drawer}
          variant="permanent"
          anchor="left"
          classes={{ paper: classes.drawerPaper }}
        >
          <div style={{display:"flex", alignItems:"center"}}>
          <Avatar src={image} variant ="rounded" className={classes.avatar}
            style={{ width: '70px', height: '70px' }} 
            />

            <Typography
              variant="h5"
              style={{
                padding: "30px",
                paddingLeft:"10px",
                fontWeight: "bold",
                color:"#5773ff"
              }}
            >
              CHWRRF
            </Typography>
          </div>

          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => navigate(item.path)}
                className={
                  location.pathname === item.path ? classes.active : null
                }
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <div className={classes.page}>
          <div className={classes.toolbar}></div>

          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
