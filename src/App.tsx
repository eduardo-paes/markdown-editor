import { CssBaseline, createTheme } from "@mui/material";
import React from "react";
import { ThemeProvider } from "styled-components";
import SecondaryEditor from "./pages/SecondaryEditor";

const theme = createTheme();

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <MainEditor /> */}
      <SecondaryEditor />
    </ThemeProvider>
  );
};

export default App;
