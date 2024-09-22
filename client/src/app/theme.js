import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
 palette: {
  mode: "light",
  primary: {
   main: "#000000",
  },
  secondary: {
   main: "#4cceac",
  },
  background: {
   default: "#fcfcfc",
   paper: "#E6E6E6",
  },
  text: {
   primary: "#141414",
   secondary: "#292929",
   yellow: "#f0c808", // Adjusted yellow
  },
  neutral: {
   dark: "#9a9a9a", // Adjusted.
   main: "#666666",
   light: "#e0e0e0",
  },
 },
 typography: {
  allVariants: {
   fontSize: 16,
   fontWeight: "normal",
  },
 },
});

export const darkTheme = createTheme({
 palette: {
  mode: "dark",
  primary: {
   main: "#ffffff",
  },
  secondary: {
   main: "#ffffff",
  },
  background: {
   default: "#141b2d",
   paper: "#1F2A40",
   main: "#f2f2f2",
  },
  text: {
   primary: "#e0e0e0",

   green: "#4cceac",
   yellow: "#fcfcfc", // Fixed missing #.
  },
  neutral: {
   dark: "#9a9a9a", // Adjusted.
   main: "#666666",
   light: "#e0e0e0",
  },
 },
 typography: {
  allVariants: {
   fontSize: 16,
   fontWeight: "normal",
  },
 },
});
