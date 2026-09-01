import "./ContactInfo.css";
import useWebsiteSettings from "../../hooks/useWebsiteSettings";

function ContactInfo() {
  const settings = useWebsiteSettings();

  const contactDetails = [
    {
      icon: "📍",
      title: "Our Location",
      info: settings?.address
    },
    {
      icon: "📞",
      title: "Phone Number",
      info: settings?.phone
    },
    {
      icon: "📧",
      title: "Email Address",
      info: settings?.email
    },
    {
      icon: "💬",
      title: "WhatsApp",
      info: settings?.whatsapp
    }
  ];

  return (
    <section className="contact-info">

      <div className="container">

        <div
          className="section-heading"
          data-aos="fade-up"
        >
          <span>CONTACT DETAILS</span>

          <h2>We're Always Here to Help</h2>

          <p>
            Have questions about your event? Reach out to our team
            through any of the following contact methods.
          </p>

        </div>

        <div className="row">

          {contactDetails.map((item, index) => (

            <div
              className="col-lg-3 col-md-6 mb-4"
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >

              <div className="contact-card">

                <div className="contact-icon">
                  {item.icon}
                </div>

                <h4>{item.title}</h4>

                <p>{item.info}</p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default ContactInfo;