import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  ClipboardEvent,
} from "react";

/**
 * External Imports
 */
import clsx from "clsx";
import shortid from "shortid";

/**
 * Material UI Imports
 */
import IconButton from "@material-ui/core/IconButton";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import OutlinedInput, {
  OutlinedInputProps,
} from "@material-ui/core/OutlinedInput";
import {
  VisibilityOutlined as VisibleIcon,
  VisibilityOffOutlined as InvisibleIcon,
} from "@material-ui/icons";

/**
 * Hooks
 */
import { useValidator, Errors } from "../../hooks";

/**
 * Imports the component styles
 */
import { useStyles } from "./InputPassword.styles";

/**
 * Defines the props interface
 */
export interface InputPasswordProps {
  id?: string;
  value: string;
  name: string;
  required?: boolean;
  preventPaste?: boolean;
  autoFocus: any;
  disabled?: boolean;
  noValidate?: boolean;
  showPasswordAdornment?: boolean;
  debounce: boolean;
  debounceTime?: number;
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
  validateOnChangeDelay?: number;
  min?: number;
  max?: number;
  maxLengthDefault?: number;
  onPaste?: (event: ClipboardEvent<HTMLDivElement>) => any;
  onChange: Function;
  onError?: Function;
  validate?: string[];
  hasToMatch?: string | null;
  className?: string | any;
  classes?: {
    input?: string;
  };
  apiErrors?: any;
  placeholder?: string;
  prefix?: JSX.Element | null;
  label?: string;
}

/**
 * Defines the default props
 */
const defaultProps: InputPasswordProps = {
  id: "",
  value: "",
  name: "",
  required: false,
  preventPaste: false,
  autoFocus: false,
  disabled: false,
  noValidate: false,
  showPasswordAdornment: true,
  debounce: false,
  debounceTime: 500,
  validateOnBlur: true,
  validateOnChange: false,
  validateOnChangeDelay: 1200,
  min: 0,
  max: 0,
  maxLengthDefault: 524288,
  onPaste: () => {},
  onChange: () => {},
  onError: () => {},
  validate: [],
  hasToMatch: null,
  className: "",
  classes: {
    input: "",
  },
  apiErrors: {},
  placeholder: "",
  prefix: null,
  label: "",
};

/**
 * Displays the component
 */
