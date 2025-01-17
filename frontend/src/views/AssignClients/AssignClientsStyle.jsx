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
  formContainer: {
    marginTop: "20px",
  },
  selectAdmin: {
    marginBottom: "20px",
  },
  assignmentContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  clientList: {
    width: "45%",
    padding: "20px 15px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    overflow: "auto",
    height: "500px",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: "24px",
    marginBottom: "10px",
    textAlign: "left",
  },
  clientItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  userLink: {
    textDecoration: "none",
    color: "skyblue",
  },
  btnContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  buttonSpan: {
    marginRight: "10px !important",
  },
  btnWrapper: {
    display: "flex",
    marginTop: "10px",
    justifyContent: "center",
  },
  centerBtn: {
    marginBottom: "5px !important",
  },
  buttonContainer: {
    display: "grid",
    textAlign: "cenrer",
  },
}));

export default useStyles;
