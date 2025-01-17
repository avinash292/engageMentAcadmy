import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    minHeight: "inherit",
    backgroundColor: theme.palette.background.default,
  },
  loading: {
    position: "absolute",
    top: "40%",
    left: "50%",
    height: "80px !important",
    width: "80px !important",
    zIndex: 9999, // Ensure it's above other content
  },
  card: {
    width: "1000px",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    transition: "0.3s",
    borderRadius: "10px",
    "&:hover": {
      boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2)",
    },
    border: "2px solid violet",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
  },
  centerCard: {
    display: "flex",
    justifyContent: "center",
    width: "100%", // Ensure the card spans the full width
  },
  outerDiv: {
    width: "100%",
    maxWidth: "800px",
  },
  formContent: {
    marginTop: "50px",
    flexDirection: "column",
    gap: "20px",
  },
  overlay: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
    zIndex: 9999,
  },
  leadButton: {
    width: "100%",
    display: "flex",
    justifyContent: "end",
  },
  buttonSpan: {
    marginRight: "10px !important",
  },
  inputFile: {
    width: "100%",
    marginBottom: "20px",
    display: "none",
  },
  sampleLink: {
    marginTop: theme.spacing(1),
  },
  contactList: {
    paddingTop: "inherit",
  },
  PhoneInputInput: {
    flex: "1 1",
    minWidth: "0",
    border: "none !important",
    background: "transparent !important",
  },
  uploadOuter: {
    textAlign: "center",
    "& $leadButton": {
      justifyContent: "center",
      marginBottom: "25px",
    },
    "& > h3": {
      marginBottom: "10px",
    },
  },
  nextfom: {
    marginTop: "10px",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  line: {
    width: "100%",
    border: "none",
    height: "2px",
    backgroundColor: "rgb(155 145 145 / 65%)",
    margin: "0.5rem 0",
  },
  orText: {
    position: "absolute",
    top: "0px",
    background: theme.palette.background.default,
    padding: "0 5px",
    color: "#000",
  },
  uloadCSV: {
    width: "auto",
    // display: "inline-block",
    verticalAlign: "top",
    textAlign: "left",
  },
  btnDiv: {
    display: "flex",
    justifyContent: "center",
  },
  addContactBtn: {
    width: "auto",
    padding: "7px 50px",
  },
  uploadButton: {
    width: "100%",
  },
  dataTable: {
    fontSize: "12px", // Adjust the font size as needed
    "& td": {
      fontSize: "10px", // Ensure table headers and cells have the same font size
    },
    "& th": {
      fontSize: "13px",
    },
  },
  phoneInput: {
    "& input": {
      border: "none !important",
      outline: "none !important",
      background: "transparent !important",
    },
  },
}));

export default useStyles;
