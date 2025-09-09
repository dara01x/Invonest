import { Layout } from "@/components/Layout";
import { InvoiceForm } from "@/components/InvoiceForm";
import { useNavigate } from "react-router-dom";

const Invoice = () => {
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
