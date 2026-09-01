import { Layout } from "@/components/Layout";
import { InvoiceForm } from "@/components/InvoiceForm";
import { useNavigate } from "react-router-dom";
import { useSEO } from "@/components/SEO";

const Invoice = () => {
  useSEO({
    title: 'Create an Invoice',
    description: 'Enter your business and client details, add line items and tax, then download a professional PDF invoice instantly. Everything runs in your browser and stays private.',
  });

  const navigate = useNavigate();

  const handleSaveInvoice = (invoiceData: unknown) => {
    console.log('Saving invoice:', invoiceData);
    // TODO: Implement saving to IndexedDB
  };

  const handleBackToLanding = () => {
    navigate('/');
  };

  return (
    <Layout onBackToLanding={handleBackToLanding}>
      <InvoiceForm onSave={handleSaveInvoice} />
    </Layout>
  );
};

export default Invoice;
