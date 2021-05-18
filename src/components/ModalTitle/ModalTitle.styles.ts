/**
 *  Material UI Imports
 * @see https://material-ui.com/styles/basics/
 */
import { makeStyles, Theme } from "@material-ui/core/styles";

/**
 * Styles the component
 */
const useStyles = makeStyles((theme: Theme) => ({
  dialogTitle: {
    padding: 0,
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.5rem",
    borderBottom: "1px solid #e2e2e2",
  },
  title: {
    fontSize: "1rem",
    fontFamily: theme.typography.fontFamily,
    fontWeight: "bold",
    paddingLeft: "0.5rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.95rem",
    },
  },
  icon: {
    background: theme.palette.primary.main,
    height: "1.5rem",
    width: "1.5rem",
    color: theme.palette.primary.contrastText,
    borderRadius: "50%",
    padding: 1,
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
}));

export { useStyles };
