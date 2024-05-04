import { createTheme, responsiveFontSizes } from "@mui/material";
import { blue, red } from "@mui/material/colors";

let theme = createTheme({
  palette: {
    primary: blue,
    secondary: red,
  },
  typography: {
    fontFamily: ["Roboto", "Arial", "sans-serif"].join(","),
    fontSize: 16,
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
    },
  },
  breakpoints: {
    values: {
      xs: 0, // Extra small devices (phones)
      sm: 600, // Small devices (tablets)
      md: 960, // Medium devices (desktops)
      lg: 1280, // Large devices (desktops)
      xl: 1920, // Extra large devices (large desktops)
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
