import { ReactNode } from "react";
import axios from "axios";

/**
 * Defines the hook props interface
 */
interface Config {
  mock?: boolean;
  withCredentials?: boolean;
  logout?: () => void;
  dispatchMessage: (props: {
    message: ReactNode;
    severity?: "success" | "warning" | "error" | undefined;
    permanent?: boolean | undefined;
    autoClose?: number | undefined;
  }) => void;
}

interface ApiError {
  errors: {
    message: string;
    errorType?: string;
  }[];
}

/**
 * Defines the api client function
 */
export const getApiClient = (config: Config) => {
  const { mock, withCredentials, logout, dispatchMessage } = config;

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

  apiClient.interceptors.request.use((request) => {
    if (withCredentials) {
      const token = JSON.parse(localStorage.getItem("prime-token") || "");
      request.headers["Authorization"] = token;
    }

    return request;
  });

  apiClient.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (error.response) {
        const data: ApiError = error.response.data;
        if (data.errors.length > 0) {
          const tokenExpired = data.errors.find((error) => {
            return (
              error.errorType === "RefreshTokenExpired" ||
              error.errorType === "NotAuthorized"
            );
          });

          const accessTokenError = data.errors.find(
            (error) => error.errorType === "AccessTokenExpired"
          );

          if (tokenExpired) {
            dispatchMessage({
              message: "Refresh Token Expired",
              severity: "error",
            });
            localStorage.removeItem("prime-token");
            logout && logout();
          }

          if (accessTokenError) {
            return apiClient.get("/v1/auth/refresh-token").then(({ data }) => {
              window.localStorage.setItem(
                "prime-token",
                JSON.stringify(data.accessToken)
              );

              apiClient.defaults.headers.common["Authorization"] =
                JSON.stringify(data.accessToken);
              originalRequest.headers["Authorization"] = JSON.stringify(
                data.accessToken
              );

              return apiClient(originalRequest);
            });
          }

          dispatchMessage({
            message: (
              <ul>
                {data.errors.map((error, index) => (
                  <li key={`${error.errorType}_${index}`}> {error.message} </li>
                ))}
              </ul>
            ),
            severity: "error",
            autoClose: 15000,
          });
        }
      }

      return Promise.reject(error);
    }
  );

  return { apiClient };
};
