import { useState } from "react";
import { sendContactMessage } from "../../services/publicContactService";
import { useToast } from "../../hooks/useToast";
import "./ContactForm.css";

function ContactForm() {
  const toast = useToast();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await sendContactMessage(formData);

      toast.success("Message sent successfully!");

      setFormData({
        full_name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

    } catch (error) {
      console.error(error);
      toast.error("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-form-section">
      <div className="container">

        <div className="row align-items-center">

          <div className="col-lg-5 mb-5">

            <span className="section-tag">
              SEND US A MESSAGE
            </span>

            <h2>Let's Discuss Your Special Event</h2>

            <p>
              Tell us about your upcoming event and our team
              will contact you soon.
            </p>

          </div>

          <div className="col-lg-7">

            <form
              className="contact-form"
              onSubmit={handleSubmit}
            >

              <div className="row">

                <div className="col-md-6 mb-4">

                  <input
                    type="text"
                    name="full_name"
                    className="form-control"
                    placeholder="Full Name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="col-md-6 mb-4">

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="col-md-6 mb-4">

                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="col-md-6 mb-4">

                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="col-12 mb-4">

                  <textarea
                    rows="6"
                    name="message"
                    className="form-control"
                    placeholder="Tell us about your event..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              <button
                className="btn btn-gold"
                type="submit"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}

export default ContactForm;