import { useEffect, useState } from "react";

/**
 * External Imports
 */
import { Route, Switch, Redirect } from "react-router-dom";

/**
 * Dashboard component imports
 */
import DashboardNav from "../DashboardNav";
import DashboardArticles from "../DashboardArticles";
import DashboardAccounts from "../DashboardAccounts";

/**
 * Imports hooks
 */
import { useAuth, useApiClient } from "../../hooks";

/**
 * Displays the component
 */
const ProtectedRoutes: React.FC = () => {
  /**
   * Initializes the unauthorized state
   */
  const [unauthorized, setUnauthorized] = useState(false);

  /**
   * Gets the auth
   */
  const { token, updateAuth } = useAuth();

  /**
   * Gets the api client
   */
  const { apiClient } = useApiClient({ withCredentials: true, mock: false });

  /**
   * Handles checking if the user is logged in
   */
  const checkIfLoggedIn = async () => {
    const { data } = await apiClient.get("/v1/auth");

    if (!data) {
      setUnauthorized(true);
      updateAuth({ isLoggedIn: false });
      return;
    }

    updateAuth({ isLoggedIn: true });
  };

  /**
   * Handles checking if the user is logged in
   */
  useEffect(() => {
    checkIfLoggedIn();
  }, [token]);

  /**
   * Handles updating the unauthorized state
   */
  useEffect(() => {
    if (!token) setUnauthorized(true);
  }, [token]);

  if (unauthorized) return <Redirect to="/login" />;

  return (
    <Route path="/">
      <DashboardNav>
        <Switch>
          <Route exact path="/">
            <h1> DashboardOverview </h1>
          </Route>
          <Route exact path="/accounts">
            <DashboardAccounts />
          </Route>
          <Route exact path="/messages">
            <h1> DashboardMessages </h1>
          </Route>
          <Route exact path="/articles">
            <DashboardArticles />
          </Route>
          <Route exact path="/moderation">
            <h1> DashboardModeration </h1>
          </Route>
          <Route exact path="/reports">
            <h1> DashboardReports </h1>
          </Route>
        </Switch>
      </DashboardNav>
    </Route>
  );
};

export default ProtectedRoutes;
