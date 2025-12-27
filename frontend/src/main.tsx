import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/store.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Toaster
        toastOptions={{
          duration: 3000, // 3 seconds timeout for all toasts
          position: "top-right"
        }}
      />
    </BrowserRouter>
  </Provider>
);
