/**
 *  Material UI Imports
 * @see https://material-ui.com/styles/basics/
 */
import { makeStyles, Theme } from "@material-ui/core/styles";

/**
 * Styles the component
 */
const useStyles = makeStyles((theme: Theme) => ({
  table: {
    minWidth: 700,
    backgroundColor: "#343434",
  },
  head: {
    backgroundColor: "#343434",
    color: theme.palette.secondary.main,
  },
  body: {
    fontSize: 14,
    color: theme.palette.secondary.main,
  },
  tableRow: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#121212c7",
      "&:hover": {
        backgroundColor: "#071d23",
      },
    },
    backgroundColor: "#121212eb",
    "&:hover": {
      backgroundColor: "#071d23",
    },
    "&.Mui-selected": {
      background: "#071d23",
    },
    "&.Mui-selected:hover": {
      background: "#071d23",
    },
  },
  loader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& .MuiCircularProgress-root": {
      marginRight: "1rem",
    },
  },
  notFound: {
    padding: 15,
    fontSize: 20,
  },
  tableContainer: {
    maxHeight: 700,
  },
  paper: {
    width: "100%",
    boxShadow: "none",
    border: "1px solid #129fbf",
  },
  toolbar: {
    background: "#272727",
    borderBottom: "1px solid #129fbf",
    borderRadius: 4,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  tableHead: {
    "& .MuiTableCell-root": {
      borderColor: "#129fbf",
      borderRight: `1px solid ${theme.palette.secondary.main}`,
      fontWeight: "bold",
    },
  },
  tableBody: {
    "& .MuiTableCell-root": {
      borderColor: "#129fbf",
      borderRight: `1px solid ${theme.palette.secondary.main}`,
      color: theme.palette.common.white,
    },
  },
}));

export { useStyles };
