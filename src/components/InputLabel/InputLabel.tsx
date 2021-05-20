/**
 * External Imports
 */
import clsx from "clsx";

/**
 *  Imports Material UI Components
 */
import Typography from "@material-ui/core/Typography";

/**
 * Imports the component styles
 */
import { useStyles } from "./InputLabel.styles";

/**
 * Defines the props interface
 */
export interface InputLabelProps {
  htmlFor?: string;
  text: string;
  className?: string | any;
}

const defaultProps: InputLabelProps = {
  htmlFor: "",
  text: "",
  className: "",
};

/**
 * Displays the component
 */
const InputLabel: React.FC<InputLabelProps> = (props) => {
  const { htmlFor, text, className } = props;

  /**
   * Gets the component styles
   */
  const classes = useStyles();

  return (
    <Typography
      variant="caption"
      component="label"
      htmlFor={htmlFor}
      className={clsx(classes.label, {
        [className]: !!className,
      })}
    >
      {text}
    </Typography>
  );
};

InputLabel.defaultProps = defaultProps;
export default InputLabel;
