/**
 * Defines the palette of colors
 */
const palette = {
  common: {
    black: "#000",
    white: "#fff",
  },
  primary: {
    // light: "#6e8ba9",
    main: "#222a35",
    // main: "#5881ab",
    // dark: "#4c6886",
    // accent: "#3454DB",
    accent: "#13C1CC",
    contrastText: "#fff",
  },
  hover: {
    main: "#13C1CC",
  },
  secondary: {
    lighter: "#3c4850",
    light: "#6b6e70",
    main: "#08d1ff",
    dark: "#222223",
    contrastText: "#fff",
  },
  sidebar: {
    main: "#f3f3f3",
    text: "#282828",
    // text: "#4e4e4e",
    active: "#b7b7b7",
  },
  button: {
    light: "#616163",
    main: "#181b23",
    dark: "#222223",
    contrastText: "#fff",
  },
  error: {
    light: "#e57373",
    main: "#e85b5b",
    dark: "#d32f2f",
    contrastText: "#fff",
  },
  warning: {
    light: "#ffb74d",
    main: "#f3a025",
    dark: "#f57c00",
    contrastText: "rgba(0, 0, 0, 0.87)",
  },
  info: {
    light: "#64b5f6",
    main: "#2196f3",
    dark: "#1976d2",
    contrastText: "#fff",
  },
  success: {
    light: "#81c784",
    main: "#61ab4f",
    dark: "#339c07",
    contrastText: "rgba(0, 0, 0, 0.87)",
  },
  border: {
    main: "#eaeaea",
  },
  grey: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#eeeeee",
    300: "#e0e0e0",
    400: "#bdbdbd",
    500: "#9e9e9e",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#212121",
    A100: "#d5d5d5",
    A200: "#aaaaaa",
    A300: "#35363d",
    A400: "#303030",
    A700: "#616161",
  },
  text: {
    primary: "rgba(0, 0, 0, 0.87)",
    secondary: "rgba(0, 0, 0, 0.54)",
    disabled: "rgba(0, 0, 0, 0.38)",
    hint: "rgba(0, 0, 0, 0.38)",
  },
  background: {
    default: "#161b22",
    paper: "#fff",
  },
};

/**
 * Defines the font families and general font properties
 */
const font = {
  family: "Roboto, sans-serif",
  display: "Roboto, sans-serif",
  weight: {
    light: 300,
    regular: 400,
    medium: 500,
    bolder: 600,
    bold: 700,
  },
  size: {
    xs: "0.8em",
    s: "0.9em",
    m: "1em",
    l: "1.4em",
    xl: "2em",
  },
};

/**
 * Defines the zIndex values used across the app
 */
const zIndex = {
  mobileStepper: 1000,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,
};

/**
 * Creates the Theme
 */
let theme = {
  palette,
  font,
  zIndex,
};

export { theme as mainTheme };
