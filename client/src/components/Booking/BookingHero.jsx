import "./BookingHero.css";

function BookingHero() {
  return (
    <section className="booking-hero">

      <div className="booking-overlay"></div>

      <div
        className="container"
        data-aos="fade-up"
      >

        <div className="booking-content">

          <span className="hero-tag">
            BOOK YOUR EVENT
          </span>

          <h1>
           <span>Reserve Your
             Special Day</span>
          </h1>

          <p>
            Complete the booking request form below. Our management
            team will review your request, check availability, prepare
            your quotation and contact you through WhatsApp.
          </p>

        </div>

      </div>

    </section>
  );
}

export default BookingHero;