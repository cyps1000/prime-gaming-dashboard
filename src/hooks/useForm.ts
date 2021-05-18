import {
  useState,
  useEffect,
  useCallback,
  FormEvent,
  ChangeEvent,
} from "react";

/**
 * Defines the FormConfig interface
 */
export interface FormConfig<T> {
  defaultValues: T;
  submitFn: (inputs: T, errors?: Errors) => any;
  autoFocus: boolean;
  autoScroll?: boolean;
}

/**
 * Defines the base Inputs interface
 */
export interface Inputs {
  [key: string]: any;
}

/**
 * Defines the errors interface
 */
export interface Errors {
  [key: string]: any;
}

/**
 * Defines the HTML Input Target
 */
interface HTMLInputTarget extends HTMLTextAreaElement {
  checked?: boolean;
}

/**
 * Defines the default props of the hook
 */
const defaultProps: FormConfig<any> = {
  defaultValues: {},
  submitFn: () => {},
  autoFocus: false,
  autoScroll: false,
};

/**
 * Defines the hook
 */
function useForm<T = {}>(props: FormConfig<T>) {
  const { defaultValues, submitFn, autoFocus: _autoFocus, autoScroll } = props;

  /**
   * Initializes the event state
   * Used to store the debounced event for later use
   */
  const [event, setEvent] = useState<FormEvent<HTMLFormElement>>();

  /**
   * Initializes the inputs ready flag
   * Used to debounce all inputs, updating the inputs object, used in the onSubmit function
   */
  const [inputsReady, setInputsReady] = useState(false);

  /**
   * Initializes the inputs state
   */
  const [inputs, setInputs] = useState<T>(defaultValues);

  /**
   * Initializes the errors state
   */
  const [errors, setErrors] = useState<Errors>({});

  /**
   * Initializes the api errors
   */
  const [apiErrors, setApiErrors] = useState({});

  /**
   * Initializes the submitted state
   */
  const [submitted, setSubmitted] = useState(false);

  /**
   * initializes the state used for auto focusing on errored inputs
   */
  const [focused, setFocused] = useState(false);

  /**
   * Handles the pre submit
   * Updates the inputs ready flag which debounces all inputs, updating the inputs object efficiently
   * Persists and saves the current event coming from the onSubmit, it will be passed to the actual handleSubmit - useForm
   */
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.persist();

    setEvent(e);
    setInputsReady(true);
  };

  /**
   * Gets the input value based on type
   */
  const getInputValue = (
    target: HTMLInputElement | HTMLInputTarget,
    type: string
  ) => {
    switch (type) {
      case "text":
        return target.value;
      case "checkbox":
        return target.checked;
      default:
        return target.value;
    }
  };

  /**
   * Checks if there are any errors
   */
  const hasErrors = (obj: Errors): boolean => {
    return Object.keys(obj).some((error) => {
      return (
        obj[error] !== null && obj[error] !== undefined && obj[error] !== ""
      );
    });
  };

  /**
   * Handles the submit event
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();
    checkInputs(inputs);
  };

  /**
   * Checks the inputs before submitting
   */
  const checkInputs = (inputs: FormConfig<any>["defaultValues"]) => {
    if (!hasErrors(errors)) {
      setSubmitted(true);

      if (autoScroll) window.scrollTo(0, 0);
      submitFn(inputs, errors);
    } else {
      /**
       * This will trigger the auto focus on the first input that errors out
       * The order is established when providing the default values
       */
      if (_autoFocus) setFocused(true);
    }
  };

  /**
   * Handles the input change
   */
  const handleInputChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    input: HTMLInputElement
  ) => {
    if (!event && !input) return;
    if (input && !event) {
      if (!input.name || !input.value) return;

      /**
       * Updates the input state
       */
      setInputs((inputs) => ({
        ...inputs,
        [input.name]: input.value,
      }));
    } else {
      const { target } = event;
      const { name, type } = target;

      if (name === undefined) return;

      /**
       * Calling event.persist() on the synthetic event removes the event from the pool allowing references to the event to be retained asynchronously.
       * @see https://medium.com/trabe/react-syntheticevent-reuse-889cd52981b6
       */
      event.persist();

      /**
       * Gets the value of the input
       */
      const newValue = getInputValue(target, type);

      /**
       * Updates the input state
       */
      setInputs((prevState) => ({
        ...prevState,
        [name]: newValue,
      }));
    }
  };

  /**
   * Resets the input state
   *  Also resets the errors state
   */
  const resetInputs = () => {
    setInputs(defaultValues);
    setErrors({});
  };

  /**
   * Handles updating date inputs
   */
  const handleDateChange = (date: Date | string, name: string) => {
    setInputs((inputs) => ({
      ...inputs,
      [name]: date,
    }));
  };

  /**
   * Enables auto focus for the first element that has invalid input
   * This happens only when submitting the form.
   * It can be enabled with a boolean when calling useForm
   * The function needs to be called on the input and the input must have an id for the autofocus to work.
   */
  const getAutoFocus = useCallback(() => {
    const keys = Object.keys(inputs);

    let autoFocus: { [key: string]: boolean } = {};
    keys.forEach((key) => (autoFocus[key] = false));

    /**
     * Finds y value of given object
     * @see https://stackoverflow.com/questions/4801655/how-to-go-to-a-specific-element-on-page/11986153#11986153
     */
    const findPosition = (obj: HTMLElement | any): any => {
      if (!obj) return;

      let currentTop = 0;
      if (obj.offsetParent) {
        do {
          currentTop += obj.offsetTop;
        } while ((obj = obj.offsetParent));
        /**
         * - 250 represents the offset due to the fixed navigation top
         * - as well as the fixed Site Location on some pages.
         */
        return currentTop - 250;
      }
    };
    for (let i = 0; i < keys.length; i++) {
      if (errors[keys[i]]) {
        autoFocus[keys[i]] = true;
        if (_autoFocus) {
          window.scroll(0, findPosition(document.getElementById(keys[i])));
        }

        break;
      }
    }
    return { ...autoFocus };
  }, [_autoFocus, inputs, errors]);

  /**
   * Runs the auto focus function
   */
  useEffect(() => {
    if (focused) getAutoFocus();
    // eslint-disable-next-line
  }, [focused]);

  /**
   * Resets the focused state as otherwise the input would jump
   * to the next error (if any) as soon as the user enters the bare minimal correct input
   */
  useEffect(() => {
    setFocused(false);
  }, [getAutoFocus]);

  /**
   * Handles submitting the form, once all inputs have been debounced
   */
  useEffect(() => {
    if (
      !hasErrors(errors) &&
      Object.values(inputs).length > 0 &&
      inputsReady &&
      event
    ) {
      setInputsReady(false);
      handleSubmit(event);
    }
    // eslint-disable-next-line
  }, [inputs]);

  /**
   * Resets the inputs ready flag if there are any errors
   */
  useEffect(() => {
    if (hasErrors(errors)) {
      setInputsReady(false);
    }
    // eslint-disable-next-line
  }, [errors]);

  return {
    handleSubmit,
    handleInputChange,
    handleDateChange,
    resetInputs,
    submitted,
    setSubmitted,
    getAutoFocus,
    inputs,
    setFocused,
    setInputs,
    errors,
    setErrors,
    apiErrors,
    setApiErrors,
    hasErrors,
    event,
    setEvent,
    inputsReady,
    setInputsReady,
    submit,
  };
}

useForm.defaultProps = defaultProps;
export { useForm };
