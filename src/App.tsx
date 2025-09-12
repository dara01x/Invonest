import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import ErrorBoundary from "@/components/ErrorBoundary";
import { SkipToContent } from "@/components/AccessibilityComponents";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { NavigationProvider } from "@/contexts/NavigationContext";
import SEO from "@/components/SEO";
import { initializeGA4 } from "@/lib/analytics";
import Index from "./pages/Index";
import Invoice from "./pages/Invoice";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

const App = () => {
  // Initialize Google Analytics
  useEffect(() => {
    const measurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID;
    if (measurementId) {
      initializeGA4(measurementId);
    }
  }, []);

  return (
    <ErrorBoundary>
      <LanguageProvider>
        <NavigationProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange={false}
          >
            <TooltipProvider>
              <SEO />
              <SkipToContent />
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <main id="main-content" role="main">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/invoice" element={<Invoice />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </BrowserRouter>
            </TooltipProvider>
          </ThemeProvider>
        </NavigationProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
};

export default App;
