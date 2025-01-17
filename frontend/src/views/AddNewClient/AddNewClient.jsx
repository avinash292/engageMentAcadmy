import React, { useState, useEffect, useCallback } from "react";
import validate from "validate.js";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { FormControlLabel, Switch } from "@mui/material";
import Alert from "@material-ui/lab/Alert";
import { SectionHeader } from "components/molecules";
import { Section } from "components/organisms";
import useStyles from "./AddNewClientStyle";
import API from "../../axios/axiosApi";
import { COMMON_ERR_MSG } from "../../config";
import { useParams } from "react-router-dom";

const schema = {
  email: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
    length: {
      maximum: 120,
    },
  },
  firstName: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 120,
    },
  },
  lastName: {
    length: {
      maximum: 120,
    },
  },
  password: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 128,
      minimum: 8,
    },
  },
  mobile: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 128,
      minimum: 8,
    },
  },
  password_confirmation: {
    presence: true,
    equality: {
      attribute: "password",
      message: "^Password and Confirm Password doesn't match.",
    },
  },
};

const AddNewClient = ({ history }) => {
  const classes = useStyles();
  const { id, action } = useParams();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [snack, setSnack] = useState({ open: false, message: "" });
  const [syncLead, setSyncLead] = useState(false);
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  const handleSnackToggle = useCallback((message) => {
    setSnack((snack) => ({ open: !snack.open, message: message || "" }));
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await API.get(`get_user_details/${id}`);
        console.log(response);
        if (response.data.success && response.data.data) {
          const userDetails = response.data.data.user_details;
          setFormState((prevFormState) => ({
            ...prevFormState,
            values: {
              firstName: userDetails.first_name,
              lastName: userDetails.last_name,
              email: userDetails.email,
              mobile: userDetails.mobile,
              syncLead: userDetails.syncLead,
              ghlApiKey: userDetails.ghlApiKey,
            },
            isValid: true, // Set form as valid when editing
          }));
          setSyncLead(userDetails.syncLead);
        }

        setLoading(false);
      } catch (error) {
        console.error("ERROR in fetchProfile:", error);
        setLoading(false);
        const errorMsg =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : COMMON_ERR_MSG;
        handleSnackToggle(errorMsg);
      }
    };

    fetchProfile();
  }, [id, handleSnackToggle]);

  useEffect(() => {
    if (!id) {
      const errors = validate(formState.values, schema);
      setFormState((formState) => ({
        ...formState,
        isValid: errors ? false : true,
        errors: errors || {},
      }));
    }
  }, [formState.values, id]);

  const handleChange = (event) => {
    event.persist();

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(snack);
    if (formState.isValid) {
      try {
        setLoading(true);
        let apiUrl;
        const postData = {
          ...formState.values,
          source: "email",
          syncLead: syncLead,
          action: action,
        };
        console.log(postData);
        if (id) {
          apiUrl = await API.put(`update_user_detail/${id}`, postData);
        } else {
          apiUrl = await API.post("addClient", postData);
        }
        const response = apiUrl;
        if (response.data.success) {
          setLoading(false);
           if (action === "Member") {
            history.push("/TeamMembers");
          } else {
            history.push("/Clients");
          }
        } else {
          const errorMsg = response.data.message || "Invalid Credentials";
          setErrorMessage(errorMsg);
        }
      } catch (error) {
        console.log("ERROR in handleSubmit:", error);
        setLoading(false);
        const errMsg =
          error.response && error.response.data
            ? error.response.data.message
            : COMMON_ERR_MSG;
        setErrorMessage(errMsg);
      }
    }
  };

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Section className={classes.section}>
        <div className={classes.formContainer}>
          <SectionHeader
            title={id ? `Edit ${action}` : `New ${action}`}
            titleProps={{
              variant: "h3",
            }}
          />
          {errorMessage && (
            <Alert className={classes.errorAlert} severity="error">
              {errorMessage}
            </Alert>
          )}
          <form
            className={classes.form}
            name="sign-up-form"
            method="post"
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <TextField
                  placeholder="First name"
                  label="First name"
                  variant="outlined"
                  size="medium"
                  name="firstName"
                  fullWidth
                  helperText={
                    hasError("firstName") ? formState.errors.firstName[0] : null
                  }
                  error={hasError("firstName")}
                  onChange={handleChange}
                  type="firstName"
                  value={formState.values.firstName || ""}
                  autoFocus
                  required
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  placeholder="Last name"
                  label="Last name"
                  variant="outlined"
                  size="medium"
                  name="lastName"
                  fullWidth
                  helperText={
                    hasError("lastName") ? formState.errors.lastName[0] : null
                  }
                  error={hasError("lastName")}
                  onChange={handleChange}
                  type="lastName"
                  value={formState.values.lastName || ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  placeholder="E-mail"
                  label="E-mail"
                  variant="outlined"
                  size="medium"
                  name="email"
                  fullWidth
                  helperText={
                    hasError("email") ? formState.errors.email[0] : null
                  }
                  error={hasError("email")}
                  onChange={handleChange}
                  type="email"
                  value={formState.values.email || ""}
                  disabled={id ? true : false}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  placeholder="Mobile-No"
                  label="Mobile"
                  variant="outlined"
                  size="medium"
                  name="mobile"
                  fullWidth
                  helperText={
                    hasError("mobile") ? formState.errors.mobile[0] : null
                  }
                  error={hasError("mobile")}
                  onChange={handleChange}
                  type="mobile"
                  value={formState.values.mobile || ""}
                  required
                />
              </Grid>
              {(syncLead || id) && action === "Client" && (
                <Grid item xs={12}>
                  <TextField
                    placeholder="Enter client's GHL API Key"
                    label="GHL Api Key"
                    variant="outlined"
                    size="medium"
                    name="ghlApiKey"
                    fullWidth
                    helperText={
                      hasError("ghlApiKey")
                        ? formState.errors.ghlApiKey[0]
                        : null
                    }
                    error={hasError("ghlApiKey")}
                    onChange={handleChange}
                    type="ghlApiKey"
                    value={formState.values.ghlApiKey || ""}
                  />
                </Grid>
              )}
              {id ? (
                ""
              ) : (
                <>
                  <Grid item xs={12}>
                    <TextField
                      placeholder="Password"
                      label="Password"
                      variant="outlined"
                      size="medium"
                      name="password"
                      fullWidth
                      helperText={
                        hasError("password")
                          ? formState.errors.password[0]
                          : null
                      }
                      error={hasError("password")}
                      onChange={handleChange}
                      type="password"
                      value={formState.values.password || ""}
                      autoComplete="new-password"
                      required
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      className={classes.textField}
                      error={hasError("password_confirmation")}
                      fullWidth
                      helperText={
                        hasError("password_confirmation")
                          ? formState.errors.password_confirmation[0]
                          : null
                      }
                      label="Confirm Password"
                      name="password_confirmation"
                      onChange={handleChange}
                      type="password"
                      value={formState.values.password_confirmation || ""}
                      variant="outlined"
                      required
                      autoComplete="new-password"
                    />
                  </Grid>
                </>
              )}
              {action === "Client" ? (
                <Grid item xs={12}>
                  <FormControlLabel
                    label="Sync Leads With GHL ?"
                    style={{ marginLeft: "auto" }}
                    control={
                      <Switch
                        checked={syncLead}
                        onChange={(e) => setSyncLead(e.target.checked)}
                      />
                    }
                    labelPlacement="start"
                  />
                  <i>
                    <Typography variant="subtitle2">
                      Fields that are marked with * sign are required.
                    </Typography>
                  </i>
                </Grid>
              ) : (
                ""
              )}

              <Grid item xs={12}>
                <Button
                  className={classes.submitButton}
                  size="large"
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={(!id && (!formState.isValid || loading)) || loading}
                  fullWidth
                >
                  {id ? "Save Changes" : `Add new ${action}`}
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Section>
    </div>
  );
};

export default AddNewClient;
