import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";

/**
 * Dashboard component imports
 */
import ProtectedRoutes from "../ProtectedRoutes";
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

        <ProtectedRoutes />
      </Switch>
    </Router>
  );
};

export default Routes;