const InputPassword: React.FC<InputPasswordProps> = (props) => {
  const {
    id,
    value,
    name,
    required,
    preventPaste,
    autoFocus,
    disabled,
    noValidate,
    showPasswordAdornment,
    debounce,
    debounceTime,
    min,
    max,
    maxLengthDefault,
    onPaste,
    onChange,
    onError,
    validate,
    hasToMatch,
    className,
    classes,
    validateOnBlur,
    validateOnChange,
    validateOnChangeDelay,
    apiErrors,
    placeholder,
    prefix,
    label,
  } = props;

  /**
   * Gets the component styles
   */
  const _classes = useStyles();

  /**
   * Initializes the local input state
   */
  const [input, setInput] = useState("");

  /**
   * Init the input changed flag
   */
  const [inputChanged, setInputChanged] = useState(false);

  /**
   * Initializes the local error state
   */
  const [error, setError] = useState("");

  /**
   * Initializes the event state
   * Used to store the debounced event for later use
   */
  const [event, setEvent] =
    useState<ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | string>("");

  /**
   * Initializes the input verified flag
   * Used to update the useForm inputs and trigger the submit function
   */
  const [inputVerified, setInputVerified] = useState(false);

  /**
   * Initializes the state that hides/shows the password
   */
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Init the time the user is focused on the input
   */
  const [focusTime, setFocusTime] = useState(0);

  /**
   * Gets the validator
   */
  const { validateInput } = useValidator({
    validate,
    inputProps: {
      min,
      required,
      hasToMatch,
      noValidate,
      type: "password",
    },
  });

  /**
   * Creates a ref used for autofocus
   */
  let inputRef = useRef<any>();

  /**
   * Initializes the error timer
   */
  let errorTimer = useRef<any>();

  /**
   * Initializes the input timer
   */
  let inputTimer = useRef<any>();

  /**
   * Initializes the input validation ref
   */
  let inputValidationTimer = useRef<any>();

  /**
   * Handles updating the form input on Enter
   */
  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>): any =>
    event.key === "Enter" && input && onChange(event);

  /**
   * Checks if there are any errors
   */
  const hasError = (errors: Errors | string) => errors && errors.length > 0;

  /**
   * Handles focusing the input
   */
  const focusInput = () => inputRef.current.focus();

  /**
   * Handles getting the autoFocus flag
   */
  const isFocused = () => {
    if (typeof autoFocus === "boolean") return autoFocus;

    return name ? autoFocus[name] : false;
  };

  /**
   * Handles resetting the focused state
   */
  const handleOnBlur = () => {
    if (validateOnBlur) {
      if (Date.now() - focusTime > 1000 || inputChanged) {
        handleLocalValidation(input);
      }
    }
  };

  /**
   * Handles initializing the focused time (How long has the user been focused in the input)
   */
  const handleOnFocus = () => {
    setFocusTime(Date.now());
  };

  /**
   * Displays the value
   */
  const displayValue = (value: string) => (value ? value : "");

  /**
   * Checks initial value
   */
  const isValidValue = (value: string) => value !== null && value !== undefined;

  /**
   * Handles getting the input ID
   */
  const getInputID = () => {
    if (id) return id;
    if (name) return name;
    if (noValidate && !id) return shortid.generate();
    return shortid.generate();
  };

  /**
   * Handles the local validation
   */
  const handleLocalValidation = (value: string) => {
    setError(validateInput(value));
  };

  /**
   * Handles the local state change
   * Stores and persists the event
   * Updates the local input state
   */
  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    /**
     * Calling event.persist() on the synthetic event removes the event from the pool allowing references to the event to be retained asynchronously.
     * @see https://medium.com/trabe/react-syntheticevent-reuse-889cd52981b6
     */
    event.persist();

    /**
     * Gets the value of the input
     */
    const newValue = event.target.value;

    /**
     * Handles the validation
     */
    handleValidation(newValue);

    /**
     * Stores the event for later use
     */
    setEvent(event);

    /**
     * Updates the local state
     */
    setInput(newValue);
  };

  /**
   * Handles the validation
   */
  const handleValidation = (value: string, isSubmit?: boolean) => {
    /**
     * Gets the error message for the specific input
     */
    const error = validateInput(value);

    if (!isSubmit && error) {
      setError("");
    } else {
      setError(error);
      onError &&
        onError((prevErrors: Errors) => ({ ...prevErrors, [name]: error }));
    }

    /**
     * Updates the errors state for the entire form
     */
    if (isSubmit) {
      !error && setInputVerified(true);
    }
  };

  /**
   * Shows / Hides the password field
   */
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  /**
   * Handles getting the input type
   */
  const getInputType = () => {
    if (!showPasswordAdornment) return "password";
    return showPassword ? "text" : "password";
  };

  /**
   * Handles getting the end adornment icon
   */
  const getAdornment = () => {
    if (!showPasswordAdornment) return null;

    return (
      <InputAdornment
        position="end"
        onClick={toggleShowPassword}
        classes={{
          root: clsx(_classes.endAdornment, {
            [_classes.errorAdornment]: !!error,
          }),
        }}
      >
        <IconButton>
          {showPassword ? <VisibleIcon /> : <InvisibleIcon />}
        </IconButton>
      </InputAdornment>
    );
  };

  /**
   * Handles validating the input on change
   */
  useEffect(() => {
    if (validateOnChange && input.length < 1)
      clearTimeout(inputValidationTimer.current);
    if (validateOnChange && input.length > 1) {
      clearTimeout(inputValidationTimer.current);
      inputValidationTimer.current = setTimeout(() => {
        handleLocalValidation(input);
      }, validateOnChangeDelay);
    }
    // eslint-disable-next-line
  }, [validateOnChange, input, hasToMatch]);

  /**
   * Handles cleaning the input before setting the state
   * It converts nulls and undefines to plain empty string.
   */
  useEffect(() => {
    isValidValue(value) ? setInput(value) : setInput("");
    // eslint-disable-next-line
  }, [value]);

  /**
   * Handles updating the form inputs if the form was submitted
   * This effect happens across all rendered inputs
   */
  useEffect(() => {
    if (debounce) handleValidation(input, true);
    // eslint-disable-next-line
  }, [debounce]);

  /**
   * Handles focusing on the input
   */
  useEffect(() => {
    if (debounce && error && autoFocus[name]) focusInput();
    // eslint-disable-next-line
  }, [autoFocus, debounce, error]);

  /**
   * Handles debouncing (updating) the form errors state
   * Syncs the local error with the forms errors
   */
  useEffect(() => {
    if (input) {
      clearTimeout(errorTimer.current);
      errorTimer.current = setTimeout(() => {
        onError &&
          onError((prevErrors: Errors) => ({ ...prevErrors, [name]: error }));
      }, debounceTime);
    }
    // eslint-disable-next-line
  }, [input]);

  /**
   * Handles debouncing (updating) the form inputs state
   * Syncs the local input with the forms inputs
   */
  useEffect(() => {
    if (event) {
      clearTimeout(inputTimer.current);
      inputTimer.current = setTimeout(() => {
        onChange(event);
      }, debounceTime);
    }
    // eslint-disable-next-line
  }, [input, event, error]);

  /**
   * Handles an edge case where an error state might not have updated
   */
  useEffect(() => {
    if (!input && !required && error) {
      setError(error);
      onError &&
        onError((prevErrors: Errors) => ({ ...prevErrors, [name]: error }));
    }
    // eslint-disable-next-line
  }, [input, error, required]);

  /**
   * Handles debouncing (updating) the form inputs state
   * Syncs the local input state with the forms input state
   * Used to trigger the onSubmit function
   */
  useEffect(() => {
    if (inputVerified && input) {
      if (event) {
        onChange(event);
        setInputVerified(false);
      } else {
        onChange(event, {
          name,
          value: input,
        });
        setInputVerified(false);
      }
    }
    // eslint-disable-next-line
  }, [inputVerified]);

  /**
   * Handles updating the input state when the value changes
   */
  useEffect(() => {
    if (value) {
      if (value !== input) {
        setInput(value);
      }

      if (validateOnChange) {
        const error = validateInput(value);
        setError(error);
      }
    }
    // eslint-disable-next-line
  }, [value]);

  /**
   * Sets any api errors as local errors to the input
   */
  useEffect(() => {
    if (apiErrors[name]) {
      setError(apiErrors[name]);
      setInputVerified(false);
    }
    // eslint-disable-next-line
  }, [apiErrors]);

  /**
   * Handles updating the input changed flag
   */
  useEffect(() => {
    if (input.length > 0 && !inputChanged) setInputChanged(true);
  }, [input, inputChanged]);

  const inputId = getInputID();

  const getInputAdornment = (type: "start" | "end", adornment: JSX.Element) => {
    return (
      <InputAdornment
        classes={{
          root: clsx({
            [_classes.startAdornment]: type === "start",
            [_classes.errorAdornment]: !!error,
          }),
        }}
        position={type}
      >
        {adornment}
      </InputAdornment>
    );
  };

  return (
    <FormControl variant="outlined" size="small" fullWidth>
      {label && (
        <label
          className={clsx(_classes.label, {
            [_classes.labelError]: !!error,
          })}
          htmlFor={inputId}
        >
          {label}
        </label>
      )}
      <OutlinedInput
        type={getInputType()}
        autoComplete="off"
        inputRef={inputRef}
        name={name}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
        value={displayValue(input)}
        id={inputId}
        autoFocus={isFocused()}
        inputProps={{
          maxLength: max ? max : maxLengthDefault,
          className: clsx({
            [_classes.inputBaseError]: error,
          }),
        }}
        margin="dense"
        notched={false}
        classes={{
          root: _classes.root,
          input: clsx(_classes.input, {
            [_classes.inputError]: !!error,
          }),
          notchedOutline: clsx(_classes.notchedOutline, {
            [_classes.notchedOutlineError]: !!error,
          }),
          adornedStart: _classes.adornedStart,
          adornedEnd: _classes.adornedEnd,
        }}
        startAdornment={prefix ? getInputAdornment("start", prefix) : null}
        endAdornment={getAdornment()}
      />
      {hasError(error) && !noValidate && !!error && (
        <FormHelperText
          error={!!error}
          classes={{ error: _classes.errorMessage }}
        >
          {error}
        </FormHelperText>
      )}
    </FormControl>
  );
};

InputPassword.defaultProps = defaultProps;
export default InputPassword;
