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
    minHeight: "2.5rem",
    outline: 0,
    "& $notchedOutline": {
      borderColor: theme.palette.secondary.main,
    },
    "& $notchedOutlineError": {
      borderColor: theme.palette.error.main,
    },
    "&:hover": {
      "& $notchedOutline": {
        border: `1px solid ${theme.palette.secondary.main}`,
      },
      "& $notchedOutlineError": {
        borderColor: theme.palette.error.main,
      },
    },
    "&.Mui-focused": {
      "& $notchedOutline": {
        border: `1px solid ${theme.palette.secondary.main}`,
      },
      "& $notchedOutlineError": {
        borderColor: theme.palette.error.main,
      },
    },
  },
  input: {
    outline: 0,
    padding: "10px 15px",
    color: theme.palette.secondary.main,
    "&:-webkit-autofill": {
      boxShadow: `0 0 0 50px ${theme.palette.primary.main} inset`,
      borderRadius: 0,
      "-webkit-box-shadow": `0 0 0 50px ${theme.palette.primary.main} inset`,
      "-webkit-text-fill-color": theme.palette.secondary.main,
    },
    "&:-webkit-autofill:focus": {
      boxShadow: `0 0 0 50px ${theme.palette.primary.main} inset`,
      borderRadius: 0,
      "-webkit-box-shadow": `0 0 0 50px ${theme.palette.primary.main} inset`,
      "-webkit-text-fill-color": theme.palette.secondary.main,
    },
  },
  inputError: {
    color: theme.palette.error.main,
    "&:-webkit-autofill": {
      "-webkit-text-fill-color": theme.palette.error.main,
    },
    "&:-webkit-autofill:focus": {
      "-webkit-text-fill-color": theme.palette.error.main,
    },
  },
  notchedOutline: {
    outline: 0,
    borderColor: theme.palette.secondary.main,
    "&:hover": {
      borderColor: theme.palette.secondary.main,
    },
  },
  notchedOutlineError: {
    borderColor: theme.palette.error.main,
    "&:hover": {
      borderColor: theme.palette.error.main,
    },
    "&:focus": {
      borderColor: theme.palette.error.main,
    },
  },
  startAdornment: {
    minHeight: 40,
    width: 60,
    borderRight: `1px solid ${theme.palette.secondary.main}`,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: theme.palette.primary.main,
    "& svg": {
      color: theme.palette.secondary.main,
    },
  },
  endAdornment: {
    minHeight: 40,
    width: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: theme.palette.primary.main,
    "& svg": {
      color: theme.palette.secondary.main,
    },
  },
  errorAdornment: {
    borderColor: theme.palette.error.main,
    "& svg": {
      color: theme.palette.error.main,
    },
  },
  adornedStart: {
    paddingLeft: 0,
  },
  adornedEnd: {
    paddingRight: 0,
  },
  inputBaseError: {
    borderColor: theme.palette.error.main,
    "&:hover": {
      borderColor: theme.palette.error.main,
    },
    "&:focus": {
      borderColor: theme.palette.error.main,
    },
  },
  error: {
    borderColor: theme.palette.error.main,
  },
  errorMessage: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    background: "#ffefef",
    border: "solid 1px #ff6363",
    borderRadius: 3,
    margin: 0,
    marginTop: 5,
    padding: "0 14px",
    fontSize: 12,
    minHeight: 30,
    "&.Mui-error": {
      color: "#ff6363",
    },
  },
  inputRootDisabled: {
    background: "#fbfbfb",
  },
  label: {
    color: theme.palette.secondary.main,
    fontSize: 15,
    fontFamily: theme.typography.fontFamily,
    fontWeight: "bold",
  },
  labelError: {
    color: "#ff6363",
  },
  adornmentError: {
    "& .MuiIconButton-root": {
      color: theme.palette.error.main,
    },
  },
}));

export { useStyles };
