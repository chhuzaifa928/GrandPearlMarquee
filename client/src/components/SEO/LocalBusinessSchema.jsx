import useWebsiteSettings from "../../hooks/useWebsiteSettings";
import { normalizePhone } from "../../utils/phoneUtils";

function LocalBusinessSchema() {
  const settings = useWebsiteSettings();

  if (!settings) {
    return null;
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "#grand-pearl-marquee",
    name: settings.website_name || "Grand Pearl Marquee",
    description:
      "Grand Pearl Marquee is a wedding and event venue located on Main Adyala Road in Rawalpindi, Pakistan.",
    telephone: normalizePhone(settings.phone),
    email: settings.email || "",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        settings.address ||
        "Grand Pearl Marquee, Main Adyala Road, Rawalpindi",
      addressLocality: "Rawalpindi",
      addressCountry: "PK",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export default LocalBusinessSchema;
