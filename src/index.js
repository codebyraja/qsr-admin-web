import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import "../src/style/css/feather.css";
import "../src/style/css/line-awesome.min.css";
import "../src/style/icons/tabler-icons/webfont/tabler-icons.css";
import "../src/style/scss/main.scss";
import "../src/customStyle.scss";
import "../src/style/icons/fontawesome/css/fontawesome.min.css";
import "../src/style/icons/fontawesome/css/all.min.css";
import "../src/style/fonts/feather/css/iconfont.css";

import "./i18n"; // Import the i18n config
import { base_path } from "./environment.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import store from "./core/redux/store.jsx";
import AllRoutes from "./Router/router.jsx";
// All Community Features
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    // <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={base_path}>
        <AllRoutes />
      </BrowserRouter>
    </Provider>
    // </React.StrictMode>
  );
} else {
  console.error("Element with id 'root' not found.");
}
