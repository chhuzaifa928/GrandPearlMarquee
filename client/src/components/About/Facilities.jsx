import "./Facilities.css";

import hall from "../../assets/images/about/hall.jpg";
import lawn from "../../assets/images/about/lawn.jpg";
import catering from "../../assets/images/about/catering.jpg";
import parking from "../../assets/images/about/parking.jpg";

function Facilities() {

  const facilities = [
    {
      title: "Luxury Event Halls",
      image: hall,
      description:
        "Spacious, fully air-conditioned halls designed for elegant weddings and grand celebrations."
    },
    {
      title: "Beautiful Outdoor Lawn",
      image: lawn,
      description:
        "A stunning outdoor space perfect for engagements, birthdays, receptions and family events."
    },
    {
      title: "Premium Catering",
      image: catering,
      description:
        "Delicious cuisine prepared by experienced chefs with customizable menus for every event."
    },
    {
      title: "Secure Parking",
      image: parking,
      description:
        "Large and secure parking area ensuring comfort and convenience for every guest."
    }
  ];

  return (
    <section className="facilities-section">

      <div className="container">

        <div className="section-heading" data-aos="fade-up">

          <span>OUR FACILITIES</span>

          <h2>Everything You Need For A Perfect Event</h2>

          <p>
            We provide premium facilities designed to make every
            celebration comfortable, elegant and unforgettable.
          </p>

        </div>

        <div className="row">

          {facilities.map((facility, index) => (

            <div
              className="col-lg-3 col-md-6 mb-4"
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >

              <div className="facility-card">

                <img
                  src={facility.image}
                  alt={facility.title}
                />

                <div className="facility-content">

                  <h4>{facility.title}</h4>

                  <p>{facility.description}</p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Facilities;
