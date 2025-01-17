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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(2, 0),
  },
  checkboxGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: theme.spacing(1, 0),
  },
  button: {
    margin: theme.spacing(2, 0),
  },
  loading: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 9999,
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
  buttonSpan: {
    marginRight: "10px !important",
  },
  btnContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },userLink: {
    textDecoration: "none",
    color: "skyblue",
  },
}));

export default useStyles;
