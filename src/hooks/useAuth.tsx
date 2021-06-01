import {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

/**
 * Hooks
 */
import useLocalStorage from "./useLocalStorage/useLocalStorage";

interface Auth {
  isLoggedIn?: boolean;
}
interface ProviderValue {
  token: string;
  auth: Auth;
  updateAuth: (auth: Auth) => void;
  setToken: (value: string | ((val: string) => string)) => void;
}

const defaultValue: ProviderValue = {
  token: "",
  auth: {
    isLoggedIn: false,
  },
  updateAuth: (auth: Auth) => {},
  setToken: (value: string | ((val: string) => string)) => {},
};

/**
 * Defines a context where the completion state is stored and shared
 *
 * - This serves as a cache.
 * - Rather than each instance of the hook fetch the current state, the hook simply calls useContext to get the data from the top level provider
 */
const authContext = createContext<ProviderValue>(defaultValue);

type AuthProviderType = (props: { children?: ReactNode }) => any;

/**
 * Provides a top level wrapper with the context
 *
 * - This is the main provider
 * - It makes the object available to any child component that calls the hook.
 */
const AuthProvider: AuthProviderType = (props) => {
  const { children } = props;

  const [token, setToken] = useLocalStorage<string>("prime-token");
  const [auth, setAuth] = useState<Auth>(defaultValue.auth);

  const updateAuth = (auth: Auth) => {
    setAuth(auth);
  };

  useEffect(() => {
    updateAuth({ isLoggedIn: !!token });
  }, [token]);

  return (
    <authContext.Provider
      value={
        {
          token,
          auth,
          setToken,
          updateAuth,
        } as ProviderValue
      }
    >
      {children}
    </authContext.Provider>
  );
};

/**
 * Defines the main hook
 *
 * - Returns the  context / object
 * - To be used inside components
 */
const useAuth = () => useContext(authContext);

export { useAuth, AuthProvider };
