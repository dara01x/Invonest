import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeEzoicAds } from "./lib/ezoicAds";

// Initialize Ezoic ads (after Ezoic approval, add your site ID here)
initializeEzoicAds({
  enabled: true,
  // siteId: 'YOUR_EZOIC_SITE_ID_HERE', // Add after Ezoic approval
});

createRoot(document.getElementById("root")!).render(<App />);
