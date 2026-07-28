import "./EventCategories.css";
import { Link } from "react-router-dom";

import barat from "../../assets/images/events/barat.jpg";
import walima from "../../assets/images/events/walima.jpg";
import mehndi from "../../assets/images/events/mehndi.jpg";
import birthday from "../../assets/images/events/birthday.jpg";
import bridal from "../../assets/images/events/bridal-shower.jpg";
import corporate from "../../assets/images/events/corporate.jpg";

function EventCategories() {
  const events = [
    {
      title: "Barat",
      image: barat,
      description: "Elegant wedding decor for your special Barat ceremony.",
    },
    {
      title: "Walima",
      image: walima,
      description: "Luxury Walima themes with premium decorations.",
    },
    {
      title: "Mehndi",
      image: mehndi,
      description: "Colourful Mehndi setups full of tradition and joy.",
    },
    {
      title: "Birthday",
      image: birthday,
      description: "Creative birthday celebrations for every age.",
    },
    {
      title: "Bridal Shower",
      image: bridal,
      description: "Beautiful bridal shower themes with elegant styling.",
    },
    {
      title: "Corporate Events",
      image: corporate,
      description: "Professional venue for meetings and corporate events.",
    },
  ];

  return (
    <section className="events-section"
    data-aos="fade-up">
      <div className="container">

        <div className="section-title">
          <h2>Our Event Categories</h2>
          <p>
            Celebrate every special occasion at Grand Pearl Marquee.
          </p>
        </div>

        <div className="row">

          {events.map((event, index) => (
            <div className="col-lg-4 col-md-6 mb-4" key={index}>

              <div className="event-card">

                <img
                  src={event.image}
                  alt={event.title}
                />

                <div className="event-content">

                  <h4>{event.title}</h4>

                  <p>{event.description}</p>

                  <Link
                    to="/decor"
                    className="btn btn-gold"
                  >
                    View Decor
                  </Link>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default EventCategories;