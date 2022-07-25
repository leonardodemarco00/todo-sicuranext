import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Archive from "./components/Archive";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppProvider } from "./context";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const themeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};
const theme = extendTheme({ themeConfig });

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='/archivio' element={<Archive />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
