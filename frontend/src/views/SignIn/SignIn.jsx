import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Alert from "@material-ui/lab/Alert";
import { Form } from "./components";
import { SectionHeader } from "components/molecules";
import { Section } from "components/organisms";
import useStyles from "./SignInStyle";
import { COMMON_ERR_MSG } from "../../config";
import API from "../../axios/axiosApi";
import { useHistory } from "react-router-dom";

const SignIn = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
   const history = useHistory();
  const handleLogin = async (values) => {
    // console.log("values : ", values);
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await API.post("login", values);
      // console.log("response", response);
      setLoading(false);
      if (response.status === 200) {
        const userdata = response.data.data.userData;
        // console.log("response", userdata);
        if (userdata.role === "user") {
          history.push(`/lead/${userdata.user_id}/${userdata.full_name}`);
        } else {
          history.push("/");
        }
      } else {
        console.log("else");
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      const errMsg =
        error.response && error.response.data
          ? error.response.data.message
          : COMMON_ERR_MSG;
      setErrorMessage(errMsg);
      console.log(errMsg);
    }
  };

  return (
    <div className={classes.root}>
      <Section className={classes.section}>
        <div className={classes.formContainer}>
          <SectionHeader
            title="Sign In"
            subtitle="Empower Your with Seamless Automation"
            titleProps={{
              variant: "h3",
            }}
          />

          {errorMessage && (
            <Alert className={classes.errorAlert} severity="error">
              {errorMessage}
            </Alert>
          )}
          <Form onLogin={handleLogin} loading={loading} />
          <Typography
            color="textSecondary"
            variant="body1"
            className={classes.forgotPass}
          >
            <Link
              className={classes.cursorPointer}
              variant="body2"
              onClick={() => history.push("/forgot-password")}
            >
              Forgot password?
            </Link>
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
            className={classes.signupLink}
          >
            New To Engagement Academy ?{" "}
            <Link
              className={classes.cursorPointer}
              onClick={() => history.push("/signup")}
            >
              Sign Up here
            </Link>
          </Typography>
        </div>
      </Section>
    </div>
  );
};

export default SignIn;
