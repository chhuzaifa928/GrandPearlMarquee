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
           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3325.2757008890358!2d73.05170867473058!3d33.546212444282304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df93e17a97d6ef%3A0x2516835ea0b231b3!2sGrand%20Pearl%20Marquee!5e0!3m2!1sen!2s!4v1785521994612!5m2!1sen!2s"
          width="100%"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

      </div>

    </section>
  );
}

export default ContactMap;