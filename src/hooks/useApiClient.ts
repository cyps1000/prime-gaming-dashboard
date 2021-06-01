/**
 * Imports Hooks
 */
import { useAuth, useMessage } from "../hooks";
import { useHistory } from "react-router-dom";

/**
 * Imports the api util
 */
import { getApiClient } from "../utils/api";

/**
 * Defines the Api Client Hook Props
 */
interface ApiClientHookProps {
  mock?: boolean;
  withCredentials?: boolean;
}

/**
 * Defines the default props
 */
const defaultProps: ApiClientHookProps = {
  mock: false,
  withCredentials: true,
};

/**
 * Defines the main hook
 */
const useApiClient = (props: ApiClientHookProps) => {
  const { mock, withCredentials } = props;

  const { updateAuth } = useAuth();

  /**
   * Gets the message dispatcher
   */
  const { dispatchMessage } = useMessage();

  const history = useHistory();

  const logout = () => {
    updateAuth({ isLoggedIn: false });
    localStorage.removeItem("prime-token");
    history.push("/login");
  };

  const { apiClient } = getApiClient({
    mock,
    withCredentials,
    logout,
    dispatchMessage,
  });

  return { apiClient };
};

useApiClient.defaultProps = defaultProps;
export { useApiClient };
