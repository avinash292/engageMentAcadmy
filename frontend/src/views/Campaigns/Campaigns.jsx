import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  CircularProgress,
  Button,
  Snackbar,
  Tooltip,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import $ from "jquery";
import "datatables.net";
import Swal from "sweetalert2";
import useStyles from "./CampaignsStyle";
import API from "../../axios/axiosApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faBullhorn,
  faEdit,
  faEye,
  faCircleInfo,
  faPlay, // Added
  // faCircle, // Added
  // faBarsProgress,
  faSpinner,
  // faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";

const Campaigns = ({ history }) => {
  const classes = useStyles();
  const { id, name } = useParams();
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const tableRef = useRef(null);
  const [listCounts, setListCounts] = useState({});

  // New state to track running campaigns
  const [runningCampaigns, setRunningCampaigns] = useState({});

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
    return `${day}-${month}-${year}`;
  };

  // function formatTimeWithAmPm(dateString) {
  //   const date = new Date(dateString);
  //   // Adjusting for the UTC time offset
  //   let hours = date.getUTCHours();
  //   const minutes = date.getUTCMinutes();
  //   const ampm = hours >= 12 ? "PM" : "AM";
  //   hours = hours % 12;
  //   hours = hours ? hours : 12; // the hour '0' should be '12'
  //   const minutesStr = minutes < 10 ? "0" + minutes : minutes;
  //   return `${hours}:${minutesStr} ${ampm}`;
  // }

  const formatTimeWithAmPm = (dateString, timeZone) => {
    const date = new Date(dateString);
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: timeZone,
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const fetchTableData = useCallback(async () => {
    setLoading(true);

    try {
      let response = [];

      if (id) {
        response = await API.get(`getAllCampaigns/${id}`);
      } else {
        response = await API.get(`getAllCampaigns`);
      }
      setLoading(false);
      if (response.data.result) {
        console.log("campaign data", response.data.result);
        setTableData(response.data.result);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  }, [id]);

  const fetchCampaignDetails = async (campaignId) => {
    setLoading(true);
    try {
      const response = await API.get(`getCampaignDetails/${campaignId}`);
      setLoading(false);
      if (response.data.success) {
        setSelectedCampaign(response.data.result);
        setModalOpen(true);
      } else {
        handleSnackToggle("Failed to fetch campaign details", "error");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching campaign details:", error);
      handleSnackToggle("Error fetching campaign details", "error");
    }
  };

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

  const handleDelete = async (id) => {
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
        const response = await API.delete(`deleteCampaign/${id}`);
        if (response.status === 200) {
          handleSnackToggle("Campaign deleted successfully", "success");
          window.location.reload();
        } else {
          handleSnackToggle("Error deleting campaign", "error");
        }
      } catch (error) {
        console.error("Error following:", error);
        handleSnackToggle("Error deleting campaign", "error");
      } finally {
        setLoading(false);
        setOverlayVisible(false);
      }
    }
  };

  const getLeadsCount = useCallback(async (ids) => {
    let contactIds = ids.id;
    try {
      const response = await API.get("/getLeadsCount", {
        params: { ids: contactIds }, // Ensure the array is serialized
      });

      if (response.data.success) {
        const totalLeads = response.data.result;
        return totalLeads;
      } else {
        console.error("Error fetching lead count:", response.data.message);
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    async function fetchListCounts() {
      const counts = {};
      for (let row of tableData) {
        counts[row.id] = await getLeadsCount(
          JSON.parse(row.selectedContactLists)
        ); // assuming getLeadsCount takes an id as parameter
      }
      setListCounts(counts);
    }
    if (tableData.length > 0) {
      fetchListCounts();
    }
  }, [tableData, getLeadsCount]);

  // New function to handle running campaigns
  const handleRun = async (campaignId) => {
    // Disable the run button for this campaign
    const { isConfirmed } = await Swal.fire({
      title: `Are you sure you want to Run this Campaign?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Run!",
    });

    if (isConfirmed) {
      try {
        setRunningCampaigns((prev) => ({ ...prev, [campaignId]: true }));
        // Send campaignRunningStatus as part of the request body
        const response = await API.post(`updateRunningStatus/${campaignId}`, {
          campaignRunningStatus: 1,
        });

        if (response.status === 200 && response.data.success) {
          // handleSnackToggle("Campaign is now running", "success");
          // Update the campaignStatus to indicate it's running
          setTableData((prevData) =>
            prevData.map((campaign) =>
              campaign.id === campaignId
                ? { ...campaign, campaignRunningStatus: 1 }
                : campaign
            )
          );
        } else {
          handleSnackToggle("Failed to run campaign", "error");
          setRunningCampaigns((prev) => ({ ...prev, [campaignId]: false }));
        }
      } catch (error) {
        console.error("Error running campaign:", error);
        handleSnackToggle("Error running campaign", "error");
        setRunningCampaigns((prev) => ({ ...prev, [campaignId]: false }));
      } finally {
        // Re-enable the run button after the operation
        // setRunningCampaigns((prev) => ({ ...prev, [campaignId]: false }));
      }
    } else {
      // Re-enable the run button if the user cancels the confirmation dialog
      setRunningCampaigns((prev) => ({ ...prev, [campaignId]: false }));
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
            <h2>
              {id ? (
                <Link to={`/Clients`} className={classes.userLink}>
                  {name} /
                </Link>
              ) : (
                ""
              )}
              &nbsp;Campaigns
            </h2>
            <Link to={id ? `/CreateCampaign/${id}/${name}` : `/CreateCampaign`}>
              <Tooltip title="Create Campaigns List">
                <Button
                  variant="outlined"
                  color="success"
                  className={classes.addButton}
                >
                  <span className={classes.buttonSpan}>
                    {" "}
                    <FontAwesomeIcon icon={faBullhorn} />
                  </span>
                  Create Campaigns
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
                <th>Campaigns Name</th>
                <th>Agent</th>
                <th>Caller</th>
                <th>Client Name</th>
                <th>Contact List</th>
                <th>No. of Contacts</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tableData.length === 0 ? (
                <tr>
                  <td colSpan={12} align="center">
                    No records available
                  </td>
                </tr>
              ) : (
                tableData.map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.campaignName}</td>
                    <td>{JSON.parse(row.vapiAgent).name}</td>
                    <td>{JSON.parse(row.callerId).name}</td>
                    <td>{JSON.parse(row.selectedUserList).name}</td>
                    <td>
                      {row.selectedContactLists ? (
                        <p key={row.selectedContactLists.id}>
                          <Link
                            to={`/lead/${JSON.parse(row.selectedUserList).id}/${
                              JSON.parse(row.selectedUserList).name
                            }/${JSON.parse(row.selectedContactLists).id}/${
                              JSON.parse(row.selectedContactLists).name
                            }/${row.campaignName}`}
                            style={{
                              textDecoration: "none",
                              color: "royalblue",
                            }}
                          >
                            {JSON.parse(row.selectedContactLists).name}
                          </Link>
                        </p>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td>
                      {listCounts[row.id] !== undefined ? (
                        <Link
                          to={`/lead/${JSON.parse(row.selectedUserList).id}/${
                            JSON.parse(row.selectedUserList).name
                          }/${listCounts[row.id].ids}/${
                            JSON.parse(row.selectedContactLists).name
                          }/${row.campaignName}`}
                          style={{ textDecoration: "none", color: "royalblue" }}
                        >
                          {listCounts[row.id].totalLeadCount}
                        </Link>
                      ) : (
                        0
                      )}
                    </td>
                    <td>{formatDate(row.startDate)}</td>
                    <td>{formatDate(row.endDate)}</td>
                    <td>{row.campaignStatus ? "On" : "Off"}</td>
                    <td>{formatDate(row.createdAt)}</td>
                    <td>
                      <div className={classes.buttonDiv}>
                        {/* Run Button */}
                        <span className={classes.buttonSpan}>
                          {row.campaignRunningStatus === 1 ? (
                            <Tooltip title="Running Campaign">
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faSpinner}
                                  style={{
                                    color: "orange",
                                    marginRight: "4px",
                                  }}
                                />
                                <span>Running</span>
                              </div>
                            </Tooltip>
                          ) : runningCampaigns[row.id] ? (
                            <Tooltip title="Running Campaign">
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faSpinner}
                                  style={{
                                    color: "orange",
                                    marginRight: "4px",
                                  }}
                                />
                                <span>Running</span>
                              </div>
                            </Tooltip>
                          ) : (
                            <Tooltip title="Run Campaign">
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleRun(row.id)}
                              >
                                <FontAwesomeIcon
                                  icon={faPlay}
                                  style={{ color: "green", marginRight: "4px" }}
                                />
                                <span>Run</span>
                              </div>
                            </Tooltip>
                          )}
                        </span>

                        {/* Existing Action Buttons */}
                        <span className={classes.buttonSpan}>
                          <Tooltip title="View detail">
                            <FontAwesomeIcon
                              icon={faCircleInfo}
                              style={{ color: "coral", cursor: "pointer" }}
                              onClick={() => fetchCampaignDetails(row.id)}
                            />
                          </Tooltip>
                        </span>
                        <span className={classes.buttonSpan}>
                          <Link
                            to={`/CallLogDetail/${row.id}/${row.campaignName}`}
                          >
                            <Tooltip title="See Log">
                              <FontAwesomeIcon
                                icon={faEye}
                                style={{ color: "green" }}
                              />
                            </Tooltip>
                          </Link>
                        </span>
                        {/* Edit Button */}
                        <span className={classes.buttonSpan}>
                          <Link
                            to={`/editCampaign/${row.id}/${id}/${name}`}
                            style={{
                              pointerEvents:
                                row.campaignRunningStatus === 1 ||
                                runningCampaigns[row.id]
                                  ? "none"
                                  : "auto",
                            }}
                          >
                            <Tooltip title="Edit">
                              <FontAwesomeIcon
                                icon={faEdit}
                                style={{
                                  color: "blue",
                                  cursor:
                                    row.campaignRunningStatus === 1 ||
                                    runningCampaigns[row.id]
                                      ? "not-allowed"
                                      : "pointer",
                                }}
                              />
                            </Tooltip>
                          </Link>
                        </span>

                        {/* Delete Button */}
                        <span className={classes.buttonSpan}>
                          <Tooltip title="Delete Campaign">
                            <FontAwesomeIcon
                              icon={faTrash}
                              style={{
                                color: "red",
                                cursor:
                                  row.campaignRunningStatus === 1 ||
                                  runningCampaigns[row.id]
                                    ? "not-allowed"
                                    : "pointer",
                                pointerEvents:
                                  row.campaignRunningStatus === 1 ||
                                  runningCampaigns[row.id]
                                    ? "none"
                                    : "auto",
                              }}
                              onClick={
                                !(
                                  row.campaignRunningStatus === 1 ||
                                  runningCampaigns[row.id]
                                )
                                  ? () => handleDelete(row.id)
                                  : null
                              }
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
      {/* Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="campaign-details-title"
        aria-describedby="campaign-details-description"
      >
        <Box className={classes.modalStyle}>
          {selectedCampaign && (
            <div className={classes.modalContent}>
              <div className={classes.modalColumn}>
                <Typography variant="h6" id="campaign-details-title">
                  Campaign Details
                </Typography>
                <hr style={{ background: "turquoise" }}></hr>
                <ul>
                  <li>
                    <span>
                      <b>Campaign Name:</b>
                    </span>{" "}
                    <span>{selectedCampaign.campaignName}</span>
                  </li>
                  <li>
                    <span>
                      <b>Internal Notes:</b>
                    </span>{" "}
                    <span>{selectedCampaign.internalNotes}</span>
                  </li>
                  <li>
                    <span>
                      <b>Campaign Status:</b>
                    </span>{" "}
                    <span>
                      {selectedCampaign.campaignStatus ? "On" : "Off"}
                    </span>
                  </li>
                  <li>
                    <span>
                      <b>Client:</b>
                    </span>{" "}
                    <span>
                      {JSON.parse(selectedCampaign.selectedUserList).name}
                    </span>
                  </li>
                  <li>
                    <span>
                      <b>Vapi Agent:</b>
                    </span>{" "}
                    <span>{JSON.parse(selectedCampaign.vapiAgent).name}</span>
                  </li>
                  <li>
                    <span>
                      <b>Caller Number:</b>
                    </span>{" "}
                    <span>{JSON.parse(selectedCampaign.callerId).name}</span>
                  </li>
                  <li>
                    <span>
                      <b>Contact List:</b>
                    </span>

                    {selectedCampaign.selectedContactLists ? (
                      <p
                        key={selectedCampaign.selectedContactLists.id}
                        style={{
                          borderBottom: "2px solid turquoise",
                          width: "fit-content",
                        }}
                      >
                        <Link
                          to={`/lead/${
                            JSON.parse(selectedCampaign.selectedUserList).id
                          }/${
                            JSON.parse(selectedCampaign.selectedUserList).name
                          }/${
                            JSON.parse(selectedCampaign.selectedContactLists).id
                          }`}
                          style={{
                            textDecoration: "none",
                            color: "black",
                          }}
                        >
                          {
                            JSON.parse(selectedCampaign.selectedContactLists)
                              .name
                          }
                        </Link>
                      </p>
                    ) : (
                      "N/A"
                    )}
                  </li>
                  <li>
                    <span>
                      <b>Verified Do Not Call List:</b>
                    </span>{" "}
                    <span>{selectedCampaign.dncList ? "On" : "Off"}</span>
                  </li>
                  <li>
                    <span>
                      <b>No. Of call per minutes:</b>
                    </span>{" "}
                    <span>
                      {selectedCampaign.calls_per_minute
                        ? selectedCampaign.calls_per_minute
                        : "--"}
                    </span>
                  </li>
                </ul>
              </div>
              <div className={classes.modalColumn}>
                <Typography variant="h6">Additional Details</Typography>
                <hr style={{ background: "turquoise" }}></hr>
                <ul>
                  <li>
                    <span>
                      <b>Start Date:</b>
                    </span>{" "}
                    <span>{formatDate(selectedCampaign.startDate)}</span>
                  </li>
                  <li>
                    <span>
                      <b>End Date:</b>
                    </span>{" "}
                    <span>{formatDate(selectedCampaign.endDate)}</span>
                  </li>
                  <li>
                    <span>
                      <b>Time Zone:</b>
                    </span>{" "}
                    <span>
                      {JSON.parse(selectedCampaign.timeZone).friendlyName}
                    </span>
                  </li>
                  <li>
                    <span>
                      <b>Daily Start Time:</b>
                    </span>{" "}
                    <span>
                      {formatTimeWithAmPm(
                        selectedCampaign.dailyStartTime,
                        JSON.parse(selectedCampaign.timeZone).id // Ensure 'id' holds the time zone identifier
                      )}
                    </span>
                  </li>
                  <li>
                    <span>
                      <b>Daily End Time:</b>
                    </span>{" "}
                    <span>
                      {formatTimeWithAmPm(
                        selectedCampaign.dailyEndTime,
                        JSON.parse(selectedCampaign.timeZone).id // Ensure 'id' holds the time zone identifier
                      )}
                    </span>
                  </li>
                  <li>
                    <span>
                      <b>Days:</b>
                    </span>{" "}
                    <span className="wrap">
                      {JSON.parse(selectedCampaign.daysOfWeek).replace(
                        /[^a-zA-Z,]/g,
                        ""
                      )}
                    </span>
                  </li>
                  <li>
                    <span>
                      <b>Created At:</b>
                    </span>{" "}
                    <span>{formatDate(selectedCampaign.createdAt)}</span>
                  </li>
                  <li>
                    <span>
                      <b>Updated At:</b>
                    </span>{" "}
                    <span>{formatDate(selectedCampaign.updatedAt)}</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Campaigns;
