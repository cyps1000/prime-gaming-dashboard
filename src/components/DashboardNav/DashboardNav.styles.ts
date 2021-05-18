/**
 *  Material UI Imports
 * @see https://material-ui.com/styles/basics/
 */
import { makeStyles, Theme, fade } from "@material-ui/core/styles";

/**
 * Styles the component
 */
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    backgroundColor: "#121212",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    backgroundColor: fade(theme.palette.secondary.main, 0.7),
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#343434",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: 240,
    width: `calc(100% - ${240}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    color: theme.palette.secondary.main,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
    },
  },
  messages: {
    [theme.breakpoints.down("xs")]: {
      transform: "scale(0.9)",
    },
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    height: "100vh",
    width: 240,
    backgroundColor: "#272727",
    color: theme.palette.secondary.main,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7),
    },
  },
  fixedHeight: {
    height: 240,
  },
  list: {
    "& svg": {
      color: theme.palette.secondary.main,
    },
    "& .MuiListItemText-root": {
      color: theme.palette.common.white,
    },
    "& .MuiListItem-button": {
      "&:hover": {
        backgroundColor: fade(theme.palette.secondary.main, 0.21),
      },
    },
  },
  activeTrue: {
    backgroundColor: fade(theme.palette.secondary.main, 0.21),
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export { useStyles };
