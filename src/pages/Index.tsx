import { LandingPage } from "@/components/LandingPage";
import { useNavigate } from "react-router-dom";
import { useSEO } from "@/components/SEO";

const Index = () => {
  useSEO({
    title: 'Free Multilingual Invoice Generator',
    description: 'Create and download professional PDF invoices for free in English, Arabic or Kurdish. Full RTL support, custom branding, any currency, no signup required.',
  });

  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/invoice');
  };

  return <LandingPage onGetStarted={handleGetStarted} />;
};

export default Index;
