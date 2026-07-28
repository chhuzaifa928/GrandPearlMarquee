import "./BookingSteps.css";
import {
  FaUser,
  FaCalendarAlt,
  FaUsers,
  FaDoorOpen,
  FaPalette,
  FaUtensils,
  FaSnowflake,
  FaClipboardCheck,
  FaGlassCheers,
} from "react-icons/fa";

function BookingSteps() {
  const steps = [
    {
      icon: <FaUser />,
      title: "Personal Information",
      text: "Enter your name, phone number and email.",
    },
    {
      icon: <FaGlassCheers />,
      title: "Choose Event Type",
      text: "Barat, Walima, Mehndi, Birthday or any other event.",
    },
    {
      icon: <FaCalendarAlt />,
      title: "Preferred Date",
      text: "Choose your preferred event date.",
    },
    {
      icon: <FaUsers />,
      title: "Guests & VIPs",
      text: "Enter guest count and VIP seating requirements.",
    },
    {
      icon: <FaDoorOpen />,
      title: "Partition",
      text: "Choose whether you need a partition.",
    },
    {
      icon: <FaPalette />,
      title: "Select Decor",
      text: "Choose your favourite decor theme.",
    },
    {
      icon: <FaUtensils />,
      title: "Food Menu",
      text: "Build your own custom food menu.",
    },
    {
      icon: <FaSnowflake />,
      title: "Additional Services",
      text: "AC, Heater, Sound System, Dance Floor & Fireworks.",
    },
    {
      icon: <FaClipboardCheck />,
      title: "Submit Request",
      text: "Our team will contact you with a quotation.",
    },
  ];

  return (
    <section className="booking-steps"
     data-aos="fade-up">
      <div className="container">

        <div className="section-title">
          <h2>Book Your Event in 9 Simple Steps</h2>
          <p>
            A simple booking process designed to help you plan your perfect event.
          </p>
        </div>

        <div className="row">
          {steps.map((step, index) => (
            <div className="col-lg-4 col-md-6 mb-4" key={index}>
              <div className="step-card">
                <div className="step-number">{index + 1}</div>
                <div className="step-icon">{step.icon}</div>
                <h4>{step.title}</h4>
                <p>{step.text}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default BookingSteps;