import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeAdsTextRedirect } from "./lib/adsTextRedirect";

// Initialize ads.txt redirect handler
initializeAdsTextRedirect();

createRoot(document.getElementById("root")!).render(<App />);
