import { useContext, createContext, ReactNode, useState } from "react";

/**
 * Hooks
 */
import useLocalStorage from "./useLocalStorage/useLocalStorage";

interface Auth {
  isLoggedIn: boolean;
}

/**
 * Provides the state of the modal
 * By default it will be open
 */
const useAuthHook = () => {
  const [auth, setAuth] = useState<Auth>({ isLoggedIn: false });

  const updateAuth = (auth: Auth) => {
    setAuth(auth);
  };

  return {
    auth,
    updateAuth,
  };
};

/**
 * Defines a context where the completion state is stored and shared
 *
 * - This serves as a cache.
 * - Rather than each instance of the hook fetch the current state, the hook simply calls useContext to get the data from the top level provider
 */
const authContext = createContext({
  auth: {
    isLoggedIn: false,
  },
  updateAuth: (auth: Auth) => {},
});

type AuthProviderType = (props: { children?: ReactNode }) => any;

/**
 * Provides a top level wrapper with the context
 *
 * - This is the main provider
 * - It makes the object available to any child component that calls the hook.
 */
const AuthProvider: AuthProviderType = (props) => {
  const { children } = props;

  const data = useAuthHook();

  return (
    <authContext.Provider value={{ ...data }}>{children}</authContext.Provider>
  );
};

type useAuthHookType = () => {
  auth: Auth;
  updateAuth: (auth: Auth) => void;
};

/**
 * Defines the main hook
 *
 * - Returns the  context / object
 * - To be used inside components
 */
const useAuth: useAuthHookType = () => {
  return useContext(authContext);
};

export { useAuth, AuthProvider };
