import "./WhatsAppButton.css";
import { FaWhatsapp } from "react-icons/fa";
import useWebsiteSettings from "../../hooks/useWebsiteSettings";
import { normalizePhone } from "../../utils/phoneUtils";

function WhatsAppButton() {
  const settings = useWebsiteSettings();
  const whatsappNumber = normalizePhone(settings?.whatsapp);

  if (!whatsappNumber) {
    return null;
  }

  return (
    <a
      href={`https://wa.me/${whatsappNumber}`}
      className="whatsapp-button"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp />
    </a>
  );
}

export default WhatsAppButton;