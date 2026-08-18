function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "#grand-pearl-marquee",
    name: "Grand Pearl Marquee",
    description:
      "Grand Pearl Marquee is a wedding and event venue located on Main Adyala Road in Rawalpindi, Pakistan.",
    telephone: [
      "+923335396888",
      "+92516139614",
    ],
    email: "grandpealmarquee01@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Near NADRA Office, Jarahi Stop, Main Adyala Road",
      addressLocality: "Rawalpindi",
      addressCountry: "PK",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}

export default LocalBusinessSchema;