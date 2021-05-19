/**
 * Imports the component styles
 */
import { useStyles } from "./Body.styles";

/**
 * Defines the props interface
 */
export interface BodyProps {
  className?: string;
}

/**
 * Displays the component
 */
const Body: React.FC<BodyProps> = (props) => {
  const { children, className } = props;

  /**
   * Gets the component styles
   */
  const classes = useStyles();

  return <div className={className}>{children}</div>;
};

export default Body;
