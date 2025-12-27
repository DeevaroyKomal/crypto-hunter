import React from "react";

import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import CryptoContext from "./CryptoContext";
import "react-alice-carousel/lib/alice-carousel.css";
import "./chartConfig"; 


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <CryptoContext>
      <App />
    </CryptoContext>
  </BrowserRouter>
);
