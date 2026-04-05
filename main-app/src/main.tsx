import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { PrototypeScaleProvider } from "./components/PrototypeScaleContext";
import { MainLayoutChromeProvider } from "./context/MainLayoutChromeContext";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <PrototypeScaleProvider>
      <MainLayoutChromeProvider>
        <App />
      </MainLayoutChromeProvider>
    </PrototypeScaleProvider>
  </BrowserRouter>
);
  