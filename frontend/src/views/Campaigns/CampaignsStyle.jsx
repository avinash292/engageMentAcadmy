import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "inherit",
    backgroundColor: theme.palette.background.default,
  },
  tableContainerDiv: {
    width: "80%", // Adjust the width of the table container
    margin: "auto",
  },
  tableContainer: {
    width: "100%",
    padding: theme.spacing(2),
    overflowX: "auto", // Add overflow properties here
  },
  loading: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 9999,
  },
  pagination: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9998,
  },
  btnContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  addButton: {
    marginLeft: "auto",
  },
  buttonSpacing: {
    marginRight: theme.spacing(1), // Adjust the spacing as needed
  },
  buttonSpan: {
    marginRight: "10px !important",
  },
  buttonDiv: {
    display: "flex",
    fontSize: "large",
  },
  displayNowrap: {
    whiteSpace: "nowrap",
  },
  dataTablesWrapper: {
    width: "100%",
    margin: "0 auto",
    overflowX: "auto",
    overflowY: "hidden",
  },
  dataTablesLength: {
    margin: "20px 0",
  },
  dataTablesFilter: {
    margin: "20px 0",
  },
  dataTablesInfo: {
    margin: "20px 0",
  },
  dataTablesPaginate: {
    margin: "20px 0",
    float: "right",
  },
  dataTablesProcessing: {
    top: "50%",
    left: "50%",
    width: "100%",
    height: "100%",
    marginTop: "-25px",
    paddingTop: "25px",
    background: "rgba(0, 0, 0, 0.1)",
    zIndex: 10000,
  },
  paginateButton: {
    padding: "0.5em 1em",
    marginLeft: "2px",
    marginRight: "2px",
    color: "white !important",
    background: "#007bff",
    border: "1px solid transparent",
    borderRadius: "4px",
    textDecoration: "none",
    "&:hover": {
      background: "#0056b3",
    },
    "&.current": {
      background: "#0056b3",
    },
  },

  modalStyle: {
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 780,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid gray",
    borderRadius: "5px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modalContent: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "row",
    gap: "8px",
    width: "100%",
    "& p": {
      margin: 0,
    },
  },
  modalColumn: {
    flex: 1,
    padding: theme.spacing(2),
    "& ul": {
      listStyle: "none",
      padding: 0,
      marginTop: "15px",
    },
    "& li": { display: "flex", marginBottom: theme.spacing(1) },
    "& span": {
      display: "inline-block",
      width: "110px",
    },
  },
  userLink: {
    textDecoration: "none",
    color: "skyblue",
  },
}));

export default useStyles;
