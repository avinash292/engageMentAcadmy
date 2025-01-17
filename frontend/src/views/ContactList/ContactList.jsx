import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Button, Snackbar, Tooltip } from "@mui/material";
import $ from "jquery";
import "datatables.net";
import { Link } from "react-router-dom";
import useStyles from "./ContactListStyle";
import Swal from "sweetalert2";
import API from "../../axios/axiosApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faList, faEdit } from "@fortawesome/free-solid-svg-icons";

const ContactList = ({ history }) => {
  const classes = useStyles();
  const { id, name } = useParams();
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const tableRef = useRef(null); // Ref to store the DataTable instance

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
      const response = await API.get(`getAllContactList/${id}`);
      setLoading(false);
      if (response.data.result) {
        console.log(response.data.result);
        setTableData(response.data.result);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
      // handleSnackToggle("Error fetching data. Please try again.", "error");
    }
  }, [id]);

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

  const handleDelete = async (contact_list_id) => {
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
        console.log("contact_list_id", contact_list_id);
        const response = await API.delete(
          `deletecontactList/${contact_list_id}`
        );
        if (response.status === 200) {
          handleSnackToggle("Contact deleted successfully", "success");
          window.location.reload();
        } else {
          console.log(response.data.message);
          handleSnackToggle(response.data.message, "error");
        }
      } catch (error) {
        console.error("Error following:", error);
        handleSnackToggle("Error deleting Contact", "error");
      } finally {
        setLoading(false);
        setOverlayVisible(false);
      }
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

  return (
    <div className={classes.container}>
      {loading && <CircularProgress className={classes.loading} />}
      {overlayVisible && <div className={classes.overlay} />} {/* Overlay */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snack.open}
        onClose={() => setSnack({ ...snack, open: false })}
        autoHideDuration={6000}
        message={snack.message}
        severity={snack.severity}
      />
      <div className={classes.tableContainerDiv}>
        <div className={classes.tableContainer}>
          <div className={classes.btnContainer}>
            <h2>
              <>
                {"Client : "}
                <Link to={`/Clients`} className={classes.userLink}>
                  {name}
                </Link>
                / Contact List
              </>
            </h2>
            <Link to={`/CreateContactList/${id}/${name}`}>
              <Tooltip title="Create Contact List">
                <Button
                  variant="outlined"
                  color="success"
                  className={classes.addButton}
                >
                  <span className={classes.buttonSpan}>
                    {" "}
                    <FontAwesomeIcon icon={faList} />
                  </span>
                  Create Contact List
                </Button>
              </Tooltip>
            </Link>
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
                <th>Contact List Name</th>
                <th>Description</th>
                <th>No. of Contacts</th>
                <th>Campaign</th>
                <th>Date Of Creation</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tableData.length === 0 ? (
                <tr>
                  <td colSpan={8} align="center">
                    No records available
                  </td>
                </tr>
              ) : (
                tableData.map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.list_name}</td>
                    <td>{row.description}</td>
                    <td>
                      <Link
                        to={`/lead/${id}/${name}/${row.contact_list_id}/${row.list_name}`}
                        style={{ textDecoration: "none", color: "royalblue" }}
                      >
                        <Tooltip title="View Contacts">
                          {JSON.parse(JSON.parse(row.leads)).length}
                        </Tooltip>
                      </Link>
                    </td>
                    <td>
                      {row.campaign_name !== "N/A" ? (
                        <Link
                          to={`/editCampaign/${row.campaignId}/${id}/${name}`}
                          style={{ textDecoration: "none", color: "royalblue" }}
                        >
                          {row.campaign_name}
                        </Link>
                      ) : (
                        <Link
                          to={`/CreateCampaign/${id}/${name}`}
                          style={{ textDecoration: "none", color: "royalblue" }}
                        >
                          N/A
                        </Link>
                      )}
                    </td>
                    <td>{formatDate(row.createdAt)}</td>
                    <td>
                      <div className={classes.buttonDiv}>
                        <span className={classes.buttonSpan}>
                          <Link
                            to={`/editContactList/${id}/${name}/${row.contact_list_id}`}
                          >
                            <Tooltip title="Edit">
                              <Button variant="outlined" color="primary">
                                <FontAwesomeIcon icon={faEdit} />
                              </Button>
                            </Tooltip>
                          </Link>
                        </span>
                        <span className={classes.buttonSpan}>
                          <Tooltip title="Delete Contact list">
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => handleDelete(row.contact_list_id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </Button>
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

export default ContactList;
