import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store/store.ts";
import "./index.css";
import "./utils/i18n/i18n.ts";
import Modal from "./components/modal/Modal.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Modal />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
