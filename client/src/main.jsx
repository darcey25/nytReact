import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// The old Create React App build registered a cache-first service worker.
// Remove it so returning visitors get the current build.
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .getRegistrations()
    .then(registrations => registrations.forEach(r => r.unregister()))
    .catch(() => {});
}
