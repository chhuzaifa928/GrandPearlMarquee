import { useEffect, useState } from "react";
import "./FoodCategories.css";
import { getPublicFoodCategories } from "../../services/publicFoodService";

function FoodCategories({
  selectedCategory,
  setSelectedCategory,
}) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getPublicFoodCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="food-categories section-padding">

      <div className="container">

        <div
          className="section-heading"
          data-aos="fade-up"
        >
          <span>CATERING PACKAGES</span>

          <h2>Choose Your Event Menu</h2>

          <p>
            Select an event type to explore our premium catering packages.
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
              key={category.id}
              className={
                selectedCategory === category.category_name
                  ? "category-btn active"
                  : "category-btn"
              }
              onClick={() =>
                setSelectedCategory(category.category_name)
              }
            >
              {category.category_name}
            </button>

          ))}

        </div>

      </div>

    </section>
  );
}

export default FoodCategories;