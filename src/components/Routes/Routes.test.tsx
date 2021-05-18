/**
 * @see https://testing-library.com/docs/react-testing-library/intro
 * @see https://www.robinwieruch.de/react-testing-library
 */
import { render } from "@testing-library/react";

/**
 * Imports component
 */
import Routes from "./Routes";

/**
 * Default test
 */
describe("Routes", () => {
  it("renders the component", () => {
    render(<Routes />);
  });
});
