import "./ContactForm.css";

function ContactForm() {
  return (
    <section className="contact-form-section">

      <div className="container">

        <div className="row align-items-center">

          {/* Left Side */}

          <div
            className="col-lg-5 mb-5"
            data-aos="fade-right"
          >

            <span className="section-tag">
              SEND US A MESSAGE
            </span>

            <h2>
              Let's Discuss Your Special Event
            </h2>

            <p>
              Tell us about your upcoming event and our team will
              get back to you as soon as possible.
            </p>

            <ul className="contact-features">
              <li>✔ Fast Response</li>
              <li>✔ Professional Event Planning</li>
              <li>✔ Free Consultation</li>
              <li>✔ Custom Packages Available</li>
            </ul>

          </div>

          {/* Right Side */}

          <div
            className="col-lg-7"
            data-aos="fade-left"
          >

            <form className="contact-form">

              <div className="row">

                <div className="col-md-6 mb-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                  />
                </div>

                <div className="col-md-6 mb-4">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                  />
                </div>

                <div className="col-md-6 mb-4">
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Phone Number"
                  />
                </div>

                <div className="col-md-6 mb-4">
                  <select className="form-select">

                    <option>
                      Select Event
                    </option>

                    <option>Barat</option>
                    <option>Walima</option>
                    <option>Mehndi</option>
                    <option>Nikkah</option>
                    <option>Birthday</option>
                    <option>Corporate</option>

                  </select>
                </div>

                <div className="col-12 mb-4">

                  <input
                    type="date"
                    className="form-control"
                  />

                </div>

                <div className="col-12 mb-4">

                  <textarea
                    rows="6"
                    className="form-control"
                    placeholder="Tell us about your event..."
                  ></textarea>

                </div>

              </div>

              <button
                className="btn btn-gold"
                type="submit"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

      </div>

    </section>
  );
}

export default ContactForm;