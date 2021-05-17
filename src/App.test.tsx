/**
 * @see https://testing-library.com/docs/react-testing-library/intro
 * @see https://www.robinwieruch.de/react-testing-library
 */
import { render } from "@testing-library/react";

/**
 * Imports component
 */
import App from "./App";

/**
 * Default test
 */
describe("App", () => {
  it("renders the component", () => {
    render(<App />);
  });
});
