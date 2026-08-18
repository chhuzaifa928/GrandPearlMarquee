import { Outlet } from "react-router-dom";
import Navbar from "../components/Common/Navbar";
import Footer from "../components/Common/Footer";
import ScrollToTopButton from "../components/Common/ScrollToTopButton";
import WhatsAppButton from "../components/Common/WhatsAppButton";
import ScrollProgress from "../components/Common/ScrollProgress";
import LocalBusinessSchema from "../components/SEO/LocalBusinessSchema";
function MainLayout() {
  return (
    <>

  <LocalBusinessSchema />
  
  <ScrollProgress />

  <Navbar />

  <Outlet />

  <Footer />

  <ScrollToTopButton />

  <WhatsAppButton />

  
      </>
  );
}

export default MainLayout;