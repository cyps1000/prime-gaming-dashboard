/**
 *  Material UI Imports
 * @see https://material-ui.com/styles/basics/
 */
import { makeStyles, Theme, darken } from "@material-ui/core/styles";

/**
 * Styles the component
 */
const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  table: {
    minWidth: 700,
    backgroundColor: "#343434",
  },
  usersTitle: {
    fontSize: "3rem",

    [theme.breakpoints.down("md")]: {
      fontSize: "2.5rem",
      [theme.breakpoints.down("xs")]: {
        fontSize: "1.6rem",
      },
    },
    color: theme.palette.secondary.main,
    display: "flex",
    justifyContent: "center",
  },
  operations: {
    display: "flex",
    justifyContent: "space-evenly",
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
  viewBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#348a1f",
    borderRadius: 3,
    color: theme.palette.common.white,
    height: 30,
    width: 30,
    "& svg": {
      fontSize: "1.3rem",
    },
    "&:hover": {
      background: darken("#348a1f", 0.15),
    },
  },
  editBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#0a88a5",
    borderRadius: 3,
    color: theme.palette.common.white,
    height: 30,
    width: 30,
    "& svg": {
      fontSize: "1.3rem",
    },
    "&:hover": {
      background: darken("#0a88a5", 0.15),
    },
  },
  deleteBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#bd3434",
    borderRadius: 3,
    color: theme.palette.common.white,
    height: 30,
    width: 30,
    "& svg": {
      fontSize: "1.3rem",
    },
    "&:hover": {
      background: darken("#bd3434", 0.15),
    },
  },
}));

export { useStyles };
