import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import ErrorBoundary from "@/components/ErrorBoundary";
import { SkipToContent } from "@/components/AccessibilityComponents";
import { LanguageProvider } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const App = () => (
  <ErrorBoundary>
    <LanguageProvider>
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
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </LanguageProvider>
  </ErrorBoundary>
);

export default App;
