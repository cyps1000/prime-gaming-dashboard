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
  title: {
    color: theme.palette.secondary.main,
    display: "flex",
    justifyContent: "center",
  },
  author: {
    color: "#ee82ee",
    display: "flex",
    justifyContent: "center",
    marginTop: "1rem",
  },
  content: {
    display: "flex",
    justifyContent: "center",
    color: "#ffffffb0",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    marginBottom: "1.5rem",
  },
  divider: {
    height: "0.01rem",
    backgroundColor: theme.palette.secondary.main,
  },
  socials: {
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: "2rem",
    marginBottom: "1rem",
    color: "#ffffffb0",
  },
  likeButton: {
    marginRight: "0.4rem",
    color: "#D46A6A",
  },
  shareButton: {
    marginRight: "0.4rem",
    color: "#515E91",
  },
  commentButton: {
    marginRight: "0.4rem",
    color: theme.palette.secondary.main,
  },
  articleTitle: {
    marginTop: "0.7rem",
    marginRight: "0.6rem",
  },
  writtenBy: {
    marginTop: "0.3rem",
    marginRight: "0.4rem",
  },
}));

export { useStyles };
