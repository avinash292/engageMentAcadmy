import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: theme.palette.background.default,
  },
  paper: {
    padding: theme.spacing(3),
    maxWidth: "600px",
    width: "100%",
    boxShadow: theme.shadows[3],
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  backButton: {
    display: "flex",
    alignItems: "center",
  },

  buttonText: {
    marginLeft: theme.spacing(1),
  },
  section: {
    marginTop: theme.spacing(2),
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  loading: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 9999,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    zIndex: 9998,
  },
  toggleContainer: {
    marginBottom: theme.spacing(2),
  },
  textFieldMargin: {
    marginTop: "10px !important",
  },
  userLink: {
    textDecoration: "none",
    color: "skyblue",
  },
  toggleBtn: {
    display: "grid",
  },
  descriptionSpan: {
    paddingBottom: "10px",
  },
  formControlLabel: {
    marginLeft: "0!important",
  },
  descriptionGrid: {
    paddingTop: "0 !important",
  },
}));

export default useStyles;
