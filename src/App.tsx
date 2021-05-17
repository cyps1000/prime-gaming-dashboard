import { Fragment } from "react";

/**
 * Normalizes all css for maximum browser compatibility
 */
import CssBaseLine from "@material-ui/core/CssBaseline";

/**
 * Imports component specific css
 */
import "./App.css";

/**
 * Displays the component
 */
const App: React.FC = () => {
  return (
    <Fragment>
      <CssBaseLine />
      <div>Hello world</div>
    </Fragment>
  );
};

export default App;
