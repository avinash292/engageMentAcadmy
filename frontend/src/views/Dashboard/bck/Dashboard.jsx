import React, { useState } from "react";
import { CardContent, Button, CircularProgress, Input } from "@mui/material";
import Snackbar from "@material-ui/core/Snackbar";
import useStyles from "./DashboardStyle";
import { useParams } from "react-router-dom";
import API from "../../axios/axiosApi";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const classes = useStyles();
 const { id, userName } = useParams();
  const [file, setFile] = useState(null);
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [loading, setLoading] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);

  const handleSnackToggle = (message, severity) => {
    setSnack({ open: true, message: message, severity: severity });
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const user_data = JSON.parse(localStorage.getItem("user_data"));
  const handleUpload = async () => {
    setLoading(true);
    setOverlayVisible(true);

    try {
      if (!file) {
        handleSnackToggle("Please select a file", "error");
        setLoading(false);
        return;
      }
      let userId;
      if (id) {
        // console.log("userID from url" + id);
        userId = id;
      } else {
        userId = user_data.user_id;
        // console.log("userID from storage" + user_data.user_id);
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("user_id", userId);
      const response = await API.post("/upload-csv", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("response", response);
      if (response.status === 200) {
        handleSnackToggle("CSV file uploaded successfully", "success");
      } else {
        handleSnackToggle(response.data.message, "error");
      }
    } catch (error) {
      console.error("Error uploading CSV file:", error);
      handleSnackToggle("Error uploading CSV file", "error");
    } finally {
      setLoading(false);
      setOverlayVisible(false);
    }
  };

  return (
    <div className={classes.container}>
      {loading && <CircularProgress className={classes.loading} />}
      {overlayVisible && <div className={classes.overlay} />} {/* Overlay */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snack.open}
        onClose={() => setSnack((snack) => ({ ...snack, open: false }))}
        autoHideDuration={6000}
        message={snack.message}
        severity={snack.severity}
      />
      <div className={classes.outerDiv}>
        <div className={classes.cardContainer}>
          <CardContent className={classes.formContent}>
           <div className={classes.leadButton}>
              {user_data.role === "admin" ? (
                <div>
                  <span className={classes.buttonSpan}>
                    <Link to={`/dashboard`}>
                      <Button variant="outlined" color="success">
                        Return To Dashboard
                      </Button>
                    </Link>
                  </span>
                  <span className={classes.buttonSpan}>
                    <Link to={`/lead/${id}/${userName}`}>
                      <Button variant="contained" color="success">
                        {userName}'s All Leads
                      </Button>
                    </Link>
                  </span>
                </div>
              ) : (
                <span className={classes.buttonSpan}>
                  <Link
                    to={`/lead/${user_data.user_id}/${user_data.full_name}`}
                  >
                    <Button variant="contained" color="success">
                      All Leads
                    </Button>
                  </Link>
                </span>
              )}
            </div>

            <h3>Upload CSV</h3>
            <Input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              inputProps={{ className: classes.inputFile }}
            />
            <Button variant="contained" color="primary" onClick={handleUpload}>
              Upload
            </Button>
            <div className={classes.sampleLink}>
              <a href="/csvfile/sample.csv" download>
                View Sample CSV
              </a>
            </div>
          </CardContent>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
