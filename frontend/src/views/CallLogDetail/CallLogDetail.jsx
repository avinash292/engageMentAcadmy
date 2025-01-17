import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
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
import useStyles from "./CallLogDetailStyle";
import { useParams } from "react-router-dom";
import API from "../../axios/axiosApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEye } from "@fortawesome/free-solid-svg-icons";
import Papa from "papaparse"; // For CSV export
import { saveAs } from "file-saver"; // For saving the CSV file
const CallLogDetail = ({ history }) => {
  const classes = useStyles();
  const { id, campaignName } = useParams();
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [callDetails, setcallDetails] = useState(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const tableRef = useRef(null);

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

  // const formatDateTime = (dateString) => {
  //   const date = new Date(dateString);
  //   const day = String(date.getDate()).padStart(2, "0");
  //   const month = String(date.getMonth() + 1).padStart(2, "0");
  //   const year = date.getFullYear();

  //   let hours = date.getHours();
  //   const minutes = String(date.getMinutes()).padStart(2, "0");
  //   const ampm = hours >= 12 ? "PM" : "AM";
  //   hours = hours % 12 || 12; // Convert 24-hour time to 12-hour time

  //   return `${month}-${day}-${year}, ${hours}:${minutes} ${ampm}`;
  // };

  const fetchTableData = useCallback(async () => {
    setLoading(true);
    setOverlayVisible(true);
    try {
      const response = await API.get(`getAllCallLogDetail/${id}`);
      setLoading(false);
      setOverlayVisible(false);
      if (response.data.result) {
        setTableData(response.data.result);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
      handleSnackToggle("Error fetching data. Please try again.", "error");
    }
  }, [id, handleSnackToggle]);

  const fetchCallDetails = async (call_id) => {
    setLoading(true);
    try {
      const response = await API.get(`getCallDetails/${call_id}`);
      console.log(response);
      setLoading(false);
      if (response.data.success) {
        setcallDetails(response.data.result);
        setModalOpen(true);
      } else {
        handleSnackToggle("Failed to fetch campaign details", "error");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching campaign details:", error);
      handleSnackToggle("Error fetching campaign details", "error");
    } finally {
      setLoading(false);
      setOverlayVisible(false);
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

// const downloadCSV = () => {
//   if (callDetails) {
//     const csvData = [
//       {
//         "Call ID": call_id,
//         "Assistant ID": callDetails.assistantId,
//         "Phone Number ID": callDetails.phoneNumberId,
//         Type: callDetails.type,
//         "Start Time": formatDate(callDetails.startTime),
//         "End Time": formatDate(callDetails.endTime),
//         Status: callDetails.status,
//         "End Reason": callDetails.endedReason,
//         "Customer Name": callDetails.customer.name,
//         "Customer Phone Number": callDetails.customer.number,
//         Transcript: callDetails.transcript,
//         Summary: callDetails.summary,
//         "Mono Recording URL": callDetails.monoRecordingUrl,
//         "Stereo Recording URL": callDetails.stereoRecordingUrl,
//         "Total Cost": callDetails.totalCost,
//         "Transport Cost": callDetails.transportCost,
//         "STT Cost": callDetails.sttCost,
//         "LLM Cost": callDetails.llmCost,
//         "TTS Cost": callDetails.ttsCost,
//         "VAPI Cost": callDetails.vapiCost,
//         "Messages": callDetails.messages, // Assuming messages can be concatenated or detailed in separate rows
//         "Call Analysis Summary": callDetails.callAnalysisSummary,
//         "Success Evaluation": callDetails.successEvaluation,
//         Provider: callDetails.provider,
//         "Provider Call ID": callDetails.providerCallId,
//         "Creation Time": formatDate(callDetails.createdAt),
//         "Last Update Time": formatDate(callDetails.updatedAt),
//         "Organization ID": callDetails.organizationId,
//       },
//     ];

//     const csv = Papa.unparse(csvData);
//     const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
//     saveAs(blob, `CallDetails_${call_id}.csv`);
//   }
// };

// Utility function to format date and time
const formatDate1 = (dateTime) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return new Date(dateTime).toLocaleString("en-US", options);
};
const downloadJSON = () => {
  if (callDetails) {
    // Convert the callDetails to JSON format
    const jsonData = JSON.stringify(callDetails, null, 2); // Adding indentation for readability

    // Create a Blob from the JSON data
    const blob = new Blob([jsonData], { type: "application/json;charset=utf-8" });

    // Trigger download using the FileSaver library
    saveAs(blob, `CallDetails_${callDetails.id}.json`);
  }
};

// Function to download call details as JSON
  // const downloadJSON = () => {
  //   const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
  //     JSON.stringify(callDetails, null, 2)
  //   )}`;
  //   const downloadAnchorNode = document.createElement("a");
  //   downloadAnchorNode.setAttribute("href", dataStr);
  //   downloadAnchorNode.setAttribute("download", "call_details.json");
  //   document.body.appendChild(downloadAnchorNode);
  //   downloadAnchorNode.click();
  //   downloadAnchorNode.remove();
  // };

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
                {"Campaign : "}
                <Link
                  to={`/Campaigns/${id}/${campaignName}`}
                  className={classes.userLink}
                >
                  {campaignName}
                </Link>
              </>{" "}
              / Call Details
            </h2>
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
                <th>Number</th>
                <th>Call ID</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tableData.length === 0 ? (
                <tr>
                  <td colSpan={11} align="center">
                    No records available
                  </td>
                </tr>
              ) : (
                tableData.map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.name}</td>
                    <td>{row.number}</td>
                    <td>{row.call_id}</td>
                    <td>{formatDate(row.created_at)}</td>
                    <td>
                      <div className={classes.buttonDiv}>
                        <span className={classes.buttonSpan}>
                          <Tooltip title="View detail">
                            <Button
                              variant="outlined"
                              color="success"
                              onClick={() => fetchCallDetails(row.call_id)}
                            >
                              <FontAwesomeIcon icon={faEye} />
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
      {/* Modal */}
      {/* Modal */}
      <Modal
  open={modalOpen}
  onClose={() => setModalOpen(false)}
  aria-labelledby="call-details-title"
  aria-describedby="call-details-description"
>
  <Box className={classes.modalStyle}>
    {callDetails && (
      <div className={classes.modalContent}>
        {/* Call Details */}
        <Typography variant="h6" id="call-details-title">
          Call Details
        </Typography>
        <hr style={{ background: "turquoise", gridColumn: "span 2" }} />

        {/* General Call Information */}
        <Typography
          variant="subtitle1"
          className={`${classes.sectionTitle} ${classes.centeredHeading}`}
        >
          General Call Information
        </Typography>
        <div>
          <b>Call ID:</b> {callDetails.id || "N/A"}
        </div>
        <div>
          <b>Assistant ID:</b> {callDetails.assistantId || "N/A"}
        </div>
        <div>
          <b>Phone Number ID:</b> {callDetails.phoneNumberId || "N/A"}
        </div>
        <div>
          <b>Call Type:</b> {callDetails.type || "N/A"}
        </div>
        <div>
          <b>Start Time:</b> {callDetails.startedAt ? formatDate1(callDetails.startedAt) : "00"}
        </div>
        <div>
          <b>End Time:</b> {callDetails.endedAt ? formatDate1(callDetails.endedAt) : "00"}
        </div>
        <div>
          <b>Status:</b> {callDetails.status || "N/A"}
        </div>
        <div>
          <b>Reason for Ending:</b> {callDetails.endedReason || "N/A"}
        </div>

        <hr style={{ gridColumn: "span 2" }} />

        {/* Customer Information */}
        <Typography
          variant="subtitle1"
          className={`${classes.sectionTitle} ${classes.centeredHeading}`}
        >
          Customer Information
        </Typography>
        <div>
          <b>Customer Name:</b> {callDetails.customer?.name || "N/A"}
        </div>
        <div>
          <b>Customer Phone Number:</b> {callDetails.customer?.number || "N/A"}
        </div>

        <hr style={{ gridColumn: "span 2" }} />

        {/* Transcript and Summary */}
        <Typography
          variant="subtitle1"
          className={`${classes.sectionTitle} ${classes.centeredHeading}`}
        >
          Transcript and Summary
        </Typography>
        <div style={{ gridColumn: "span 2" }}>
          <b>Transcript:</b> {callDetails.transcript || "N/A"}
        </div>
        <div style={{ gridColumn: "span 2" }}>
          <b>Summary:</b> {callDetails.summary || "N/A"}
        </div>

        <hr style={{ gridColumn: "span 2" }} />

        {/* Recording Information */}
        <Typography
          variant="subtitle1"
          className={`${classes.sectionTitle} ${classes.centeredHeading}`}
        >
          Recording Information
        </Typography>
        <div>
          <b>Recording URL (Mono):</b>{" "}
          {callDetails.recordingUrl ? (
            <a
              href={callDetails.recordingUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Mono Recording
            </a>
          ) : (
            "N/A"
          )}
        </div>
        <div>
          <b>Recording URL (Stereo):</b>{" "}
          {callDetails.stereoRecordingUrl ? (
            <a
              href={callDetails.stereoRecordingUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Stereo Recording
            </a>
          ) : (
            "N/A"
          )}
        </div>

        <hr style={{ gridColumn: "span 2" }} />

        {/* Call Costs */}
        <Typography
          variant="subtitle1"
          className={`${classes.sectionTitle} ${classes.centeredHeading}`}
        >
          Call Costs
        </Typography>
        <div>
          <b>Total Cost:</b> {callDetails.cost || "00"}
        </div>
        <div>
          <b>Cost Breakdown:</b>
          <ul>
            <li>Transport: {callDetails.costBreakdown?.transport || "00"}</li>
            <li>STT: {callDetails.costBreakdown?.stt || "00"}</li>
            <li>LLM: {callDetails.costBreakdown?.llm || "00"}</li>
            <li>TTS: {callDetails.costBreakdown?.tts || "00"}</li>
            <li>VAPI: {callDetails.costBreakdown?.vapi || "00"}</li>
          </ul>
        </div>

        <hr style={{ gridColumn: "span 2" }} />
          {/* Conversation Details */}
     <Typography variant="subtitle1" className={`${classes.sectionTitle} ${classes.centeredHeading}`}>
  Conversation Details
</Typography>

{/* Display system messages */}
<div style={{ gridColumn: "span 2" }}>
  {callDetails && callDetails.messages && callDetails.messages.length > 0 ? (
    callDetails.messages.map((message, index) => (
      message.role === "system" && (
        <div key={index} className={classes.messageItemSystem}>
          <div className={classes.messageSystem}>
            <div className={classes.messageDetailSystem}>
              <b>Role:</b> {message.role || "N/A"}
            </div>
            <div className={classes.messageDetail}>
              <b>Timestamp:</b> {message.time ? formatDate(message.time) : "N/A"}
            </div>
            {message.endTime && (
              <div className={classes.messageDetail}>
                <b>End Time:</b> {formatDate(message.endTime)}
              </div>
            )}
            <div className={classes.messageDetail}>
              <b>Message:</b> {message.message || "N/A"}
            </div>
            {message.duration && (
              <div className={classes.messageDetail}>
                <b>Duration:</b> {message.duration.toFixed(2)} seconds
              </div>
            )}
            <div className={classes.messageDetail}>
              <b>Seconds from Start:</b> {message.secondsFromStart || "N/A"}
            </div>
          </div>
          <hr />
        </div>
      )
    ))
  ) : (
    <div className={classes.noMessages}><b>Messages:</b> N/A</div>
  )}
</div>

{/* Display non-system messages */}
<div className={classes.messageList}>
  {callDetails && callDetails.messages && callDetails.messages.length > 0 ? (
    callDetails.messages.map((message, index) => (
      message.role !== "system" && (
        <div key={index} className={classes.messageItem}>
          <div className={classes.messageDetailContainer}>
            <div className={classes.messageDetail}>
              <b>Role:</b> {message.role || "N/A"}
            </div>
            <div className={classes.messageDetail}>
              <b>Timestamp:</b> {message.time ? formatDate(message.time) : "N/A"}
            </div>
            {message.endTime && (
              <div className={classes.messageDetail}>
                <b>End Time:</b> {formatDate(message.endTime)}
              </div>
            )}
            <div className={classes.messageDetail}>
              <b>Message:</b> {message.message || "N/A"}
            </div>
            {message.duration && (
              <div className={classes.messageDetail}>
                <b>Duration:</b> {message.duration.toFixed(2)} seconds
              </div>
            )}
            <div className={classes.messageDetail}>
              <b>Seconds from Start:</b> {message.secondsFromStart || "N/A"}
            </div>
          </div>
          <hr />
        </div>
      )
    ))
  ) : null}
</div>    

<hr style={{ gridColumn: "span 2" }} />
        {/* Analysis Data */}
        <Typography
          variant="subtitle1"
          className={`${classes.sectionTitle} ${classes.centeredHeading}`}
        >
          Analysis Data
        </Typography>
        <div>
          <b>Call Analysis Summary:</b> {callDetails.analysis?.summary || "N/A"}
        </div>
        <div>
          <b>Success Evaluation:</b>{" "}
          {callDetails.successEvaluation !== undefined
            ? callDetails.successEvaluation
              ? "Successful"
              : "Not Successful"
            : "N/A"}
        </div>

        <hr style={{ gridColumn: "span 2" }} />

        {/* Provider Information */}
        <Typography
          variant="subtitle1"
          className={`${classes.sectionTitle} ${classes.centeredHeading}`}
        >
          Provider Information
        </Typography>
        <div>
          <b>Call Provider:</b> {callDetails.phoneCallProvider || "N/A"}
        </div>
        <div>
          <b>Provider Call ID:</b> {callDetails.phoneCallProviderId || "N/A"}
        </div>

        <hr style={{ gridColumn: "span 2" }} />

        {/* Miscellaneous */}
        <Typography
          variant="subtitle1"
          className={`${classes.sectionTitle} ${classes.centeredHeading}`}
        >
          Miscellaneous
        </Typography>
        <div>
          <b>Creation Time:</b> {callDetails.createdAt ? formatDate1(callDetails.createdAt) : "00"}
        </div>
        <div>
          <b>Last Update Time:</b> {callDetails.updatedAt ? formatDate1(callDetails.updatedAt) : "00"}
        </div>
        <div>
          <b>Organization ID:</b> {callDetails.orgId || "N/A"}
        </div>

        <hr style={{ gridColumn: "span 2" }} />

        {/* Download JSON */}
        <Button
          variant="contained"
          color="primary"
          onClick={downloadJSON}
          className={classes.jsonButton}
        >
          Download JSON
        </Button>
      </div>
    )}
  </Box>
</Modal>


    </div>
  );
};

export default CallLogDetail;
