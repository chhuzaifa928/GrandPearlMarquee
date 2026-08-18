import SEO from "../../components/SEO/SEO";

import ContactHero from "../../components/Contact/ContactHero";
import ContactInfo from "../../components/Contact/ContactInfo";
import ContactForm from "../../components/Contact/ContactForm";
import ContactMap from "../../components/Contact/ContactMap";
import FAQ from "../../components/Contact/FAQ";
import ContactCTA from "../../components/Contact/ContactCTA";

function Contact() {
  return (
    <>
      <SEO
        title="Contact Grand Pearl Marquee | Rawalpindi Wedding Venue"
        description="Contact Grand Pearl Marquee in Rawalpindi for wedding and event bookings, venue information, décor, food and event services. Located near Nadra Office, Jarahi Stop, Main Adyala Road."
        keywords="contact Grand Pearl Marquee, Grand Pearl Marquee Rawalpindi, wedding venue Rawalpindi contact, marquee Main Adyala Road, wedding hall Rawalpindi"
      />

      <div className="contact-page">
        <ContactHero />

        <ContactInfo />

        <ContactForm />

        <ContactMap />

        <FAQ />

        <ContactCTA />
      </div>
    </>
  );
}

export default Contact;