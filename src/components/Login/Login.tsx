import { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
/**
 * Imports the component styles
 */
import { useStyles } from "./Login.styles";

/**
 * Imports Material UI components
 */
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

/**
 * Components Imports
 */
import InputLabel from "../InputLabel";
import InputPassword from "../InputPassword";
import InputText from "../InputText";
import Body from "../Body";

/**
 * Imports hooks
 */
import { useForm, FormConfig, useAuth, useApiClient } from "../../hooks";

import { getApiClient } from "../../utils/api";
import axios from "axios";

/**
 * Defines the form inputs interface
 */
interface FormInputs {
  username: string;
  password: string;
}

/**
 * Initializes the Copyright component
 */
function Copyright() {
  const appName = `Prime Gaming`;

  /**
   * Gets the component styles
   */
  const classes = useStyles();

  return (
    <Typography variant="body2" className={classes.copyright} align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        {appName}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

/**
 * Displays the component
 */
const Login: React.FC = () => {
  /**
   * Gets the component styles
   */
  const classes = useStyles();

  const { auth, setToken } = useAuth();

  /**
   * Initializes the mock API
   */
  const { apiClient } = useApiClient({ mock: false });

  /**
   * Handles the Sign in form
   */
  const handleSignIn = async (inputs: FormInputs) => {
    const response = await apiClient.post(
      "http://localhost:3001/v1/auth/login-admin",
      inputs
    );

    console.log("resp.data:", response.data);
    setToken(response.data.token);
  };

  /**
   * Defines the useForm config
   */
  const formConfig: FormConfig<FormInputs> = {
    defaultValues: {
      username: "",
      password: "",
    },
    submitFn: handleSignIn,
    autoFocus: true,
  };

  /**
   * Initializes the useForm hook
   */
  const { inputs, inputsReady, getAutoFocus, submit, handleInputChange } =
    useForm(formConfig);

  /**
   * Gets the autoFocus object
   */
  const autoFocus = inputsReady && getAutoFocus();

  /**
   * Gets the input state
   */
  const { username, password } = inputs;

  if (auth.isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Body className={classes.body}>
      <div className={classes.root}>
        <div className={classes.paper}>
          <Typography className={classes.title} component="h1" variant="h4">
            Welcome to Prime Gaming Dashboard
          </Typography>
          <form className={classes.form} noValidate onSubmit={submit}>
            <Grid container xs={12} item justify="center">
              <Grid item container xs={12} md={6} sm={12} spacing={2}>
                <Grid item xs={12}>
                  <InputLabel text="Username" htmlFor="userName" />
                  <InputText
                    required
                    value={username}
                    name="username"
                    autoFocus={autoFocus}
                    onChange={handleInputChange}
                    debounce={inputsReady}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel text="Password" htmlFor="password" />
                  <InputPassword
                    required
                    value={password}
                    name="password"
                    autoFocus={autoFocus}
                    onChange={handleInputChange}
                    debounce={inputsReady}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="keepSignedIn" color="secondary" />
                    }
                    label="Remember me for 30 days."
                  />
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  sign in
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </div>
    </Body>
  );
};

export default Login;
