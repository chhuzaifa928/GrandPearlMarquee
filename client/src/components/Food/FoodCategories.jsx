import "./FoodCategories.css";
import foodData from "../../data/foodData";

function FoodCategories({
  selectedCategory,
  setSelectedCategory,
}) {

  const categories = [
    "All",
    ...new Set(foodData.map((item) => item.category)),
  ];

  return (
    <section className="food-categories">
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

export default FoodCategories;