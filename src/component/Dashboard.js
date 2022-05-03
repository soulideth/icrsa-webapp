import React from "react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import useStyles from "./Dashboard_Style";
import Listitem from "./Listitem";
import { useHistory } from "react-router";
import { Divider } from "@material-ui/core";

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
      style={{
        position: "sticky",
        marginBottom: "30px",
        zIndex: "1",
        // border: "1px solid red",
      }}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://acledabank.com.la/">
        ACLEDA Bank Lao Ltd.
      </Link>{" "}
      {"2021"}
      {"."}
    </Typography>
  );
}

export default function Dashboard({ body }) {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Incoming Call Record System
          </Typography>
          <IconButton
            color="inherit"
            onClick={() => {
              localStorage.clear();
              history.push("/login");
            }}
          >
            {/* <Badge badgeContent={4} color="secondary"> */}
            {/* <IconButton> */}

            <ExitToAppIcon />
            {/* </IconButton> */}
            {/* </Badge> */}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <Listitem />
      </Drawer>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {body}
        <Box pt={2}></Box>
        <Copyright />
      </main>
    </div>
  );
}
