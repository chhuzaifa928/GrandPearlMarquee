import ContactHero from "../../components/Contact/ContactHero";
import ContactInfo from "../../components/Contact/ContactInfo";
import ContactForm from "../../components/Contact/ContactForm";
import ContactMap from "../../components/Contact/ContactMap";
import FAQ from "../../components/Contact/FAQ";
import ContactCTA from "../../components/Contact/ContactCTA";

function Contact() {
  return (
    <div className="contact-page">
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <ContactMap />
      <FAQ />
      <ContactCTA />
    </div>
  );
}

export default Contact;