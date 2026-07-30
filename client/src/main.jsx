import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/packageCards.css";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Bootstrap JavaScript
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import AOS from "aos";
import "aos/dist/aos.css";

import App from "./App";
import "./styles/global.css";

AOS.init({
  duration: 900,
  once: true,
  easing: "ease-in-out",
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);