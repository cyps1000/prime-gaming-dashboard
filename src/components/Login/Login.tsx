/**
 * Imports the component styles
 */
import { useStyles } from "./Login.styles";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

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
import { useForm, FormConfig } from "../../hooks";

/**
 * Defines the form inputs interface
 */
interface FormInputs {
  userName: string;
  password: string;
}

/**
 * Displays the component
 */
const Login: React.FC = () => {
  /**
   * Gets the component styles
   */
  const classes = useStyles();

  const handleSubmit = (inputs: FormInputs) => {
    console.log(inputs);
  };

  /**
   * Defines the useForm config
   */
  const formConfig: FormConfig<FormInputs> = {
    defaultValues: {
      userName: "",
      password: "",
    },
    submitFn: handleSubmit,
    autoFocus: true,
  };

  const { inputs, inputsReady, getAutoFocus, submit, handleInputChange } =
    useForm(formConfig);

  /**
   * Gets the autoFocus object
   */
  const autoFocus = inputsReady && getAutoFocus();

  /**
   * Gets the input state
   */
  const { userName, password } = inputs;

  return (
    <Body className={classes.body}>
      <div className={classes.root}>
        <Container>
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              sign in
            </Typography>
            <form className={classes.form} noValidate onSubmit={submit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <InputLabel text="Username" htmlFor="userName" />
                  <InputText
                    value={userName}
                    name="userName"
                    autoFocus={autoFocus}
                    onChange={handleInputChange}
                    debounce={inputsReady}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel text="Password" htmlFor="password" />
                  <InputPassword
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
                    label="remember me"
                  />
                </Grid>
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
            </form>
          </div>
        </Container>
      </div>
    </Body>
  );
};

export default Login;
