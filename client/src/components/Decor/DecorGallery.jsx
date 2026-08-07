import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./DecorGallery.css";

import { getDecor } from "../../services/publicDecorService";

function DecorGallery({ selectedCategory }) {

  const [decor, setDecor] = useState([]);

  useEffect(() => {
    loadDecor();
  }, []);

  const loadDecor = async () => {
    try {
      const data = await getDecor();
      setDecor(data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredDecor =
    selectedCategory === "All"
      ? decor
      : decor.filter(
          (item) =>
            item.category === selectedCategory
        );

  return (
    <section className="decor-gallery section-padding">

      <div className="container">

        <div className="section-title">

          <span>OUR DECOR COLLECTION</span>

          <h2>Luxury Event Decorations</h2>

          <p>
            Explore our carefully crafted décor collections designed
            for every special occasion.
          </p>

        </div>

        <div className="row">

          {filteredDecor.map((item, index) => (

            <div
              key={item.id}
              className="col-lg-4 col-md-6 mb-4"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >

              <div className="decor-card">

                <img
                  src={`http://localhost:5000${item.image}`}
                  alt={item.title}
                />

                <div className="decor-info">

                  <span>{item.category}</span>

                  <h4>{item.title}</h4>

                  <p>{item.description}</p>

                  <Link
                    to="/booking"
                    className="btn btn-gold"
                  >
                    Book This Decor
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

export default DecorGallery;