import { ReactNode, ReactElement } from "react";

/**
 * External Imports
 */
import shortid from "shortid";
import clsx from "clsx";

/**
 *  Material UI Imports
 */
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import DialogTitle from "@material-ui/core/DialogTitle";
import Box from "@material-ui/core/Box";

/**
 * Imports the component styles
 */
import { useStyles } from "./ModalTitle.styles";

/**
 * Defines the Title props interface
 */
interface TitleProps {
  title?: string | ReactNode;
  className: string | number | symbol | any;
}

/**
 * Defines the props interface
 */
export interface ModalTitleProps {
  title?: TitleProps["title"];
  classes?: {
    root?: TitleProps["className"];
    container?: TitleProps["className"];
    title?: TitleProps["className"];
    iconContainer?: TitleProps["className"];
    icon?: TitleProps["className"];
  };
  onClick: () => void;
  id?: string;
}

/**
 * Defines the default props
 */
const defaultProps: ModalTitleProps = {
  title: "",
  classes: {
    root: "",
    container: "",
    title: "",
    iconContainer: "",
    icon: "",
  },
  onClick: () => {},
  id: shortid.generate(),
};

/**
 * Displays the Title component
 * @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18051
 */
const Title: React.FC<TitleProps> = (props) => {
  const { title, className } = props;

  if (!title) return null;

  if (typeof title === "string") {
    return (
      <Typography variant="h3" className={className}>
        {title}
      </Typography>
    );
  }

  return title as ReactElement;
};

/**
 * Displays the component
 */
const ModalTitle: React.FC<ModalTitleProps> = (props) => {
  const { title, onClick, id, classes } = props;

  /**
   * Gets the component styles
   */
  const _classes = useStyles();

  /**
   * Defines the root classes
   */
  const rootClasses = clsx(_classes.dialogTitle, {
    [classes!.root]: !!classes!.root,
  });

  /**
   * Defines the container classes
   */
  const containerClasses = clsx(_classes.container, {
    [classes!.container]: !!classes!.container,
  });

  /**
   * Defines the title classes
   */
  const titleClasses = clsx(_classes.title, {
    [classes!.title]: !!classes!.title,
  });

  /**
   * Defines the icon container classes
   */
  const iconContainerClasses = clsx(_classes.iconContainer, {
    [classes!.iconContainer]: !!classes!.iconContainer,
  });

  /**
   * Defines the icon classes
   */
  const iconClasses = clsx(_classes.icon, {
    [classes!.icon]: !!classes!.icon,
  });

  return (
    <DialogTitle id={id} className={rootClasses}>
      <Box className={containerClasses}>
        <Title title={title} className={titleClasses} />
        <Box className={iconContainerClasses} title="Close">
          <CloseIcon className={iconClasses} onClick={onClick} />
        </Box>
      </Box>
    </DialogTitle>
  );
};

ModalTitle.defaultProps = defaultProps;
export default ModalTitle;
