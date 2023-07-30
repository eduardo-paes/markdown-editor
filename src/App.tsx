import { CssBaseline, createTheme } from "@mui/material";
import React from "react";
import { ThemeProvider } from "styled-components";
import Home from "./pages/Home";

const theme = createTheme();

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Home />
    </ThemeProvider>
  );
};

export default App;
