/**
 *  Material UI Imports
 * @see https://material-ui.com/styles/basics/
 */
import { darken, makeStyles, Theme } from "@material-ui/core/styles";

/**
 * Styles the component
 */
const useStyles = makeStyles((theme: Theme) => ({
  table: {},
  actions: {
    display: "flex",
    alignItems: "center",
  },
  loader: {
    display: "flex",
    alignItems: "center",
    marginLeft: "1rem",
  },
  field: {
    marginBottom: 0,
  },
  icon: {
    color: theme.palette.secondary.main,
  },
  flex: {
    display: "flex",
  },
  undoBtn: {
    width: 40,
    height: 30,
    minWidth: 0,
    margin: 0,
    marginLeft: "0.75rem",
    padding: "0.25rem",
    borderRadius: 3,
    "& svg": {
      margin: 0,
    },
    background: "#f59200",
    color: theme.palette.common.white,
    boxShadow: "none",
    "&:hover": {
      background: darken("#f59200", 0.15),
      boxShadow: "none",
    },
  },
  addBtn: {
    width: 40,
    height: 30,
    minWidth: 0,
    margin: 0,
    marginLeft: "0.75rem",
    padding: "0.25rem",
    borderRadius: 3,
    "& svg": {
      margin: 0,
    },
    background: "#348a1f",
    color: theme.palette.common.white,
    boxShadow: "none",
    "&:hover": {
      background: darken("#348a1f", 0.15),
      boxShadow: "none",
    },
  },
  stats: {
    display: "flex",
    justifyContent: "flex-end",
    color: theme.palette.common.white,
    fontSize: "0.8rem",
    fontWeight: 800,
    fontFamily: theme.typography.fontFamily,
  },
  paper: {
    width: "100%",
    boxShadow: "none",
  },
  loadingCell: {
    padding: "15px !important",
  },
  checkboxCell: {
    padding: "0 !important",
    width: 50,
  },
  checkboxRoot: {
    padding: 5,
    color: "#0a88a5",
  },
  bulkDeleteContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 0,
    "& svg": {
      fontSize: "2rem",
      color: theme.palette.common.white,
    },
  },
  bulkSelectedCount: {
    fontSize: 18,
    color: theme.palette.common.white,
    fontFamily: theme.typography.fontFamily,
  },
  toolbarActive: {
    background: "rgb(7 29 35) !important",
  },
  bulkDeleteBtn: {
    height: 45,
    width: 45,
    background: "#314044",
    "&:hover": {
      background: theme.palette.error.main,
    },
  },
  selectableCell: {
    cursor: "pointer",
  },
  paginationRoot: {
    "& .MuiSelect-icon": {
      color: theme.palette.common.white,
    },
    "& .MuiIconButton-root.Mui-disabled": {
      color: "rgb(255 255 255 / 44%)",
    },
  },
  paginationSpacer: {
    flex: 0,
  },
}));

export { useStyles };
