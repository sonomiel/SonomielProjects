import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";

import "./index.css";
import { PermisosProvider } from "./components/context/permisoscontext"
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PermisosProvider>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </PermisosProvider>
  </StrictMode>
);
