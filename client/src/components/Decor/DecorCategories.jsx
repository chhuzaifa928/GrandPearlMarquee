import { useEffect, useState } from "react";
import "./DecorGallery.css";
import { getDecor } from "../../services/publicDecorService";

function DecorCategories({
  selectedCategory,
  setSelectedCategory,
}) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const decor = await getDecor();

        const uniqueCategories = [
          ...new Set(decor.map((item) => item.category)),
        ];

        setCategories(uniqueCategories);
      } catch (error) {
        console.error(error);
      }
    };

    loadCategories();
  }, []);

  return (
    <section className="decor-categories section-padding">
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
          <button
            className={
              selectedCategory === "All"
                ? "category-btn active"
                : "category-btn"
            }
            onClick={() => setSelectedCategory("All")}
          >
            All
          </button>

          {categories.map((category) => (
            <button
              key={category}
              className={
                selectedCategory === category
                  ? "category-btn active"
                  : "category-btn"
              }
              onClick={() => setSelectedCategory(category)}
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