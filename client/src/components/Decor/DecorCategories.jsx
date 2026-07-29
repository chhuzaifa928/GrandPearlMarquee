import "./DecorGallery.css";
import { Link } from "react-router-dom";
import decorData from "../../data/decorData";

function DecorCategories({ selectedCategory, setSelectedCategory }) {
  const categories = [
    "All",
    "Barat",
    "Walima",
    "Mehndi",
    "Nikkah",
    "Birthday",
    "Engagement",
    "Corporate",
    "Custom"
  ];

  return (
    <section className="decor-categories">
      <div className="container">

        <div
          className="section-heading"
          data-aos="fade-up"
        >
          <span>DECOR COLLECTIONS</span>

          <h2>Choose Your Event Style</h2>

          <p>
            Browse our luxury décor themes designed for every celebration.
          </p>
        </div>

        <div
          className="category-buttons"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category
                  ? "category-btn active"
                  : "category-btn"
              }
            >
              {category}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}

export default DecorCategories;