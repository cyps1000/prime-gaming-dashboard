/**
 * External Imports
 */
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/**
 *  Imports components
 */
import ProtectedRoutes from "../ProtectedRoutes";
import Login from "../Login";
import MessagePopup from "../MessagePopup";

/**
 * Displays the component
 */
const Routes: React.FC = () => {
  return (
    <Router>
      <MessagePopup />
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
