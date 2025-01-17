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
  buttonSpacing: {
    marginRight: theme.spacing(1), // Adjust the spacing as needed
  },
  buttonSpan: {
    marginRight: "20px !important",
  },
  buttonDiv: {
    display: "inline",
  },
  btnContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
}));

export default useStyles;
