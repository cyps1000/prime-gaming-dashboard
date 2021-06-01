import { forwardRef, useEffect } from "react";

/**
 * External Imports
 */
import clsx from "clsx";

/**
 * Imports Material UI Components
 */
import { TransitionProps } from "@material-ui/core/transitions";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Zoom from "@material-ui/core/Zoom";

/**
 * Imports hooks
 */
import { useMessage } from "../../hooks";

/**
 * Imports the component styles
 */
import { useStyles } from "./MessagePopup.styles";

/**
 * Defines the props interface
 */
export interface MessagePopupProps {
  origin?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  };
}

/**
 * Defines the default props
 */
const defaultProps: MessagePopupProps = {
  origin: {
    vertical: "top",
    horizontal: "center",
  },
};

/**
 * Defines the zoom transition
 */
const ZoomTransition = forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Zoom in={true} ref={ref} {...props} />;
});

/**
 * Displays the component
 */
const MessagePopup: React.FC<MessagePopupProps> = (props) => {
  const { origin } = props;

  /**
   * Gets the component styles
   */
  const classes = useStyles();

  /**
   * Gets the global message controllers
   */
  const { open, config, resetMessage } = useMessage();

  /**
   * Gets the config
   */
  const { severity, message, autoClose, permanent } = config;

  /**
   * Closes the alert
   */
  const closeAlert = (e: any) => {
    resetMessage();
  };

  /**
   * Handles getting the snackbar classes
   */
  const getSnackbarClasses = () => {
    return {
      anchorOriginTopCenter: classes.anchor,
    };
  };

  /**
   * Handles getting the snackbar content props
   */
  const getContentProps = () => {
    return {
      classes: {
        root: clsx(classes.root, {
          [classes.success]: severity === "success",
          [classes.warning]: severity === "warning",
          [classes.error]: severity === "error",
        }),
      },
    };
  };

  /**
   * Handles getting the snackbar action
   */
  const getSnackbarAction = () => {
    if (permanent) return null;

    return (
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        className={classes.iconBtn}
        onClick={closeAlert}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    );
  };

  /**
   * Handles resetting the message once it's no longer in the view.
   */
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!open && message) {
      timer = setTimeout(() => {
        resetMessage();
      }, 300);
    }

    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [open]);

  /**
   * Handles autoclosing the message
   */
  useEffect(() => {
    if (!permanent && message) {
      let timer = setTimeout(() => {
        resetMessage();
      }, autoClose);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line
  }, [autoClose, permanent, message]);

  return (
    <Snackbar
      open={open}
      classes={getSnackbarClasses()}
      transitionDuration={250}
      TransitionComponent={ZoomTransition}
      anchorOrigin={origin}
      message={message}
      onClose={closeAlert}
      ContentProps={getContentProps()}
      action={getSnackbarAction()}
    />
  );
};

MessagePopup.defaultProps = defaultProps;
export default MessagePopup;
