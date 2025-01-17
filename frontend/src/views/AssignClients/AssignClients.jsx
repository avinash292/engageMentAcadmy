import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import {
  CircularProgress,
  Button,
  Snackbar,
  Alert,
  Checkbox,
  FormControlLabel,
  Tooltip,
  // Typography,
} from "@mui/material";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import API from "../../axios/axiosApi";
import useStyles from "./AssignClientsStyle"; // Create this style file

const AssignClients = () => {
  const classes = useStyles();
  const { userId, name } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [unassignedClients, setUnassignedClients] = useState([]);
  const [assignedClients, setAssignedClients] = useState([]);
  const [selectedClients, setSelectedClients] = useState([]);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSnackToggle = useCallback((message, severity) => {
    setSnack({
      open: true,
      message: message || "",
      severity: severity || "success",
    });
  }, []);

  const fetchClients = useCallback(async () => {
    setLoading(true);
    setOverlayVisible(true);
    try {
      const clientsResponse = await API.get("getAllUsers");
      console.log("clientsResponse", clientsResponse);
      setClients(clientsResponse.data.data);
      setLoading(false);
      setOverlayVisible(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
      handleSnackToggle("Error fetching data. Please try again.", "error");
    }
  }, [handleSnackToggle]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  useEffect(() => {
    const assigned = clients.filter((client) => {
      const adminIds = JSON.parse(client.admin_id || "[]");
      return adminIds.includes(userId);
    });

    const unassigned = clients.filter((client) => {
      const adminIds = JSON.parse(client.admin_id || "[]");
      return !adminIds.includes(userId);
    });

    setAssignedClients(assigned);
    setUnassignedClients(unassigned);
    setSelectedClients([]);
  }, [userId, clients]);

  const handleAssign = () => {
    const clientsToAssign = unassignedClients.filter((client) =>
      selectedClients.includes(client.id)
    );

    const updatedUnassignedClients = unassignedClients.filter(
      (client) => !selectedClients.includes(client.id)
    );

    const newAssignedClients = clientsToAssign.filter(
      (client) =>
        !assignedClients.some(
          (assignedClient) => assignedClient.id === client.id
        )
    );

    setUnassignedClients(updatedUnassignedClients);
    setAssignedClients([...assignedClients, ...newAssignedClients]);
    setSelectedClients([]);
    console.log("assignedClients", assignedClients);
  };

  const handleUnassign = () => {
    const clientsToUnassign = assignedClients.filter((client) =>
      selectedClients.includes(client.id)
    );
    setAssignedClients(
      assignedClients.filter((client) => !selectedClients.includes(client.id))
    );
    setUnassignedClients([...unassignedClients, ...clientsToUnassign]);
    setSelectedClients([]);
  };

  const handleUpdateAssignments = async () => {
    setLoading(true);
    setOverlayVisible(true);
    try {
      const response = await API.post("updateAssignments", {
        adminId: userId,
        clientIds: assignedClients.map((client) => client.id),
      });
      if (response.status === 200) {
        handleSnackToggle("Client assignments updated successfully", "success");
        window.location.reload();
      } else {
        handleSnackToggle("Error updating assignments", "error");
      }
    } catch (error) {
      console.error("Error updating assignments:", error);
      handleSnackToggle("Error updating assignments", "error");
    } finally {
      setLoading(false);
      setOverlayVisible(false);
    }
  };

  const handleCheckboxChange = (clientId) => {
    setSelectedClients((prevSelected) =>
      prevSelected.includes(clientId)
        ? prevSelected.filter((id) => id !== clientId)
        : [...prevSelected, clientId]
    );
  };

  const handleSelectAll = (type) => {
    if (type === "unassigned") {
      setSelectedClients(unassignedClients.map((client) => client.id));
    } else if (type === "assigned") {
      setSelectedClients(assignedClients.map((client) => client.id));
    }
  };

  const handleDeselectAll = () => {
    setSelectedClients([]);
  };

  return (
    <div className={classes.container}>
      {loading && <CircularProgress className={classes.loading} />}
      {overlayVisible && <div className={classes.overlay} />} {/* Overlay */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snack.open}
        autoHideDuration={6000}
        onClose={() => setSnack((snack) => ({ ...snack, open: false }))}
      >
        <Alert
          onClose={() => setSnack((snack) => ({ ...snack, open: false }))}
          severity={snack.severity}
        >
          {snack.message}
        </Alert>
      </Snackbar>
      <div className={classes.tableContainerDiv}>
        <div className={classes.tableContainer}>
          <div className={classes.btnContainer}>
            <h2>
              {name && (
                <>
                  {"Team Member : "}
                  <Link to={`/TeamMembers`} className={classes.userLink}>
                    {name} / &nbsp;
                  </Link>
                </>
              )}
              Assign Client
            </h2>
            <div>
              <span className={classes.buttonSpan}>
                <Tooltip title="Go Back">
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.addButton}
                    onClick={() => history.goBack()}
                  >
                    <span className={classes.buttonSpan}>
                      <FontAwesomeIcon icon={faArrowLeft} />
                    </span>
                    Back
                  </Button>
                </Tooltip>
              </span>
              <span className={classes.buttonSpan}>
                <Link to={`/addClient/Client`}>
                  <Tooltip title="Add New Client">
                    <Button
                      variant="outlined"
                      color="success"
                      className={classes.addButton}
                    >
                      <span className={classes.buttonSpan}>
                        {" "}
                        <FontAwesomeIcon icon={faPlus} />
                      </span>
                      Add Client
                    </Button>
                  </Tooltip>
                </Link>
              </span>
            </div>
          </div>

          <div className={classes.formContainer}>
            <div className={classes.assignmentContainer}>
              <div className={classes.clientList}>
                <h3 className={classes.title}>All Clients</h3>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(e) =>
                        e.target.checked
                          ? handleSelectAll("unassigned")
                          : handleDeselectAll()
                      }
                    />
                  }
                  label="Select All"
                />
                {unassignedClients.map((client) => (
                  <div key={client.id} className={classes.clientItem}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedClients.includes(client.id)}
                          onChange={() => handleCheckboxChange(client.id)}
                        />
                      }
                      label={`${client.first_name} ${client.last_name}`}
                    />
                  </div>
                ))}
              </div>

              <div className={classes.buttonContainer}>
                <Button
                  variant="outlined"
                  onClick={handleAssign}
                  className={classes.centerBtn}
                >
                  &rarr;
                </Button>
                <Button variant="outlined" onClick={handleUnassign}>
                  &larr;
                </Button>
              </div>
              <div className={classes.clientList}>
                <h3 className={classes.title}>Assigned Clients</h3>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(e) =>
                        e.target.checked
                          ? handleSelectAll("assigned")
                          : handleDeselectAll()
                      }
                    />
                  }
                  label="Select All"
                />
                {assignedClients.map((client) => (
                  <div key={client.id} className={classes.clientItem}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedClients.includes(client.id)}
                          onChange={() => handleCheckboxChange(client.id)}
                        />
                      }
                      label={`${client.first_name} ${client.last_name}`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className={classes.btnWrapper}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateAssignments}
                className={classes.updateBtn}
              >
                Update Assignments
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignClients;
