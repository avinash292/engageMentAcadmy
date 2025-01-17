import React, { useState, useEffect } from "react";
import {
  CardContent,
  Button,
  CircularProgress,
  Input,
  FormControl,
  Tooltip,
  Autocomplete,
  TextField,
  Grid,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { useParams, useHistory } from "react-router-dom";

import API from "../../axios/axiosApi";
import $ from "jquery";
import "datatables.net";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import useStyles from "./DashboardStyle"; // Make sure this is the correct import

import "react-phone-number-input/style.css";
// Modal style
const modalStyle = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  outline: "none",
  BorderStyleRounded: "5px !important",
};

const Dashboard = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id, userName } = useParams();
  const [file, setFile] = useState(null);
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const user_data = JSON.parse(localStorage.getItem("user_data"));
  const [loading, setLoading] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [contactLists, setContactLists] = useState([]);
  const [selectedContactList, setSelectedContactList] = useState(null);
  const [leads, setLeads] = useState(null);
  const [userLogs, setUserLogs] = useState([]);
  const [selectedLog, setSelectedLog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    contactList: null,
  });

  const LogDetailModal = ({ open, log, onClose }) => {
    return (
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        style={{ borderRadius: "5px" }}
      >
        <Box sx={modalStyle} style={{ borderRadius: "5px" }}>
          <Typography id="modal-title" variant="h6" component="h2">
            Log Detail
          </Typography>
          {log ? (
            <div>
              <Typography
                id="modal-description"
                sx={{ mt: 2, fontSize: "12px" }}
              >
                <strong>Name :</strong> {log.name}
              </Typography>
              <Typography
                id="modal-description"
                sx={{ mt: 2, fontSize: "12px" }}
              >
                <strong>Source :</strong> {log.source}
              </Typography>
              {log.source === "CSV" && (
                <Typography
                  id="modal-description"
                  sx={{ mt: 2, fontSize: "12px" }}
                >
                  <strong>Total Contact :</strong> {log.total_contact}
                </Typography>
              )}

              <Typography
                id="modal-description"
                sx={{ mt: 2, fontSize: "12px" }}
              >
                <strong>Uploaded Contact :</strong> {log.uploaded_contact}
              </Typography>
              <Typography
                id="modal-description"
                sx={{ mt: 2, fontSize: "12px" }}
              >
                <strong>Client Name :</strong> {log.user_name}
              </Typography>
              <Typography
                id="modal-description"
                sx={{ mt: 2, fontSize: "12px" }}
              >
                <strong>Uploaded At:</strong> {formatDate(log.createdAt)}
              </Typography>
            </div>
          ) : (
            <Typography id="modal-description" sx={{ mt: 2, fontSize: "12px" }}>
              No details available.
            </Typography>
          )}
        </Box>
      </Modal>
    );
  };

  useEffect(() => {
    const fetchContactLists = async () => {
      try {
        const response = await API.get(`/getAllContactList/${id}`);
        console.log("response", response);
        const formattedContactLists = response.data.result.map(
          (contactList) => ({
            id: contactList.contact_list_id,
            name: contactList.list_name,
            leads: contactList.leads,
          })
        );
        setContactLists([
          ...formattedContactLists,
          { id: "create", name: "+Create contact list", leads: [] },
        ]);
      } catch (error) {
        console.error("Error fetching contact lists:", error);
        setContactLists([
          { id: "create", name: "+Create contact list", leads: [] },
        ]);
      }
    };
    const fetchUserLogs = async () => {
      try {
        const response = await API.get(`/getUserLogs/${id}`);
        console.log("getUserLogs", response);
        setUserLogs(response.data.result);
        setTimeout(() => {
          $("#usersTable").DataTable();
          setLoading(false);
        }, 100);
      } catch (error) {
        console.error("Error fetching user logs:", error);
      }
    };

    fetchContactLists();
    fetchUserLogs();
  }, [id]);

  useEffect(() => {
    if (userLogs.length > 0) {
      const dataTable = $("#usersTable").DataTable();
      return () => {
        dataTable.destroy(true);
      };
    }
  }, [userLogs]);

  const handleSnackToggle = (message, severity) => {
    setSnack({ open: true, message: message, severity: severity });
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContactListChange = (event, newValue) => {
    if (newValue?.id === "create") {
      history.push(`/CreateContactList/${id}/${userName}`);
    } else {
      setFormData({ ...formData, contactList: newValue });
      if (newValue) {
        setLeads(newValue.leads);
      }
    }
  };

  const handleContactListChangeUpload = (event, newValue) => {
    if (newValue?.id === "create") {
      history.push(`/CreateContactList/${id}/${userName}`);
    } else {
      setSelectedContactList(newValue);
      if (newValue) {
        setLeads(newValue.leads);
      }
    }
  };

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
        userId = id;
      } else {
        userId = user_data.user_id;
      }

      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("user_id", userId);
      uploadData.append("leads", leads);
      uploadData.append("role", user_data.role);
      uploadData.append("user_name", userName);
      uploadData.append(
        "contactListId",
        selectedContactList ? selectedContactList.id : ""
      );
      // console.log("uploadData", uploadData);
      const response = await API.post("/upload-csv", uploadData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // console.log(" upload csv response", response);
      if (response.status === 200) {
        setTimeout(() => {
          window.location.reload();
        }, 10000); // Reloads the window after 10 seconds
        handleSnackToggle(response.data.message, "success");
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

  const handleAddContact = async () => {
    setLoading(true);
    setOverlayVisible(true);
    try {
      const phoneNumberWithCode = formData.phoneNumber
        ? formData.phoneNumber
        : "";
      if (!formData.name) {
        handleSnackToggle("Name field is required", "error");
        return false;
      }
      if (!phoneNumberWithCode) {
        handleSnackToggle("PhoneNumber With Code is required", "error");
        return false;
      }
      if (!formData.email) {
        handleSnackToggle("Email field is required", "error");
        return false;
      }

      const response = await API.post("/add-contact", {
        name: formData.name,
        phoneNumber: phoneNumberWithCode,
        email: formData.email,
        user_id: id,
        leads: leads,
        role: user_data.role,
        user_name: userName,
        contactListId: formData.contactList ? formData.contactList.id : null,
      });
      console.log(response);
      if (response.status === 200) {
        handleSnackToggle(response.data.message, "success");
        setFormData({
          name: "",
          phoneNumber: "",
          email: "",
          contactList: null,
        });
        window.location.reload();
      } else {
        handleSnackToggle(response.data.message, "error");
      }
    } catch (error) {
      console.error("Error adding contact:", error);
      handleSnackToggle("Error adding contact", "error");
    } finally {
      setLoading(false);
      setOverlayVisible(false);
    }
  };
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${day}-${month}-${year}, ${formattedHours}:${minutes} ${ampm}`;
  };

  const filterUserLogs = async (id) => {
    const selectedLog = userLogs.find((log) => log.id === id);
    setSelectedLog(selectedLog);
    setIsModalOpen(true);
  };

  return (
    <div className={classes.container}>
      {loading && <CircularProgress className={classes.loading} />}
      {overlayVisible && <div className={classes.overlay} />}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snack.open}
        onClose={() => setSnack((snack) => ({ ...snack, open: false }))}
        autoHideDuration={5000}
        message={snack.message}
        severity={snack.severity}
      />
      <div className={classes.outerDiv}>
        <div className={classes.cardContainer}>
          <CardContent className={classes.formContent}>
            <div className={classes.uploadOuter}>
              <div className={classes.leadButton}>
                {user_data.role === "admin" ||
                user_data.role === "superadmin" ? (
                  <div>
                    <span className={classes.buttonSpan}>
                      <Link to={`/Clients`}>
                        <Button variant="outlined" color="success">
                          Return To Dashboard
                        </Button>
                      </Link>
                    </span>
                    <span className={classes.buttonSpan}>
                      <Link to={`/lead/${id}/${userName}`}>
                        <Button variant="contained" color="success">
                          {userName}'s All Contacts
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
              <div className={classes.uloadCSV}>
                <h3>Upload CSV</h3>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Input
                      type="file"
                      accept=".csv"
                      onChange={handleFileChange}
                      inputProps={{ className: classes.inputFile }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} style={{ paddingTop: "15px" }}>
                    <FormControl fullWidth>
                      <Autocomplete
                        options={contactLists}
                        getOptionLabel={(option) => option.name}
                        value={selectedContactList}
                        onChange={handleContactListChangeUpload}
                        renderOption={(props, option) => (
                          <React.Fragment>
                            {option.id === "create" && (
                              <li key="divider">
                                <hr className={classes.line} />
                              </li>
                            )}
                            <li {...props}>{option.name}</li>
                          </React.Fragment>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Contact List"
                            variant="standard"
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleUpload}
                      className={classes.uploadButton}
                    >
                      Upload
                    </Button>
                  </Grid>
                </Grid>
                <div className={classes.sampleLink}>
                  <a href="/csvfile/sample.csv" download>
                    View Sample CSV
                  </a>
                </div>
              </div>
            </div>
            <div className={classes.nextfom}>
              <span className={classes.orText}>OR</span>
              <hr className={classes.line} />
            </div>
            <h3>Add Contact</h3>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Name*"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <PhoneInput
                    placeholder="Phone Number*"
                    value={formData.phoneNumber}
                    onChange={(value) =>
                      setFormData({ ...formData, phoneNumber: value })
                    }
                    containerClass="my-container-class"
                    inputClass="my-input-class"
                    style={{
                      border: "none !important",
                      background: "transparent important",
                      borderBottom: "1px solid rgba(0,0,0,0.5)",
                      outline: "none",
                      padding: "6px 0px",
                    }}
                    className={classes.phoneInput}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6} style={{ paddingTop: "15px" }}>
                  <FormControl fullWidth>
                    <Autocomplete
                      options={contactLists}
                      getOptionLabel={(option) => option.name}
                      value={formData.contactList}
                      onChange={handleContactListChange}
                      renderOption={(props, option) => (
                        <React.Fragment>
                          {option.id === "create" && (
                            <li key="divider">
                              <hr className={classes.line} />
                            </li>
                          )}
                          <li {...props}>{option.name}</li>
                        </React.Fragment>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Contact List"
                          variant="standard"
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} className={classes.btnDiv}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleAddContact}
                    style={{ width: "auto", padding: "7px 50px" }}
                  >
                    Add Contact
                  </Button>
                </Grid>
              </Grid>
            </form>
            <h3>Contacts Audit Trail</h3>
            <table
              id="usersTable"
              className={`display ${classes.dataTable}`}
              style={{ width: "100%" }}
            >
              <thead>
                <tr>
                  <th>Serial No.</th>
                  <th>User</th>
                  <th>Action</th>
                  <th>Action Type</th>
                  <th>Source</th>
                  <th>Uploaded At</th>
                  <th>Log</th>
                </tr>
              </thead>
              <tbody>
                {userLogs &&
                  userLogs.map((row, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{row.user_type}</td>
                      <td>{row.user_action}</td>
                      <td>{row.user_action_type}</td>
                      <td>{row.source}</td>
                      <td>{formatDate(row.createdAt)}</td>
                      <td>
                        <Tooltip title="View detail">
                          <span
                            style={{ color: "blue", cursor: "pointer" }}
                            onClick={() => filterUserLogs(row.id)}
                          >
                            View Detail
                          </span>
                        </Tooltip>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <LogDetailModal
              open={isModalOpen}
              log={selectedLog}
              onClose={() => setIsModalOpen(false)}
            />
          </CardContent>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
