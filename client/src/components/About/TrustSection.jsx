import "./TrustSection.css";
import {
  FaAward,
  FaCalendarCheck,
  FaSmile,
  FaStar
} from "react-icons/fa";

function TrustSection() {

  const stats = [
    {
      icon: <FaAward />,
      number: "15+",
      title: "Years of Experience",
      text: "Delivering unforgettable celebrations."
    },
    {
      icon: <FaCalendarCheck />,
      number: "5000+",
      title: "Successful Events",
      text: "From weddings to corporate gatherings."
    },
    {
      icon: <FaSmile />,
      number: "98%",
      title: "Happy Clients",
      text: "Families who trust our services."
    },
    {
      icon: <FaStar />,
      number: "Premium",
      title: "Service Quality",
      text: "Luxury hospitality with attention to detail."
    }
  ];

  return (
    <section className="trust-section">
      <div className="container">

        <div className="section-heading" data-aos="fade-up">
          <span>WHY CHOOSE US</span>

          <h2>Why Families Trust Grand Pearl Marquee</h2>

          <p>
            Every celebration deserves perfection. Our commitment to
            excellence, hospitality, and elegant event management makes
            Grand Pearl Marquee a preferred destination for unforgettable
            occasions.
          </p>
        </div>

        <div className="row">

          {stats.map((item, index) => (

            <div
              className="col-lg-3 col-md-6 mb-4"
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >

              <div className="trust-card">

                <div className="trust-icon">
                  {item.icon}
                </div>

                <h3>{item.number}</h3>

                <h5>{item.title}</h5>

                <p>{item.text}</p>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default TrustSection;