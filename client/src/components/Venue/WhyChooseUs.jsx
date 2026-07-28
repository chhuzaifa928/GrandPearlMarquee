import "./WhyChooseUs.css";
import {
  FaGem,
  FaUtensils,
  FaPalette,
  FaUsers,
  FaSnowflake,
  FaParking,
} from "react-icons/fa";

function WhyChooseUs() {
  const features = [
    {
      icon: <FaGem />,
      title: "Luxury Venue",
      text: "Elegant interiors designed for unforgettable celebrations.",
    },
    {
      icon: <FaUtensils />,
      title: "Premium Catering",
      text: "Delicious food menus prepared with exceptional quality.",
    },
    {
      icon: <FaPalette />,
      title: "Custom Decor",
      text: "Beautiful decor themes tailored to your special event.",
    },
    {
      icon: <FaUsers />,
      title: "Professional Team",
      text: "Experienced staff to make every event smooth and memorable.",
    },
    {
      icon: <FaSnowflake />,
      title: "Air Conditioned Hall",
      text: "Comfortable venue for every season and every occasion.",
    },
    {
      icon: <FaParking />,
      title: "Spacious Parking",
      text: "Convenient parking space for all your guests.",
    },
  ];

  return (
    <section className="why-section"
      data-aos="fade-up">
      <div className="container">

        <div className="section-title">
          <h2>Why Choose Grand Pearl?</h2>
          <p>
            Experience elegance, comfort, and professional event management
            for your most memorable celebrations.
          </p>
        </div>

        <div className="row">
          {features.map((item, index) => (
            <div className="col-lg-4 col-md-6 mb-4" key={index}>
              <div className="feature-card">
                <div className="feature-icon">
                  {item.icon}
                </div>

                <h4>{item.title}</h4>

                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;