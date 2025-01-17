import React, { useState, useEffect, useCallback } from "react";
import {
  TextField,
  FormControlLabel,
  Switch,
  Button,
  Snackbar,
  Box,
  Typography,
  Alert,
  CircularProgress,
  Paper,
  Tooltip,
  Grid,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useStyles from "./AccountSettingsStyle"; // Create this style file
import API from "../../axios/axiosApi";
import { useParams } from "react-router-dom";

const ClientAccountSettings = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id, name } = useParams();
  const [loading, setLoading] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [ghlEnabled, setGhlEnabled] = useState(false);
  const [vapiEnabled, setVapiEnabled] = useState(false);
  const [twilioEnabled, setTwilioEnabled] = useState(false);
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

  const [formData, setFormData] = useState({
    ghlApiKey: "",
    ghlEnabled: false,
    vapiApiKey: "",
    vapiEnabled: false,
    twilioSID: "",
    twilioSecreteKey: "",
    twilioEnabled: false,
    internalNotes: "",
    email: "",
    phone: "",
  });

  // Fetch client details on mount
  useEffect(() => {
    const fetchClientDetails = async () => {
      setLoading(true);
      try {
        const response = await API.get(`get_user_details/${id}`);
        const clientData = response.data.data.user_details;
        console.log("client info", clientData);
        setFormData({
          ghlApiKey: clientData.ghlApiKey || "",
          ghlEnabled: clientData.syncLead || false,
          vapiEnabled: clientData.vapiEnabled || false,
          vapiApiKey: clientData.vapiApiKey || "",
          twilioSID: clientData.twilioSID || "",
          twilioSecreteKey: clientData.twilioSecreteKey || "",
          twilioEnabled: clientData.twilioEnabled || false,
          internalNotes: clientData.internalNotes || "",
          email: clientData.email || "",
          phone: clientData.mobile || "",
        });
        setGhlEnabled(clientData.syncLead);
        setVapiEnabled(clientData.vapiEnabled);
        setTwilioEnabled(clientData.twilioEnabled);
      } catch (error) {
        handleSnackToggle("Failed to fetch client details", "error");
      } finally {
        setLoading(false);
        setOverlayVisible(false);
      }
    };

    fetchClientDetails();
  }, [id, handleSnackToggle]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggleChange = (e) => {
    // console.log("toggle event", e.target.name);
    switch (e.target.name) {
      case "ghlEnabled":
        setGhlEnabled((prev) => !prev);
        break;
      case "vapiEnabled":
        setVapiEnabled((prev) => !prev);
        break;
      case "twilioEnabled":
        setTwilioEnabled((prev) => !prev);
        break;
      default:
        break;
    }
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form data", formData);
    setLoading(true);
    try {
      const response = await API.put(`save_user_settings/${id}`, formData);
      if (response.data.success) {
        handleSnackToggle("Settings saved successfully", "success");
        // history.push(`/lead/${id}/${name}`);
      } else {
        handleSnackToggle("Failed to save settings", "error");
      }
    } catch (error) {
      handleSnackToggle("Failed to save settings", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.container}>
      {loading && <CircularProgress className={classes.loading} />}
      {overlayVisible && <div className={classes.overlay} />}
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
      <Paper className={classes.paper} style={{ marginTop: "25px" }}>
        <div className={classes.header}>
          <Typography variant="h6">
            <span className={classes.userLink}>{name} </span> / Account Settings
          </Typography>
          <Tooltip title="Go Back">
            <Button
              variant="outlined"
              color="primary"
              className={classes.backButton}
              onClick={() => history.goBack()}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              <span className={classes.buttonText}>Back</span>
            </Button>
          </Tooltip>
        </div>

        <form onSubmit={handleSubmit} className={classes.form}>
          <Box className={classes.section}>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              disabled
              className={classes.textFieldMargin}
            />
            <Typography variant="caption" className={classes.description}>
              The email address associated with the client account.
            </Typography>
          </Box>
          <Box className={classes.section}>
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              fullWidth
              className={classes.textFieldMargin}
            />
            <Typography variant="caption" className={classes.description}>
              The phone number associated with the client account.
            </Typography>
          </Box>
          <Box className={classes.section}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={8}>
                <Typography variant="body1">GHL Data</Typography>
                <Typography variant="caption">
                  Toggle to enable or disable GHL data for this client.
                </Typography>
              </Grid>
              <Grid item xs={4} textAlign={"right"}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={ghlEnabled}
                      onChange={handleToggleChange}
                      name="ghlEnabled"
                    />
                  }
                  labelPlacement="start"
                  style={{ marginLeft: "0" }}
                />
              </Grid>
            </Grid>

            <TextField
              label="GHL Api Key"
              name="ghlApiKey"
              value={formData.ghlApiKey}
              onChange={handleInputChange}
              required
              fullWidth
              disabled={!ghlEnabled}
              className={classes.textFieldMargin}
            />
            <Typography variant="caption" className={classes.description}>
              The API key for GHL integration.
            </Typography>
          </Box>
          <Box className={classes.section}>
            {" "}
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={8}>
                <Typography variant="body1">VAPI Data</Typography>
                <Typography variant="caption">
                  Toggle to enable or disable VAPI data for this client.
                </Typography>
              </Grid>
              <Grid item xs={4} textAlign={"right"}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={vapiEnabled}
                      onChange={handleToggleChange}
                      name="vapiEnabled"
                    />
                  }
                  labelPlacement="start"
                  style={{ marginLeft: "0" }}
                />
              </Grid>
            </Grid>
            <TextField
              label="VAPI Api Key"
              name="vapiApiKey"
              value={formData.vapiApiKey}
              onChange={handleInputChange}
              required
              fullWidth
              disabled={!vapiEnabled}
              className={classes.textFieldMargin}
            />
            <Typography variant="caption" className={classes.description}>
              The API key for VAPI integration.
            </Typography>
          </Box>

          <Box className={classes.section}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={8}>
                <Typography variant="body1">Twilio Data</Typography>
                <Typography variant="caption">
                  Toggle to enable or disable VAPI data for this client.
                </Typography>
              </Grid>
              <Grid item xs={4} textAlign={"right"}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={twilioEnabled}
                      onChange={handleToggleChange}
                      name="twilioEnabled"
                    />
                  }
                  labelPlacement="start"
                  style={{ marginLeft: "0" }}
                />
              </Grid>
            </Grid>

            <TextField
              label="Twilio SID"
              name="twilioSID"
              value={formData.twilioSID}
              onChange={handleInputChange}
              required
              fullWidth
              disabled={!twilioEnabled}
              className={classes.textFieldMargin}
            />
            <Typography variant="caption" className={classes.description}>
              The SID for Twilio integration.
            </Typography>
            <TextField
              label="Twilio Secret Key"
              name="twilioSecreteKey"
              value={formData.twilioSecreteKey}
              onChange={handleInputChange}
              required
              disabled={!twilioEnabled}
              fullWidth
              className={classes.textFieldMargin}
            />

            <Typography variant="caption" className={classes.description}>
              The secret key for Twilio integration.
            </Typography>
          </Box>
          <Box className={classes.section}>
            <TextField
              label="Internal Client Notes"
              name="internalNotes"
              value={formData.internalNotes}
              onChange={handleInputChange}
              multiline
              rows={4}
              fullWidth
              className={classes.textFieldMargin}
            />
            <Typography variant="caption" className={classes.description}>
              Notes about the client for internal use.
            </Typography>
          </Box>
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Save Settings
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  );
};

export default ClientAccountSettings;
