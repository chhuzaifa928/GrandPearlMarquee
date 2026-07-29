import { useState } from "react";
import FoodMenuModal from "./FoodMenuModal";
import "./FoodGallery.css";
import { Link } from "react-router-dom";
import foodData from "../../data/foodData";

function FoodGallery({ selectedCategory }) {
  const [selectedFood, setSelectedFood] = useState(null);
    const filteredFood =
    selectedCategory === "All"
      ? foodData
      : foodData.filter(
          (item) => item.category === selectedCategory
        );

  return (
    <section className="food-gallery">
      <div className="container">

        <div className="row">

          {filteredFood.map((item, index) => (

            <div
              className="col-lg-4 col-md-6 mb-4"
              key={item.id}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >

              <div className="food-card">

                <img
                  src={item.image}
                  alt={item.title}
                />

                <div className="food-info">

  <span className="food-category">
    {item.category}
  </span>

  <h4>{item.title}</h4>

  <div className="dish-count">
    🍽 {item.dishes} Dishes Included
  </div>

  <p>{item.description}</p>

  <div className="food-highlights">

    <span>✔ Fresh Ingredients</span>

    <span>✔ Professional Catering</span>

    <span>✔ Hygienically Prepared</span>

  </div>

  <div className="food-buttons">

    <button
      className="btn btn-outline-dark"
      data-bs-toggle="modal"
      data-bs-target="#foodMenuModal"
      onClick={() => setSelectedFood(item)}
    >
      View Menu
    </button>

    <Link
      to="/booking"
      className="btn btn-gold"
    >
      Book Package
    </Link>

  </div>

</div>

              </div>

            </div>

          ))}

        </div>

      </div>
      <FoodMenuModal selectedFood={selectedFood} />
    </section>
  );
}

export default FoodGallery;