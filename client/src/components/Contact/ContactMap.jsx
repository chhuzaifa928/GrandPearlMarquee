import "./ContactMap.css";

function ContactMap() {
  return (
    <section className="contact-map">

      <div className="container">

        <div
          className="section-heading"
          data-aos="fade-up"
        >
          <span>VISIT US</span>

          <h2>Find Grand Pearl Marquee</h2>

          <p>
            Visit our venue and meet our team to plan your perfect event.
          </p>
        </div>

        <div
          className="map-container"
          data-aos="zoom-in"
        >
          <iframe
            title="Grand Pearl Marquee Location"
            src="https://www.google.com/maps?q=Lahore,Pakistan&output=embed"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

      </div>

    </section>
  );
}

export default ContactMap;