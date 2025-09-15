import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { SearchProvider } from "./components/SearchContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SearchProvider>
        <App />
      </SearchProvider>
    </BrowserRouter>
  </StrictMode>
);
