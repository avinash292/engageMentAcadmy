import React, { useState, useEffect, useCallback } from "react";
import {
  TextField,
  TextareaAutosize,
  FormControl,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
  Switch,
  Grid,
  Box,
  CircularProgress,
  Snackbar,
  Autocomplete,
  Tooltip,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import useStyles from "./CreateCampaignStyle";
import { Link } from "react-router-dom";
import API from "../../axios/axiosApi";
import moment from "moment-timezone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

const CreateCampaign = ({ history }) => {
  const classes = useStyles();
  const { id, name, campaignid } = useParams();
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [campaignName, setCampaignName] = useState("");
  const [internalNotes, setInternalNotes] = useState("");
  const [contactLists, setContactLists] = useState([]);
  const [userLists, setUserLists] = useState([]);
  const [selectedContactLists, setSelectedContactLists] = useState(null);
  const [selectedUserList, setSelectedUserList] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [timeZone, setTimeZone] = useState(null);
  const [dailyStartTime, setDailyStartTime] = useState(null);
  const [dailyEndTime, setDailyEndTime] = useState(null);
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [vapiAgent, setVapiAgent] = useState(null);
  const [vapiAgents, setVapiAgents] = useState([]);
  const [callerId, setCallerId] = useState(null);
  const [callerNumbers, setcallerNumbers] = useState([]);
  const [callsPerMinute, setCallsPerMinute] = useState("");
  const [dncList, setDncList] = useState(false);
  const [campaignStatus, setCampaignStatus] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [overlayVisible] = useState(false);
  const handleSnackToggle = useCallback((message, severity) => {
    setSnack({
      open: true,
      message: message || "",
      severity: severity || "success",
    });
  }, []);

  const handleDaysOfWeekChange = (event) => {
    const value = event.target.name;
    setDaysOfWeek((prev) =>
      prev.includes(value)
        ? prev.filter((day) => day !== value)
        : [...prev, value]
    );
  };

  const handleSelectAllDaysChange = (event) => {
    if (event.target.checked) {
      setDaysOfWeek(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
    } else {
      setDaysOfWeek([]);
    }
  };

  const handleContactListChange = async (event, value) => {
    if (value) {
      const checkContactList = await API.get(`checkContactList/${value.id}`);
      let checkContact = checkContactList.data.result;
      if (!checkContact) {
        setSelectedContactLists(value);
        if (value) {
          setShowForm(true);
        } else {
          setShowForm(false);
        }
      } else {
        handleSnackToggle(
          "Error Selected Contact List Already in Use!. Choose another ",
          "error"
        );
        // return false;
      }
    } else {
      setSelectedContactLists([]);
      setShowForm(false);
    }
  };

  useEffect(() => {
    if (selectedContactLists === null) {
      setShowForm(false);
    }
  }, [selectedContactLists]);

  const handleUserListChange = async (event, value) => {
    setSelectedUserList(value);
    // console.log("event", event);
  };

  const handleTimeZoneChange = (event, value) => {
    setTimeZone(value);
  };

  const handleVapiAgentChange = (event, value) => {
    setVapiAgent(value);
  };

  const handleCallerNumberChange = (event, value) => {
    setCallerId(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const convertToTimeZone = (time, timeZone) => {
      return moment(time)
        .tz(timeZone)
        .format();
    };

    const campaignData = {
      campaignName,
      internalNotes,
      startDate,
      endDate,
      timeZone,
      dailyStartTime: timeZone
        ? convertToTimeZone(dailyStartTime, timeZone.friendlyName)
        : dailyStartTime,
      dailyEndTime: timeZone
        ? convertToTimeZone(dailyEndTime, timeZone.friendlyName)
        : dailyEndTime,
      // dailyStartTime,
      // dailyEndTime,
      daysOfWeek,
      vapiAgent,
      callerId,
      callsPerMinute,
      dncList,
      campaignStatus,
      selectedContactLists,
      selectedUserList,
    };
    console.log("Campaign Data:", campaignData);
    // Add API call to save campaign data
    if (!campaignName) {
      handleSnackToggle("Campaign name is required", "error");
      return;
    }

    if (!dailyStartTime) {
      handleSnackToggle("Daily start Time is required", "error");
      return;
    }

    if (!dailyEndTime) {
      handleSnackToggle("Daily End Time is required", "error");
      return;
    }
    if (!timeZone) {
      handleSnackToggle("Time Zone  is required", "error");
      return;
    }

    if (!selectedUserList) {
      handleSnackToggle("Client is required", "error");
      return;
    }
    if (selectedContactLists.length === 0) {
      handleSnackToggle("At least one Contact List must be selected", "error");
      return;
    }
    if (!vapiAgent) {
      handleSnackToggle("Vapi Agent is required", "error");
      return;
    }

    if (!callerId) {
      handleSnackToggle("caller Number is required", "error");
      return;
    }

    try {
      // console.log(campaignData);
      setLoading(true);
      if (campaignid) {
        console.log("update APi called", campaignData);
        const response = await API.put(
          `updateCampaignData/${campaignid}`,
          campaignData
        );
        if (response.data.success) {
          handleSnackToggle(response.data.message, "success");
          history.push(`/Campaigns/${id}/${name}`);
        } else {
          handleSnackToggle(response.data.message, "error");
        }
      } else {
        const response = await API.post("createCampaign", campaignData);
        console.log("testing", response);
        if (response.data.success) {
          handleSnackToggle(response.data.message, "success");
          history.push(`/Campaigns/${id}/${name}`);
        } else {
          handleSnackToggle(response.data.message, "error");
        }
      }
    } catch (error) {
      console.error("Error creating contact list:", error);
      handleSnackToggle("Error creating contact list", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchVapiAgent = useCallback(async () => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer 1a4920fa-e1ef-4451-a726-e4d172999737"
    );
    myHeaders.append(
      "Cookie",
      "_cfuvid=s4qSv8ltYvZ8iGbu5o38kFsaNtx3Svaa9PGTmU2pogo-1717135368593-0.0.1.1-604800000"
    );

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://api.vapi.ai/assistant",
        requestOptions
      );
      const result = await response.json();
      // console.log(result);
      if (Array.isArray(result)) {
        const formattedData = result.map((agent) => ({
          id: agent.id,
          name: agent.name,
        }));
        setVapiAgents(formattedData);
      }
    } catch (error) {
      setLoading(true);
      console.error("Error fetching data:", error);
      // handleSnackToggle("Error fetching data. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCallerNumber = useCallback(async () => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer 1a4920fa-e1ef-4451-a726-e4d172999737"
    );
    myHeaders.append(
      "Cookie",
      "_cfuvid=s4qSv8ltYvZ8iGbu5o38kFsaNtx3Svaa9PGTmU2pogo-1717135368593-0.0.1.1-604800000"
    );

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://api.vapi.ai/phone-number",
        requestOptions
      );
      const result = await response.json();
      // console.log(result);
      if (Array.isArray(result)) {
        const formattedData = result.map((agent) => ({
          id: agent.id,
          name: agent.number,
        }));
        setcallerNumbers(formattedData);
      }
    } catch (error) {
      setLoading(true);
      console.error("Error fetching data:", error);
      // handleSnackToggle("Error fetching data. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUserList = useCallback(async () => {
    setLoading(true);
    console.log("campaignId", campaignid);
    try {
      if (name) {
        const formattedData = [{ id, name }];
        const userList = { id, name };
        setUserLists(formattedData);
        setSelectedUserList(userList);
      }
    } catch (error) {
      console.error("Error fetching user list:", error);
      // handleSnackToggle("Error fetching user list. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  }, [id, name, campaignid]);

  const fetchCampaignData = useCallback(
    async (campaignId) => {
      try {
        const response = await API.get(`getCampaignDetails/${campaignId}`);
        setShowForm(true);
        if (response.data.success) {
          setLoading(true);
          const compaignData = response.data.result;
          console.log("compaignData", compaignData);
          setCampaignName(compaignData.campaignName);
          setInternalNotes(compaignData.internalNotes);
          setSelectedContactLists(
            JSON.parse(compaignData.selectedContactLists)
          );
          setSelectedUserList(JSON.parse(compaignData.selectedUserList));
          // console.log("userList", selectedUserList);
          // handleUserListChange(
          //   "testing",
          //   JSON.parse(compaignData.selectedUserList)
          // );
          setStartDate(new Date(compaignData.startDate));
          setEndDate(new Date(compaignData.endDate));
          setTimeZone(JSON.parse(compaignData.timeZone));
          // setDailyStartTime(compaignData.dailyStartTime);
          // setDailyEndTime(compaignData.dailyEndTime);
          setDailyStartTime(moment(compaignData.dailyStartTime).toDate());
          setDailyEndTime(moment(compaignData.dailyEndTime).toDate());
          setDaysOfWeek(JSON.parse(JSON.parse(compaignData.daysOfWeek)));
          setVapiAgent(JSON.parse(compaignData.vapiAgent));
          setVapiAgents(JSON.parse(compaignData.vapiAgent));
          setCallerId(JSON.parse(compaignData.callerId));
          setcallerNumbers(JSON.parse(compaignData.callerId));
          setCallsPerMinute(compaignData.callsPerMinute);
          setDncList(compaignData.dncList);
          setCampaignStatus(compaignData.campaignStatus);
        } else {
          handleSnackToggle("Failed to fetch campaign details", "error");
        }
      } catch (error) {
        console.error("Error fetching campaign details:", error);
        handleSnackToggle("Error fetching campaign details", "error");
      } finally {
        setLoading(false);
      }
    },
    [handleSnackToggle, setSelectedContactLists]
  );

  const fetchContactList = useCallback(async () => {
    // console.log("userID", id);
    if (id) {
      try {
        const response = await API.get(`getAllContactList/${id}`);
        if (response.data.result) {
          const formattedContactLists = response.data.result.map((user) => ({
            id: user.contact_list_id,
            name: user.list_name,
          }));
          setContactLists(formattedContactLists);
        } else {
          setContactLists([]);
        }
      } catch (error) {
        console.error("Error fetching contact lists:", error);
        // handleSnackToggle("Error fetching contact lists. Please try again.", "error");
      }
    } else {
      setContactLists([]);
    }
  }, [id]);

  useEffect(() => {
    if (campaignid) {
      fetchCampaignData(campaignid);
    }
    fetchUserList();
    fetchContactList();
    fetchVapiAgent();
    fetchCallerNumber();
  }, [
    fetchUserList,
    fetchContactList,
    fetchVapiAgent,
    fetchCallerNumber,
    campaignid,
    fetchCampaignData,
  ]);

  const timeZones = moment.tz.names().map((tz) => {
    const offset = moment.tz(tz).format("Z");
    return {
      friendlyName: `${tz} (UTC${offset})`,
      longTimezones: tz,
    };
  });

  const handleStartTimeChange = (newValue) => {
    console.log("Start Time Changed:", newValue);
    console.log("timeZone : ", timeZone);
    setDailyStartTime(newValue);
  };

  const handleEndTimeChange = (newValue) => {
    console.log("End Time Changed:", newValue);
    console.log("timeZone : ", timeZone);
    setDailyEndTime(newValue);
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box component="form" onSubmit={handleSubmit} sx={{ p: 4 }}>
              <div className={classes.btnContainer}>
                <h2>
                  {" "}
                  <Link to={`/Clients`} className={classes.userLink}>
                    {name} / &nbsp;
                  </Link>
                  {campaignid ? "Edit Campaign" : "Create Campaign"}
                </h2>
                <Link to={`/Campaigns/${id}/${name}`}>
                  <Tooltip title="Campaigns List">
                    <Button
                      variant="outlined"
                      color="success"
                      className={classes.addButton}
                    >
                      <span className={classes.buttonSpan}>
                        {" "}
                        <FontAwesomeIcon icon={faBullhorn} />
                      </span>
                      Campaigns
                    </Button>
                  </Tooltip>
                </Link>
              </div>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl fullWidth margin="normal">
                    <Autocomplete
                      options={userLists}
                      getOptionLabel={(option) => option.name}
                      value={selectedUserList}
                      onChange={handleUserListChange}
                      renderInput={(params) => (
                        <TextField {...params} label="Select Client*" />
                      )}
                      disabled
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth margin="normal">
                    <Autocomplete
                      options={contactLists}
                      getOptionLabel={(option) => option.name || ""}
                      onChange={handleContactListChange}
                      value={selectedContactLists}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select List"
                          required
                          variant="outlined"
                          fullWidth
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              {showForm && (
                <>
                  <TextField
                    label="Campaign Name*"
                    fullWidth
                    margin="normal"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                  />

                  <TextareaAutosize
                    minRows={3}
                    placeholder="Internal Notes*"
                    style={{
                      width: "100%",
                      padding: "16.5px 14px",
                      marginTop: "16px",
                    }}
                    value={internalNotes}
                    onChange={(e) => setInternalNotes(e.target.value)}
                  />

                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <FormControl fullWidth margin="normal">
                        <DatePicker
                          label="Campaign Start Date*"
                          value={startDate}
                          onChange={(newValue) => setStartDate(newValue)}
                          renderInput={(params) => (
                            <TextField {...params} fullWidth margin="normal" />
                          )}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                      <FormControl fullWidth margin="normal">
                        <DatePicker
                          label="Campaign End Date*"
                          value={endDate}
                          onChange={(newValue) => setEndDate(newValue)}
                          renderInput={(params) => (
                            <TextField {...params} fullWidth margin="normal" />
                          )}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                      <FormControl fullWidth margin="normal">
                        <Autocomplete
                          options={timeZones}
                          getOptionLabel={(option) => option.friendlyName}
                          value={timeZone}
                          onChange={handleTimeZoneChange}
                          renderInput={(params) => (
                            <TextField {...params} label="Time Zone*" />
                          )}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <FormControl fullWidth margin="normal">
                        <TimePicker
                          label="Daily Campaign Start Time"
                          value={dailyStartTime}
                          onChange={handleStartTimeChange}
                          renderInput={(params) => (
                            <TextField {...params} fullWidth margin="normal" />
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth margin="normal">
                        <TimePicker
                          label="Daily Campaign End Time"
                          value={dailyEndTime}
                          onChange={handleEndTimeChange}
                          renderInput={(params) => (
                            <TextField {...params} fullWidth margin="normal" />
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth margin="normal">
                        <FormGroup row>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={daysOfWeek.length === 7}
                                onChange={handleSelectAllDaysChange}
                              />
                            }
                            label="All Days"
                          />
                          {[
                            "Mon",
                            "Tue",
                            "Wed",
                            "Thu",
                            "Fri",
                            "Sat",
                            "Sun",
                          ].map((day) => (
                            <FormControlLabel
                              key={day}
                              control={
                                <Checkbox
                                  checked={daysOfWeek.includes(day)}
                                  onChange={handleDaysOfWeekChange}
                                  name={day}
                                />
                              }
                              label={day}
                            />
                          ))}
                        </FormGroup>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <FormControl fullWidth margin="normal">
                    <Autocomplete
                      options={vapiAgents}
                      getOptionLabel={(option) => option.name}
                      value={vapiAgent}
                      onChange={handleVapiAgentChange}
                      renderInput={(params) => (
                        <TextField {...params} label="VAPI Agent*" />
                      )}
                    />
                  </FormControl>

                  <FormControl fullWidth margin="normal">
                    <Autocomplete
                      options={callerNumbers}
                      getOptionLabel={(option) => option.name}
                      value={callerId}
                      onChange={handleCallerNumberChange}
                      renderInput={(params) => (
                        <TextField {...params} label="Caller number*" />
                      )}
                    />
                  </FormControl>

                  <TextField
                    label="Number of Calls per Minute"
                    fullWidth
                    margin="normal"
                    type="number"
                    value={callsPerMinute}
                    onChange={(e) => setCallsPerMinute(e.target.value)}
                  />

                  <FormControlLabel
                    control={
                      <Switch
                        checked={dncList}
                        onChange={(e) => setDncList(e.target.checked)}
                      />
                    }
                    label="Verified Do Not Call List"
                  />

                  <FormControlLabel
                    control={
                      <Switch
                        checked={campaignStatus}
                        onChange={(e) => setCampaignStatus(e.target.checked)}
                      />
                    }
                    label="Campaign Status"
                  />

                  <Button type="submit" variant="contained" color="primary">
                    {campaignid ? "Update Campaign" : "Save Campaign"}
                  </Button>
                </>
              )}
            </Box>
          </LocalizationProvider>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;
