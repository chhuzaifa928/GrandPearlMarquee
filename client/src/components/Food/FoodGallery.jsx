import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import FoodMenuModal from "./FoodMenuModal";

import "./FoodGallery.css";

import { getItems } from "../../services/publicFoodService";
import { getPublicFoodCategories } from "../../services/publicFoodService";

function FoodGallery({ selectedCategory }) {

  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {

      const categoryData =
        await getPublicFoodCategories();

      const itemData =
        await getItems();

      setCategories(categoryData);
      setItems(itemData);

    } catch (error) {
      console.error(error);
    }
  };

  const filteredCategories =
    selectedCategory === "All"
      ? categories
      : categories.filter(
          (cat) =>
            cat.category_name === selectedCategory
        );

  return (
    <section className="food-gallery section-padding">

      <div className="container">

        {filteredCategories.map((category) => {

          const categoryItems = items.filter(
            (item) =>
              item.category_name ===
              category.category_name
          );

          return (

            <div
              key={category.id}
              className="mb-5"
            >

              <div className="row align-items-center mb-4">

                <div className="col-lg-5">

                  <img
  src={`http://localhost:5000${category.image}`}
  alt={category.category_name}
  className="img-fluid rounded shadow category-image"
/>

                </div>

                <div className="col-lg-7">

                  <h2 className="fw-bold mb-3">
                    {category.category_name}
                  </h2>

                  <div className="row">

                    {categoryItems.map((item) => (

                      <div
                        key={item.id}
                        className="col-md-6 mb-3"
                      >

                        <div className="food-card p-3 h-100">

                          <h5>
                            {item.item_name}
                          </h5>

                          <p>
                            {item.description}
                          </p>

                          <button
                            className="btn btn-outline-dark me-2"
                            data-bs-toggle="modal"
                            data-bs-target="#foodMenuModal"
                            onClick={() =>
                              setSelectedFood(item)
                            }
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

                    ))}

                  </div>

                </div>

              </div>

            </div>

          );

        })}

      </div>

      <FoodMenuModal
        selectedFood={selectedFood}
      />

    </section>
  );
}

export default FoodGallery;