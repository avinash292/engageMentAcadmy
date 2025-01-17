import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Button, Tooltip } from "@mui/material";
import Snackbar from "@material-ui/core/Snackbar";
import $ from "jquery";
import "datatables.net";
import useStyles from "./UsersListStyle";
import Swal from "sweetalert2";
import API from "../../axios/axiosApi";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPlus,
  faList,
  faTrash,
  faEdit,
  faBullhorn,
  faUserCog,
} from "@fortawesome/free-solid-svg-icons";

const UsersList = ({ history }) => {
  const classes = useStyles();
  const tableRef = useRef(null);
  const userData = localStorage.getItem("user_data");
  const { user_id, name } = useParams();
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
      let response;
      if (JSON.parse(userData).role === "superadmin" && !user_id) {
        response = await API.get("getAllUsers");
      } else {
        response = await API.get(
          `getAllUsers/${user_id ? user_id : JSON.parse(userData).user_id}`
        );
      }
      if (response.data.data) {
        // console.log("response.data.data", response.data.data);
        setTableData(response.data.data);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
      // handleSnackToggle("Error fetching data. Please try again.", "error");
    } finally {
      setLoading(false);
      setOverlayVisible(false);
    }
  }, [userData, user_id]);

  useEffect(() => {
    fetchTableData();
  }, [fetchTableData]);

  useEffect(() => {
    if (tableData.length > 0 && tableRef.current) {
      const table = $(tableRef.current).DataTable({
        responsive: true,
        destroy: true,
      });
      return () => {
        table.destroy();
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
            <h2>
              {name && (
                <>
                  {JSON.parse(userData).role === "superadmin"
                    ? "Team member : "
                    : "Client : "}
                  <Link to={`/TeamMembers`} className={classes.userLink}>
                    {name} / &nbsp;
                  </Link>
                </>
              )}
              Clients
            </h2>
            <div>
              {JSON.parse(userData).role === "superadmin" ? (
                <>
                  {user_id && (
                    <span className={classes.buttonSpan}>
                      <Link to={`/assignClients/${user_id}/${name}`}>
                        <Tooltip title="Assign Clients">
                          <Button
                            variant="outlined"
                            color="primary"
                            className={classes.addButton}
                          >
                            <span className={classes.buttonSpan}>
                              <FontAwesomeIcon icon={faUserCog} />
                            </span>
                            Assign Clients
                          </Button>
                        </Tooltip>
                      </Link>
                    </span>
                  )}

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
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          <table
            id="usersTable"
            className="display"
            style={{ width: "100%" }}
            ref={tableRef}
          >
            <thead>
              <tr>
                <th>Serial No.</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Mobile</th>
                
                <th>Created At</th>
                <th>
                  List / view / Campaign
                  {JSON.parse(userData).role === "superadmin"
                    ? "/ Edit / Delete"
                    : ""}
                </th>
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
                    <td>{formatDate(row.createdAt)}</td>
                    <td style={{ textAlign: "center" }}>
                      <div className={classes.buttonDiv}>
                        <span className={classes.buttonSpan}>
                          <Link
                            to={`/contactList/${row.id}/${row.first_name} ${row.last_name}`}
                          >
                            <Tooltip title="Contact Lists">
                              <FontAwesomeIcon
                                icon={faList}
                                style={{
                                  color:
                                    row.contactListCount > 0
                                      ? "green"
                                      : "orange",
                                }}
                              />
                            </Tooltip>
                          </Link>
                        </span>
                        <span className={classes.buttonSpan}>
                          <Link
                            to={`/lead/${row.id}/${row.first_name} ${row.last_name}`}
                          >
                            <Tooltip title="View Contacts">
                              <FontAwesomeIcon
                                icon={faEye}
                                style={{ color: "green" }}
                              />
                            </Tooltip>
                          </Link>
                        </span>
                        <span className={classes.buttonSpan}>
                          <Link
                            to={`/Campaigns/${row.id}/${row.first_name} ${row.last_name}`}
                          >
                            <Tooltip title="View campaigns">
                              <FontAwesomeIcon
                                icon={faBullhorn}
                                style={{
                                  color:
                                    row.campaignCount > 0
                                      ? "lightseagreen"
                                      : "black",
                                }}
                              />
                            </Tooltip>
                          </Link>
                        </span>
                        {JSON.parse(userData).role === "superadmin" ? (
                          <>
                            <span className={classes.buttonSpan}>
                              <Link to={`/editClient/${row.id}/Client`}>
                                <Tooltip title="Edit Client">
                                  <FontAwesomeIcon
                                    icon={faEdit}
                                    style={{ color: "blue" }}
                                  />
                                </Tooltip>
                              </Link>
                            </span>
                            <span>
                              <Tooltip title="Delete Client">
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  style={{ color: "red" }}
                                  onClick={() => handleDelete(row.id)}
                                />
                              </Tooltip>
                            </span>
                          </>
                        ) : (
                          ""
                        )}
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

export default UsersList;
