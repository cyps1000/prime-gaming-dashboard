import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/**
 * Dashboard component imports
 */
import DashboardNav from "../DashboardNav";
import DashboardArticles from "../DashboardArticles";
import Login from "../Login";

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
      <Switch>
        <Route path="/login">
          <Login />
        </Route>

        <Route path="/">
          <DashboardNav>
            <Switch>
              {/* Overview page */}
              <Route exact path="/">
                <h1>Overview</h1>
              </Route>
              <Route exact path="/accounts" />
              <Route exact path="/messages" />
              <Route exact path="/articles">
                <DashboardArticles />
              </Route>
              <Route exact path="/moderation" />
              <Route exact path="/reports" />
            </Switch>
          </DashboardNav>
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
