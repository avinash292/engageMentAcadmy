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
    width: "80%",
    maxWidth: "1000px",
    height: "90vh",
    overflowY: "auto",
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  centeredHeading: {
    // textAlign: "center", // Centers the heading text horizontally
    gridColumn: "span 2", // Ensures it spans across both columns
    fontWeight: "700 !important",
    textDecoration: "underline",
  },
  modalContent: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px",
  },
  sectionTitle: {
    gridColumn: "span 2",
    fontWeight: "bold",
    marginBottom: "0px",
  },
  jsonButton: {
    gridColumn: "span 2",
    alignSelf: "center",
    justifySelf: "center",
    marginTop: "20px",
  },

  modalColumn: {
    flex: 1,
    padding: theme.spacing(2),
  },
  userLink: {
    textDecoration: "none",
    color: "skyblue",
  },
  // Add grid styling for message list with dynamic column setup
messageList: {
  display: "contents",
  flexDirection: "column",  // Arrange the items vertically (in columns)
  gap: "5px", // Space between items
},

messageItem: {
  display: "block",  // Ensures that each item is a block-level element
  // border: "1px solid #ddd",
  // padding: "10px",
  // borderRadius: "5px",
  // backgroundColor: "#f9f9f9",
},

messageDetail: {
  // padding: "5px 0",  // Adds padding between each message detail
  // marginBottom: "0px",  // Space between lines
  // display: "flex",  // Flexbox to align items in each row
  // justifyContent: "space-between",  // Align label and value to the edges
},
// noMessages: {
//   fontSize: "16px",
//   color: "#777", // Grey color for the text
//   textAlign: "center", // Center the text
//   padding: "10px 0", // Add some padding for spacing
// },

// Responsive adjustments
"@media (max-width: 768px)": {
  messageList: {
    flexDirection: "column", // Ensure the column layout is maintained for smaller screens
  },
},

"@media (max-width: 480px)": {
  messageList: {
    flexDirection: "column", // Single column for very small screens
  },
},

}));

export default useStyles;
