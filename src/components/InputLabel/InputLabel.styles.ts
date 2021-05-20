/**
 *  Material UI Imports
 * @see https://material-ui.com/styles/basics/
 */
import { makeStyles, Theme } from "@material-ui/core/styles";

/**
 * Styles the component
 */
const useStyles = makeStyles((theme: Theme) => ({
  label: {
    display: "flex",
    fontFamily: theme.typography.fontFamily,
    fontSize: 16,
    height: "auto",
    marginTop: 8,
  },
}));

export { useStyles };
