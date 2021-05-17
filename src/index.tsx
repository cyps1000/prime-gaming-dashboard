import ReactDOM from "react-dom";

/**
 * Imports App
 */
import App from "./App";

/**
 * Imports Mock API server
 */
import { makeServer } from "./mock/server";

/**
 * Mocks an api server during development only
 */
if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" });
}

ReactDOM.render(<App />, document.getElementById("root"));
