import React from "react";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Homepage from "./Pages/Homepage";
import CoinPage from "./Pages/CoinPage";
import CustomAlert from "./components/Alert";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fff",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path="/" Component={Homepage} />
        <Route path="/coins/:id" Component={CoinPage} />
      </Routes>
      <CustomAlert />
    </ThemeProvider>
  );
}

export default App;
