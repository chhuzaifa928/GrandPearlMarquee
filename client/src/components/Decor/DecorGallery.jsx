import "./DecorGallery.css";
import { Link } from "react-router-dom";
import decorData from "../../data/decorData";

function DecorGallery({ selectedCategory }) {
  const filteredDecor =
    selectedCategory === "All"
      ? decorData
      : decorData.filter(
          (item) => item.category === selectedCategory
        );

  return (
    <section className="decor-gallery">
      <div className="container">
        <div className="section-heading" data-aos="fade-up">
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
              className="col-lg-4 col-md-6 mb-4"
              key={item.id}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <div className="decor-card">
                <img src={item.image} alt={item.title} />

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