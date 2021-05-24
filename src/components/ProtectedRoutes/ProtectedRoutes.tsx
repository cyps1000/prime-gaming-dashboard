import { Route, Switch } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

/**
 * Dashboard component imports
 */
import DashboardNav from "../DashboardNav";
import DashboardArticles from "../DashboardArticles";
import DashboardAccounts from "../DashboardAccounts";

/**
 * Imports hooks
 */
import { useAuth } from "../../hooks";

/**
 * Imports the component styles
 */
import { useStyles } from "./ProtectedRoutes.styles";

/**
 * Defines the props interface
 */
export interface ProtectedRoutesProps {
  text?: string;
}

/**
 * Displays the component
 */
const ProtectedRoutes: React.FC<ProtectedRoutesProps> = (props) => {
  const { text } = props;

  /**
   * Gets the component styles
   */
  const classes = useStyles();

  /**
   *
   */
  const { auth } = useAuth();

  const checkIfLoggedIn = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/v1/auth", {
        headers: {},
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  return (
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
  );
};

export default ProtectedRoutes;
