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

  btnContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  addButton: {
    marginLeft: "auto",
  },

  inputContainer: {
    display: "flex",
    // flexDirection: "column",
    gap: theme.spacing(2), // Add space between the fields
    marginBottom: theme.spacing(2),
  },
  textField: {
    height: "40px", // Decrease height of the input field
    maxWidth: "50%",
  },
  textarea: {
    width: "100%", // Full width textarea
    minWidth: "300px", // Minimum width of textarea
    resize: "vertical",
    padding: theme.spacing(1),
  },
  createButton: {
    marginTop: theme.spacing(2),
  },
  buttonSpan: {
    marginRight: "10px !important",
  },
  userLink: {
    textDecoration: "none",
    color: "skyblue",
  },
}));

export default useStyles;