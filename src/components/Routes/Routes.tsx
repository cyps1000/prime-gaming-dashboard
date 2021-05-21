import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/**
 * Dashboard component imports
 */
import DashboardNav from "../DashboardNav";
import DashboardArticles from "../DashboardArticles";
import DashboardAccounts from "../DashboardAccounts";
import Login from "../Login";

/**
 * Displays the component
 */
const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>

        <Route path="/">
          <DashboardNav>
            <Switch>
              <Route exact path="/">
                <h1>Overview</h1>
              </Route>
              <Route exact path="/accounts">
                <DashboardAccounts />
              </Route>
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
