import axios from "axios";

/**
 * Defines the hook props interface
 */
interface Config {
  mock: boolean;
}

/**
 * Defines the api client function
 */
export const getApiClient = (config: Config) => {
  const { mock } = config;

  /**
   * Handles getting the base api url
   */
  const getApiUrl = () => {
    if (process.env.NODE_ENV === "development") {
      if (mock) return "/";
      return process.env.REACT_APP_LOCAL_API;
    }
    return process.env.REACT_APP_PROD_API;
  };

  /**
   * Creates the api client by configuring axios
   */
  const apiClient = axios.create({
    baseURL: getApiUrl(),
  });

  return { apiClient };
};
