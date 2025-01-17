import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Button, Snackbar, Tooltip } from "@mui/material";
import $ from "jquery";
import "datatables.net";
import useStyles from "./NumbersListStyle";
import { Link } from "react-router-dom";
import API from "../../axios/axiosApi";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faList,
  faUpload,
  faSync,
} from "@fortawesome/free-solid-svg-icons";
const NumbersList = () => {
  const classes = useStyles();
  const { id, name, contactList, contactListName, campaignName } = useParams();
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

  const fetchTableData = useCallback(async () => {
    setLoading(true);
    try {
      let response;
      if (contactList) {
        console.log(contactList);
        response = await API.get(`getAllNumbers/${id}/${contactList}`);
        console.log(response);
      } else {
        response = await API.get(`getAllNumbers/${id}`);
        console.log(response);
      }
      setLoading(false);
      if (response.data.result) {
        setTableData(response.data.result);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
      // handleSnackToggle("Error fetching data. Please try again.", "error");
    }
  }, [id, contactList]);

  useEffect(() => {
    fetchTableData();
  }, [fetchTableData]);

  useEffect(() => {
    if (tableData.length > 0 && tableRef.current) {
      const table = $(tableRef.current).DataTable({
        responsive: true,
        destroy: true,
        columnDefs: [
          { orderable: false, targets: [0, 3, 4] }, // Disable sorting on the first column
        ],
      });

      $("#usersTable thead th").each(function() {
        const title = $(this).text();
        if (title === "Status") {
          $(this).html(
            `Status <select class="filter-select"><option value="">All</option></select>`
          );
        }
        if (title === "Country") {
          $(this).html(
            `Country <select class="filter-country"><option value="">All</option></select>`
          );
        }
      });

      const uniqueStatuses = [...new Set(tableData.map((item) => item.status))];
      const uniqueCountries = [
        ...new Set(tableData.map((item) => item.country)),
      ];
      uniqueStatuses.forEach((status) => {
        $(".filter-select").append(
          `<option value="${status}">${status}</option>`
        );
      });

      uniqueCountries.forEach((country) => {
        $(".filter-country").append(
          `<option value="${country}">${country}</option>`
        );
      });

      $(".filter-select").on("change", function() {
        table
          .column(4)
          .search($(this).val())
          .draw();
      });
      $(".filter-country").on("change", function() {
        table
          .column(5)
          .search($(this).val())
          .draw();
      });

      return () => {
        table.destroy();
      };
    }
  }, [tableData]);

  const handleDelete = async (phone, ghl_contact_id) => {
    // Show Swal confirmation dialog
    const { isConfirmed } = await Swal.fire({
      title: `Are you sure you want to delete ${phone}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    // Proceed with deletion if confirmed
    if (isConfirmed) {
      setLoading(true);
      setOverlayVisible(true);

      try {
        const response = await API.delete(
          `deletePhone/${id}/${phone}/${ghl_contact_id}`
        );
        if (response.status === 200) {
          handleSnackToggle("Contact deleted successfully", "success");
          window.location.reload();
        } else {
          handleSnackToggle("Error deleting Contact", "error");
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

  const handleSync = async (id) => {
    // console.log(id);
    setLoading(true);
    setOverlayVisible(true);
    try {
      const response = await API.get(`syncToGhl/${id}`);
      if (response.status === 200) {
        handleSnackToggle("All Contacts Sync successfully", "success");
        window.location.reload();
      } else {
        handleSnackToggle(response.data.message, "error");
      }
    } catch (error) {
      console.error("Error following:", error);
      handleSnackToggle("Error Contacts Sync", "error");
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
        onClose={() => setSnack({ ...snack, open: false })}
        autoHideDuration={6000}
        message={snack.message}
        severity={snack.severity}
      />
      <div className={classes.tableContainerDiv}>
        <div className={classes.tableContainer}>
          <div className={classes.btnContainer}>
            <h2 style={{ fontSize: "initial" }}>
              <Link to={`/Clients`} className={classes.userLink}>
                {name}
              </Link>
              {campaignName && (
                <>
                  {" / Campaign: "}
                  <Link
                    to={`/Campaigns/${id}/${name}`}
                    className={classes.userLink}
                  >
                    {campaignName}
                  </Link>
                </>
              )}
              {contactList && (
                <>
                  {" / Contact List: "}
                  <Link
                    to={`/contactList/${id}/${name}`}
                    className={classes.userLink}
                  >
                    {contactListName}
                  </Link>
                </>
              )}
              {" / Contacts"}
            </h2>
            <div>
              <span className={classes.buttonSpan}>
                <Tooltip title="Sync Contacts To GHL">
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.addButton}
                    onClick={() => handleSync(id)}
                  >
                    <span className={classes.buttonSpan}>
                      {" "}
                      <FontAwesomeIcon icon={faSync} />
                    </span>
                    Sync To GHl
                  </Button>
                </Tooltip>
              </span>
              <span className={classes.buttonSpan}>
                <Link to={`/dashboard/${id}/${name}`}>
                  <Tooltip title="Upload New Contacts">
                    <Button
                      variant="outlined"
                      color="primary"
                      className={classes.addButton}
                    >
                      <span className={classes.buttonSpan}>
                        {" "}
                        <FontAwesomeIcon icon={faUpload} />
                      </span>
                      Add Contacts
                    </Button>
                  </Tooltip>
                </Link>
              </span>
              <Link to={`/contactList/${id}/${name}`}>
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
                    Contact List
                  </Button>
                </Tooltip>
              </Link>
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
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Status</th>
                <th>Country</th>
                <th>GHL Status</th>
                <th>Created At</th>
                <th>Updated At</th>
                {!contactList ? (
                  <>
                    <th>List</th>
                    <th>Action</th>
                  </>
                ) : (
                  ""
                )}
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
                    <td>{row.name}</td>
                    <td>{row.phone}</td>
                    <td>{row.email ? row.email : "--"}</td>
                    <td>{row.status}</td>
                    <td>{row.country ? row.country : "--"}</td>
                    <td>{row.ghl_contact_id ? "Yes" : "No"}</td>
                    <td>{formatDate(row.createdAt)}</td>
                    <td>{formatDate(row.updatedAt)}</td>
                    {!contactList ? (
                      <>
                        <td>
                          {row.list_name ? (
                            <Link
                              to={`/contactList/${id}/${name}`}
                              style={{ textDecoration: "none", color: "royalblue" }}
                            >
                              {row.list_name}
                            </Link>
                          ) : (
                            <Link
                              to={`/CreateContactList/${id}/${name}`}
                              style={{ textDecoration: "none", color: "royalblue" }}
                            >
                              --
                            </Link>
                          )}
                        </td>
                        <td>
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() =>
                              handleDelete(row.phone, row.ghl_contact_id)
                            }
                            title="Delete"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </td>
                      </>
                    ) : (
                      ""
                    )}
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

export default NumbersList;
