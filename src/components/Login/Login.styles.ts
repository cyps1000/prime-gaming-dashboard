/**
 *  Material UI Imports
 * @see https://material-ui.com/styles/basics/
 */
import { makeStyles, Theme } from "@material-ui/core/styles";

/**
 * Styles the component
 */
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // flexGrow: 1,
  },
  body: {
    marginTop: "0",
    height: "100%",
    backgroundColor: theme.palette.primary.main,
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: theme.palette.secondary.main,
  },
  form: {
    marginTop: 20,
  },
  submit: {
    margin: theme.spacing(2, 0, 1),
    color: "#fff",
    backgroundColor: "#ee82ee",
    "&:hover": {
      backgroundColor: "#ee82ee73",
    },
  },
}));

export { useStyles };
