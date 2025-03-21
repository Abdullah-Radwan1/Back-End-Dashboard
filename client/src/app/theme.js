import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2", // A classic blue for primary actions
    },
    secondary: {
      main: "#4cceac", // A vibrant teal for secondary actions
    },
    background: {
      default: "#f5f5f5", // Light gray for the background
      paper: "#ffffff", // White for paper surfaces
    },
    text: {
      primary: "#1a1a1a", // Dark gray for primary text
      secondary: "#4a4a4a", // Medium gray for secondary text
    },
    neutral: {
      dark: "#757575", // Dark gray for neutral elements
      main: "#bdbdbd", // Medium gray for neutral elements
      light: "#e0e0e0", // Light gray for neutral elements
    },
    error: {
      main: "#d32f2f", // Red for error states
    },
    warning: {
      main: "#ffa726", // Orange for warning states
    },
    info: {
      main: "#29b6f6", // Light blue for info states
    },
    success: {
      main: "#66bb6a", // Green for success states
    },
  },
  typography: {
    allVariants: {
      fontSize: 16,
      fontWeight: "normal",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9", // Light blue for primary actions
    },
    secondary: {
      main: "#4cceac", // Same vibrant teal for consistency
    },
    background: {
      default: "#121212", // Dark gray for the background
      paper: "#1e1e1e", // Slightly lighter gray for paper surfaces
    },
    text: {
      primary: "#e0e0e0", // Light gray for primary text
      secondary: "#b0b0b0", // Medium gray for secondary text
    },
    neutral: {
      dark: "#757575", // Dark gray for neutral elements
      main: "#bdbdbd", // Medium gray for neutral elements
      light: "#e0e0e0", // Light gray for neutral elements
    },
    error: {
      main: "#f44336", // Red for error states
    },
    warning: {
      main: "#ffa726", // Orange for warning states
    },
    info: {
      main: "#29b6f6", // Light blue for info states
    },
    success: {
      main: "#66bb6a", // Green for success states
    },
  },
  typography: {
    allVariants: {
      fontSize: 16,
      fontWeight: "normal",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  },
});
