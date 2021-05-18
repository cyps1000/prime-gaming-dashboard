import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/**
 * Imports the component styles
 */
import { useStyles } from "./Routes.styles";

/**
 * Displays the component
 */
const Routes: React.FC = () => {
  /**
   * Gets the component styles
   */
  const classes = useStyles();

  return (
    <Router>
      <Route path="/">
        <Switch>
          {/* Overview page */}
          <Route exact path="/" />
          <Route exact path="/accounts" />
          <Route exact path="/messages" />
          <Route exact path="/articles" />
          <Route exact path="/moderation" />
          <Route exact path="/reports" />
        </Switch>
      </Route>
    </Router>
  );
};

export default Routes;
