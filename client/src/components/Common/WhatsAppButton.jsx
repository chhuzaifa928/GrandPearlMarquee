import "./WhatsAppButton.css";
import { FaWhatsapp } from "react-icons/fa";

function WhatsAppButton() {
  // Replace this later with the real Grand Pearl Marquee number
  const phone = "923001234567";

  return (
    <a
      href={`https://wa.me/${phone}`}
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