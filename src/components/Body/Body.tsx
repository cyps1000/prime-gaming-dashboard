/**
 * Defines the props interface
 */
interface BodyProps {
  className: string;
}

/**
 * Displays the component
 */
const Body: React.FC<BodyProps> = (props) => {
  const { children, className } = props;

  return <div className={className}>{children}</div>;
};

export default Body;
