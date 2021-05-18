/**
 *  Material UI Imports
 */
import DialogContent from "@material-ui/core/DialogContent";

/**
 * Imports the component styles
 */
import { useStyles } from "./ModalContent.styles";

/**
 * Defines the props interface
 */
export interface ModalContentProps {
  className?: string | number | symbol | any;
  children: JSX.Element[] | JSX.Element | null;
}

/**
 * Displays the component
 */
const ModalContent: React.FC<ModalContentProps> = (props) => {
  const { className, children } = props;

  /**
   * Gets the component styles
   */
  const classes = useStyles();

  return (
    <DialogContent className={className} classes={{ root: classes.root }}>
      {children}
    </DialogContent>
  );
};

export default ModalContent;
