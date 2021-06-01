/**
 *  Material UI Imports
 * @see https://material-ui.com/styles/basics/
 */
import { makeStyles, Theme } from "@material-ui/core/styles";

/**
 * Styles the component
 */
const useStyles = makeStyles((theme: Theme) => ({
  modal: {
    backgroundColor: "#222a35",
    width: "69vh",
  },
  modalIcon: {
    color: "#ee82ee",
  },
  titleContainer: {
    display: "flex",
    justifyContent: "flex-end",
    borderBottom: "none",
  },
  container: {
    paddingTop: "2rem",
  },
  userTitle: {
    display: "flex",
    justifyContent: "center",
    color: theme.palette.secondary.main,
  },
  userTitleIcon: {
    marginTop: "0.5rem",
    marginRight: "0.4rem",
    color: "#ee82ee",
  },
  divider: {
    height: "0.01rem",
    backgroundColor: theme.palette.secondary.main,
  },
  userName: {
    color: "#bdbdbdad",
  },
  email: {
    color: "#bdbdbdad",
  },
  reports: {
    color: "#bdbdbdad",
  },
  comments: {
    color: "#bdbdbdad",
  },
  articles: {
    color: "#bdbdbdad",
    display: "flex",
    justi: "center",
  },
}));

export { useStyles };
