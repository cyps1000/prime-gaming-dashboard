/**
 * Hooks
 */
import { useUtils } from "../hooks";

interface UseValidatorProps {
  validate: string[] | undefined;
  inputProps: {
    required?: boolean;
    min?: number;
    hasToMatch?: string | boolean | null;
    noValidate?: boolean;
    type?: string;
  };
}

/**
 * Defines the default props
 */
const defaultProps: UseValidatorProps = {
  validate: [],
  inputProps: {
    required: false,
    min: 0,
    hasToMatch: false,
    noValidate: false,
    type: "",
  },
};

/**
 * Defines the main hook
 */
const useValidator = (props: UseValidatorProps) => {
  const { validate, inputProps } = props;

  /**
   * Gets the input props
   */
  const { required, min, hasToMatch, noValidate, type } = inputProps;

  /**
   * Gets the utility function
   * ( temporarily remove of hasUppercase )
   */
  const { isEmpty, isEmail, isSecurePassword } = useUtils();

  /**
   * Checks if the input has a certain length
   */
  const isLengthTextBuilder = (value: string, min: number) => {
    const { length } = value;
    return length < min ? "Must be at least 4 characters." : "";
  };

  /**
   * Checks if the input is empty
   */
  const handleEmptyInput = (value: string) =>
    isEmpty(value) ? "This field is required" : "";

  /**
   * Checks if the input meets the minimum length
   */
  const handleMinLength = (value: string) => {
    if (!min) return "";

    if (value.length < min) {
      if (type === "password") return "Password must be at least";
      return isLengthTextBuilder(value, min);
    }

    return "";
  };

  /**
   * Checks if the input matches another input
   */
  const handleMatchInput = (value: string) => {
    if (!hasToMatch) return;

    let error = "The field must match";

    if (type === "password") {
      error = "The field must match";
    }

    const errorMessage = value !== hasToMatch ? error : "";
    return errorMessage;
  };

  /**
   * Checks for errors
   */
  const validateInput = (value: string) => {
    /**
     * Initialize the error message
     */
    let error: any = null;
    if (noValidate) return error;

    /**
     * Runs if the input is required
     * Checks if it is empty, errors out if it is.
     */
    if (required && validate && !validate.includes("hasToMatch")) {
      const error = handleEmptyInput(value);
      if (error) return error;
    }

    /**
     * Runs if the input has a min property
     * Checks if it meets the min length, errors out if it doesnt.
     */
    if ((min && required) || (value && min)) {
      const error = handleMinLength(value);
      if (error) return error;
    }

    validate &&
      validate.forEach((validation) => {
        switch (validation) {
          case "isEmail":
            if (value && !isEmail(value))
              return (error = "Please provide a valid email");
            return error;
          case "strongPassword":
            if (value && !isSecurePassword(value)) {
              return (error = "Weak password");
            }
            return error;
          case "hasToMatch":
            return (error = handleMatchInput(value));
          default:
            break;
        }
      });

    return error;
  };

  return { validateInput };
};

useValidator.defaultProps = defaultProps;
export { useValidator };
