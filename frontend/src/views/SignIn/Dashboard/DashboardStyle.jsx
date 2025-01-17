import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    // marginTop: "30px",
    justifyContent: "center",
    alignItems: "center",
    // height: "100vh",
    minHeight: "inherit",
    backgroundColor: theme.palette.background.default,
  },

  loading: {
    position: "absolute",
    top: "40%",
    left: "50%",
    height: "80px !important",
    width: "80px !important",
    // transform: "translate(-50%, -50%)",
    zIndex: 9999, // Ensure it's above other content
  },
  card: {
    marginTop: "30px",
    width: "1000px",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    transition: "0.3s",
    borderRadius: "10px",
    "&:hover": {
      boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2)",
    },
    border: "2px solid violet",
  },
  buttonContainer: {
    marginTop: "16px",
  },
  unfollowBtn: { marginLeft: "10px !important" },
  centerCard: {
    display: "flex",
    justifyContent: "center",
    width: "100%", // Ensure the card spans the full width
  },
  outerDiv: {
    width: "100%",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
  },
  formContent: {
    marginTop: "150px",
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
    display: "ruby-text",
  },
}));

export default useStyles;
