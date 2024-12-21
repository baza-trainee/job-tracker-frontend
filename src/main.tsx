import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./store/store.ts";
import "./index.css";
import "./utils/i18n/i18n.ts";
import Modal from "./components/modal/Modal.tsx";

import NotificationContainer from "./components/Notifications/NotificationContainer.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
          <Modal />
          <NotificationContainer />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
