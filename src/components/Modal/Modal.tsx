import { forwardRef, ReactNode } from "react";

/**
 *  Material UI Imports
 */
import { useTheme, useMediaQuery } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import Zoom from "@material-ui/core/Zoom";

/**
 * Imports the component styles
 */
import { useStyles } from "./Modal.styles";

/**
 * Defines the props interface
 */
export interface ModalProps {
  open: boolean;
  scroll: "paper" | "body" | undefined;
  maxWidth?: DialogProps["maxWidth"];
  fullWidth?: boolean;
  keepMounted?: boolean;
  fullScreen?: boolean;
  onClose: () => void;
  children: ReactNode;
  hideBackdrop?: boolean;
  className?: string;
  classes?: DialogProps["classes"];
}

/**
 * Defines the default props
 */
const defaultProps: ModalProps = {
  open: false,
  scroll: "paper",
  maxWidth: "md",
  fullWidth: true,
  keepMounted: true,
  fullScreen: false,
  onClose: () => {},
  children: "",
  hideBackdrop: false,
  className: "",
  classes: {},
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
const Modal: React.FC<ModalProps> = (props) => {
  const {
    open,
    scroll,
    maxWidth,
    fullWidth,
    keepMounted,
    onClose,
    fullScreen,
    children,
    classes,
    hideBackdrop,
    className,
  } = props;

  /**
   * Gets the component styles
   */
  const _classes = useStyles();

  /**
   * Triggers the modal to be on full screen on lower screen resolutions
   */
  const theme = useTheme();
  const triggerFullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Dialog
      scroll={scroll}
      maxWidth={maxWidth}
      classes={{
        paperWidthMd: _classes.paperWidthMd,
        paperWidthSm: _classes.paperWidthSm,
        paperWidthXl: _classes.paperWidthXl,
        ...classes,
      }}
      className={className}
      fullScreen={fullScreen ? fullScreen : triggerFullScreen}
      fullWidth={fullWidth}
      open={open}
      keepMounted={keepMounted}
      TransitionComponent={ZoomTransition}
      TransitionProps={{ timeout: 400 }}
      onClose={onClose}
      hideBackdrop={hideBackdrop}
    >
      {children}
    </Dialog>
  );
};

Modal.defaultProps = defaultProps;
export default Modal;
