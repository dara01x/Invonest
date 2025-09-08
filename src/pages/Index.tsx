import { useState } from 'react';
import { Layout } from "@/components/Layout";
import { InvoiceForm } from "@/components/InvoiceForm";
import { LandingPage } from "@/components/LandingPage";
import { NavigationProvider } from "@/contexts/NavigationContext";

const AppContent = () => {
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);

  const handleSaveInvoice = (invoiceData: unknown) => {
    console.log('Saving invoice:', invoiceData);
    // TODO: Implement saving to IndexedDB
  };

  const handleGetStarted = () => {
    setShowInvoiceForm(true);
  };

  const handleBackToLanding = () => {
    setShowInvoiceForm(false);
  };

  if (!showInvoiceForm) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  return (
    <Layout onBackToLanding={handleBackToLanding}>
      <InvoiceForm onSave={handleSaveInvoice} />
    </Layout>
  );
};

const Index = () => {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
};

export default Index;
