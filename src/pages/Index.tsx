import { LandingPage } from "@/components/LandingPage";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/invoice');
  };

  return <LandingPage onGetStarted={handleGetStarted} />;
};

export default Index;
