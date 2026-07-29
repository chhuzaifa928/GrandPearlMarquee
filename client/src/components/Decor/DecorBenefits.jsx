import "./DecorBenefits.css";
import {
  FaPalette,
  FaGem,
  FaLeaf,
  FaUsers,
} from "react-icons/fa";

function DecorBenefits() {
  const benefits = [
    {
      icon: <FaPalette />,
      title: "Creative Designs",
      text: "Unique themes crafted to match every celebration."
    },
    {
      icon: <FaGem />,
      title: "Premium Quality",
      text: "Luxury floral arrangements and elegant stage setups."
    },
    {
      icon: <FaLeaf />,
      title: "Custom Decoration",
      text: "Personalised décor tailored to your vision and budget."
    },
    {
      icon: <FaUsers />,
      title: "Expert Team",
      text: "Professional decorators ensuring every detail is perfect."
    }
  ];

  return (
    <section className="decor-benefits">
      <div className="container">

        <div
          className="section-heading"
          data-aos="fade-up"
        >
          <span>WHY CHOOSE US</span>

          <h2>Luxury Decoration Experience</h2>

          <p>
            Every event deserves a memorable atmosphere. Our experienced
            team transforms your ideas into elegant celebrations.
          </p>
        </div>

        <div className="row">

          {benefits.map((item, index) => (

            <div
              className="col-lg-3 col-md-6 mb-4"
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >

              <div className="benefit-card">

                <div className="benefit-icon">
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

export default DecorBenefits;