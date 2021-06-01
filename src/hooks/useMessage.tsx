import {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

/**
 * Defines the provider value
 */
interface ProviderValue {
  config: {
    message: string | ReactNode;
    severity?: "success" | "warning" | "error";
    permanent?: boolean;
    autoClose?: number;
  };
  open: boolean;
  resetMessage: () => void;
  dispatchMessage: (props: ProviderValue["config"]) => void;
}

/**
 * Defines the default value
 */
const defaultValue: ProviderValue = {
  config: {
    message: "",
    severity: "success",
    permanent: false,
    autoClose: 5000,
  },
  open: false,
  resetMessage: () => {},
  dispatchMessage: (props) => {},
};

/**
 * Defines a context where the completion state is stored and shared
 *
 * - This serves as a cache.
 * - Rather than each instance of the hook fetch the current state, the hook simply calls useContext to get the data from the top level provider
 */
const messageContext = createContext<ProviderValue>(defaultValue);

type MessageProviderType = (props: { children?: ReactNode }) => any;

/**
 * Provides a top level wrapper with the context
 *
 * - This is the main provider
 * - It makes the object available to any child component that calls the hook.
 */
const MessageProvider: MessageProviderType = (props) => {
  const { children } = props;

  /**
   * Init the config state
   */
  const [config, setConfig] = useState(defaultValue.config);

  /**
   * Init the open state
   */
  const [open, setOpen] = useState(false);

  /**
   * Dispatches the message
   */
  const dispatchMessage = (props: ProviderValue["config"]) => {
    const { severity, permanent, autoClose, message } = props;

    setOpen(true);
    setConfig({
      message,
      permanent: permanent ? permanent : defaultValue.config.permanent,
      autoClose: autoClose ? autoClose : defaultValue.config.autoClose,
      severity: severity ? severity : defaultValue.config.severity,
    });
  };

  /**
   * Resets the message
   */
  const resetMessage = () => {
    setOpen(false);
  };

  /**
   * Handles reseting the config after the popup has dissapeared
   * This is done in order to not flicker the state inside the popup while still slightly visible to the user
   */
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!open && config.severity !== defaultValue.config.severity) {
      timer = setTimeout(() => {
        setConfig(defaultValue.config);
      }, 300);
    }

    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [open]);

  return (
    <messageContext.Provider
      value={{
        config,
        open,
        resetMessage,
        dispatchMessage,
      }}
    >
      {children}
    </messageContext.Provider>
  );
};

/**
 * Defines the main hook
 *
 * - Returns the  context / object
 * - To be used inside components
 */
const useMessage = () => useContext(messageContext);

export { useMessage, MessageProvider };
