import { useState } from "react";
/**
 * Imports Material UI components
 */
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

/**
 * Imports components
 */
import { AuthProvider, MessageProvider } from "../../hooks";

/**
 * Imports themes
 */
import { mainTheme } from "../../themes/main-theme";

/**
 * Displays the component
 */
const Providers: React.FC = (props) => {
  const { children } = props;

  /**
   * Handles getting the theme data
   */
  const getTheme = () => createMuiTheme(mainTheme);

  return (
    <ThemeProvider theme={getTheme()}>
      <AuthProvider>
        <MessageProvider>{children}</MessageProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default Providers;
