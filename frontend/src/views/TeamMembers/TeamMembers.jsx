import React, { useState, useEffect, useCallback } from "react";

import { CircularProgress, Button, Tooltip } from "@mui/material";
import Snackbar from "@material-ui/core/Snackbar";
import $ from "jquery";
import "datatables.net";
import useStyles from "./TeamMembersStyle";
import Swal from "sweetalert2";
import API from "../../axios/axiosApi";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPlus,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

const TeamMembers = ({ history }) => {
  const classes = useStyles();
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [overlayVisible, setOverlayVisible] = useState(false);

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
  const handleSnackToggle = useCallback((message, severity) => {
    setSnack({
      open: true,
      message: message || "",
      severity: severity || "success",
    });
  }, []);
  const fetchTableData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await API.get(`getTeamMembers`);

      if (response.data.data) {
        // console.log("response.data.data", response.data.data);
        setTableData(response.data.data);
        setTimeout(() => {
          $("#usersTable").DataTable();
          setLoading(false);
        }, 100);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
      // handleSnackToggle("Error fetching data. Please try again.", "error");
    }
  }, []);

  useEffect(() => {
    fetchTableData();
  }, [fetchTableData]);

  useEffect(() => {
    if (tableData.length > 0) {
      const dataTable = $("#usersTable").DataTable();
      return () => {
        dataTable.destroy(true);
      };
    }
  }, [tableData]);

  const handleDelete = async (user_id) => {
    const { isConfirmed } = await Swal.fire({
      title: `Are you sure you want to delete ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (isConfirmed) {
      setLoading(true);
      setOverlayVisible(true);

      try {
        const response = await API.put(`deleteUser/${user_id}`);
        if (response.status === 200) {
          handleSnackToggle("User deleted successfully", "success");
          window.location.reload();
        } else {
          handleSnackToggle("Error deleting user", "error");
        }
      } catch (error) {
        console.error("Error following:", error);
        handleSnackToggle("Error deleting user", "error");
      } finally {
        setLoading(false);
        setOverlayVisible(false);
      }
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
      <div className={classes.tableContainerDiv}>
        <div className={classes.tableContainer}>
          <div className={classes.btnContainer}>
            <h2>Team Members</h2>
            <Link to={`/addMember/Member`}>
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
                  Add Members
                </Button>
              </Tooltip>
            </Link>
          </div>
          <table id="usersTable" className="display" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Serial No.</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>No. of Clients</th>
                <th>Created At</th>
                <th>Edit / Delete</th>{" "}
                {/* This should be added for the "All Contacts" button */}
              </tr>
            </thead>
            <tbody>
              {tableData.length === 0 ? (
                <tr>
                  <td colSpan={6} align="center">
                    No records available
                  </td>
                </tr>
              ) : (
                tableData.map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.first_name}</td>
                    <td>{row.last_name}</td>
                    <td>{row.email}</td>
                    <td>{row.mobile}</td>
                    <td>
                      <Link
                        to={`/Clients/${row.id}/${row.first_name} ${row.last_name}`}
                        style={{ textDecoration: "none", color: "royalblue" }}
                      >
                        {row.clientCount}
                      </Link>
                    </td>
                    <td>{formatDate(row.createdAt)}</td>
                    <td style={{ textAlign: "center" }}>
                      <div className={classes.buttonDiv}>
                        <span className={classes.buttonSpan}>
                          <Link to={`/editMember/${row.id}/Member`}>
                            <Tooltip title="Edit Member">
                              <FontAwesomeIcon
                                icon={faEdit}
                                style={{ color: "blue" }}
                              />
                            </Tooltip>
                          </Link>
                        </span>
                        <span>
                          <Tooltip title="Delete Member">
                            <FontAwesomeIcon
                              icon={faTrash}
                              style={{ color: "red" }}
                              onClick={() => handleDelete(row.id)}
                            />
                          </Tooltip>
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;
