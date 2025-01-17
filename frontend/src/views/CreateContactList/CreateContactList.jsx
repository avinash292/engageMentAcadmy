import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  CircularProgress,
  Button,
  Snackbar,
  Checkbox,
  TextField,
  TextareaAutosize,
  Tooltip,
} from "@mui/material";
import $ from "jquery";
import "datatables.net";
import useStyles from "./CreateContactListStyle";
import { Link } from "react-router-dom";
import API from "../../axios/axiosApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faUpload } from "@fortawesome/free-solid-svg-icons";

const CreateContactList = ({ history }) => {
  const classes = useStyles();
  const { id, name, contact_list_id } = useParams();
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [contactName, setContactName] = useState("");
  const [description, setDescription] = useState("");
  const [oldLead, setOldLead] = useState("");
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
      if (contact_list_id) {
        response = await API.get(
          `getAllAvailableNumbers/${id}/${contact_list_id}`
        );
        if (response.data.result) {
          const contactListData = await API.get(
            `getContactListDetail/${contact_list_id}`
          );
          setContactName(contactListData.data.result.list_name);
          setDescription(contactListData.data.result.description);
          let leaddata = JSON.parse(
            JSON.parse(contactListData.data.result.leads)
          );
          setOldLead(leaddata);
          setSelectedRows(leaddata);
        }
      } else {
        response = await API.get(`getAllNumbersForCreateList/${id}`);
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
  }, [id, contact_list_id]);

  useEffect(() => {
    fetchTableData();
  }, [fetchTableData]);

  useEffect(() => {
    if (tableData.length > 0 && tableRef.current) {
      const table = $(tableRef.current).DataTable({
        responsive: true,
        destroy: true,
        columnDefs: [
          { orderable: false, targets: [0, 4, 5] }, // Disable sorting on the first column
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

  const handleSelectAllChange = (event) => {
    const { checked } = event.target;
    setSelectAll(checked);
    if (checked) {
      setSelectedRows(tableData.map((row) => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelectChange = (id) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(id)) {
        return prevSelectedRows.filter((rowId) => rowId !== id);
      } else {
        return [...prevSelectedRows, id];
      }
    });
  };

  const handleCreate = async () => {
    if (!contactName) {
      handleSnackToggle("Enter a valid contact list name", "error");
      return;
    }
    if (!description) {
      handleSnackToggle("Description is required", "error");
      return;
    }
    // if (selectedRows.length === 0) {
    //   handleSnackToggle("At least one Contact must be selected", "error");
    //   return;
    // }

    // Data to be sent to the API
    const contactListData = {
      list_name: contactName,
      description: description,
      userid: id, // Replace with actual user ID if necessary
      leads: selectedRows,
      oldLead: oldLead,
    };

    try {
      console.log(contactListData);
      setLoading(true);
      if (contact_list_id) {
        console.log("update APi called", contactListData);
        const response = await API.put(
          `updateContactList/${contact_list_id}`,
          contactListData
        );
        if (response.status === 200) {
          handleSnackToggle("Contact list created successfully", "success");
          history.push(`/contactList/${id}/${name}`);
        } else {
          handleSnackToggle("List Name already exists!", "error");
        }
      } else {
        const response = await API.post("createContactList", contactListData);
        if (response.status === 200) {
          handleSnackToggle("Contact list created successfully", "success");
          history.push(`/contactList/${id}/${name}`);
        } else {
          handleSnackToggle("List Name already exists!", "error");
        }
      }
    } catch (error) {
      console.error("Error creating contact list:", error);
      handleSnackToggle("Error creating contact list", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.container}>
      {loading && <CircularProgress className={classes.loading} />}
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
              <Link to={`/Clients`} className={classes.userLink}>
                {name}
              </Link>{" "}
              {contact_list_id
                ? "/ Edit Contact List "
                : "/ Create Contact List "}
            </h2>
            <div>
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
          <div className={classes.inputContainer}>
            <TextField
              label="List Name*"
              variant="outlined"
              placeholder="Enter list name"
              fullWidth
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className={classes.textField}
            />
            <TextareaAutosize
              minRows={3}
              placeholder="Description*"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={classes.textarea}
            />
          </div>
          <table
            id="usersTable"
            className="display"
            style={{ width: "100%" }}
            ref={tableRef}
          >
            <thead>
              <tr>
                <th>
                  <Checkbox
                    checked={selectAll}
                    onChange={handleSelectAllChange}
                  />
                </th>
                <th>Serial No.</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Country</th>
                <th>Created At</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {tableData.length === 0 ? (
                <tr>
                  <td colSpan={9} align="center">
                    No records available
                  </td>
                </tr>
              ) : (
                tableData.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <Checkbox
                        checked={selectedRows.includes(row.id)}
                        onChange={() => handleRowSelectChange(row.id)}
                      />
                    </td>
                    <td>{index + 1}</td>
                    <td>{row.name}</td>
                    <td>{row.phone}</td>
                    <td>{row.status}</td>
                    <td>{row.country}</td>
                    <td>{formatDate(row.createdAt)}</td>
                    <td>{formatDate(row.updatedAt)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreate}
            className={classes.createButton}
          >
            {contact_list_id ? "Update List" : "Save List"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateContactList;
