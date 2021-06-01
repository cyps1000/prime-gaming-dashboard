/**
 *  Material UI Imports
 * @see https://material-ui.com/styles/basics/
 */
import { makeStyles, Theme } from "@material-ui/core/styles";

/**
 * Styles the component
 */
const useStyles = makeStyles((theme: Theme) => ({
  anchor: {
    top: 115,
  },
  root: {
    fontSize: 14,
    fontWeight: "bold",
    borderRadius: 3,
    padding: "7px 14px",
    minHeight: 30,
    boxShadow: "none",
  },
  success: {
    backgroundColor: "#edfcf3",
    border: "1px solid #55ba85",
    color: "#55ba85",
  },
  warning: {
    warningMessage: {
      backgroundColor: "rgba(255, 146, 100, 0.1)",
      border: "1px solid #ff9264",
      color: "#ff9264",
    },
  },
  error: {
    backgroundColor: "#ffefef",
    border: "1px solid #ff6363",
    color: "#ff6363",
  },
  iconBtn: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));

export { useStyles };
