import { useState } from "react";

import { useHistory, useLocation, matchPath } from "react-router-dom";

/**
 * Material UI Imports
 */
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import CommentOutlinedIcon from "@material-ui/icons/CommentOutlined";
import ReportProblemOutlinedIcon from "@material-ui/icons/ReportProblemOutlined";
import PowerSettingsNewOutlinedIcon from "@material-ui/icons/PowerSettingsNewOutlined";
import Container from "@material-ui/core/Container";

/**
 * Imports the component styles
 */
import { useStyles } from "./DashboardNav.styles";

/**
 * Displays the component
 */
const DashboardNav: React.FC = (props) => {
  const { children } = props;

  /**
   * Gets the component styles
   */
  const classes = useStyles();

  /**
   * Initializes the Drawer state
   */
  const [open, setOpen] = useState(true);

  /**
   * Handles opening the drawer
   */
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  /**
   * Handles closing the drawer
   */
  const handleDrawerClose = () => {
    setOpen(false);
  };

  /**
   * Gets the history object
   */
  const history = useHistory();

  /**
   * Handles routing
   */
  const routeTo = (url: string) => {
    history.push(url);
  };

  /**
   * Defines the routing functions
   */
  const goToOverview = () => routeTo("/");
  const goToArticles = () => routeTo("/articles");
  const goToAccounts = () => routeTo("/accounts");
  const logout = () => routeTo("/login");

  /**
   * Gets the location path
   */
  const location = useLocation();

  /* Checks if the current path matches the path of the menu item
   *
   */
  const checkPathMatch = (path: string): boolean => {
    const result = matchPath(location.pathname, path);
    return result ? (result.isExact ? true : false) : false;
  };

  return (
    <div className={classes.root}>
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
            Prime Gaming Dashboard
          </Typography>
          <IconButton color="inherit" className={classes.messages}>
            <Badge badgeContent={9000} color="secondary">
              <EmailOutlinedIcon />
            </Badge>
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
        <List className={classes.list}>
          <ListItem
            button
            onClick={goToOverview}
            className={clsx({
              [classes.activeTrue]: checkPathMatch("/"),
            })}
          >
            <ListItemIcon>
              <DashboardOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Overview" />
          </ListItem>
          <ListItem
            button
            onClick={goToAccounts}
            className={clsx({
              [classes.activeTrue]: checkPathMatch("/accounts"),
            })}
          >
            <ListItemIcon>
              <PeopleAltOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Accounts" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <EmailOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItem>
          <ListItem
            button
            onClick={goToArticles}
            className={clsx({
              [classes.activeTrue]: checkPathMatch("/articles"),
            })}
          >
            <ListItemIcon>
              <DescriptionOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Articles" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <CommentOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Moderation" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ReportProblemOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItem>
        </List>
        <Divider />
        <List className={classes.list}>
          <ListItem button onClick={logout}>
            <ListItemIcon>
              <PowerSettingsNewOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
          <div>{children}</div>
        </Container>
      </main>
    </div>
  );
};

export default DashboardNav;
