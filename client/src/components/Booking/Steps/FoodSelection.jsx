import { useEffect, useState } from "react";
import "./FoodSelection.css";

import { getPublicFoodCategories, getItems } from "../../../services/publicFoodService";

function FoodSelection({
  formData,
  setFormData,
  nextStep,
  prevStep,
}) {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFoodData();
  }, []);

  const loadFoodData = async () => {
    try {
      const categoryData = await getPublicFoodCategories();
      const itemData = await getItems();

      setCategories(categoryData);
      setItems(itemData);
    } catch (error) {
      console.error("Failed to load food data:", error);
    } finally {
      setLoading(false);
    }
  };

  const selectFood = (item) => {
    setFormData({
      ...formData,

      foodId: item.id,

      foodName: item.item_name,

      foodCategory: item.category_name,

      foodDescription: item.description || "",
    });
  };

  if (loading) {
    return (
      <div className="booking-card text-center">
        <div className="spinner-border text-warning" role="status"></div>

        <p className="mt-3">
          Loading food menus...
        </p>
      </div>
    );
  }

  return (
    <div className="booking-card">

      <h2>Select Food Menu</h2>

      <p>
        Choose your preferred food menu for your event.
        Food prices are not displayed.
      </p>

      {categories.map((category) => {

        const categoryItems = items.filter(
          (item) =>
            item.category_name === category.category_name
        );

        if (categoryItems.length === 0) {
          return null;
        }

        return (
          <div
            key={category.id}
            className="mb-5"
          >

            <h3 className="mb-4">
              {category.category_name}
            </h3>

            <div className="row">

              {categoryItems.map((item) => (

                <div
                  className="col-lg-4 col-md-6 mb-4"
                  key={item.id}
                >

                  <div
                    className={`booking-package-card ${
                      formData.foodId === item.id
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => selectFood(item)}
                  >

                    {item.image && (
                      <img
                        src={`http://localhost:5000${item.image}`}
                        alt={item.item_name}
                        className="img-fluid"
                      />
                    )}

                    <div className="package-body">

                      <span className="package-category">
                        {item.category_name}
                      </span>

                      <h4>
                        {item.item_name}
                      </h4>

                      {item.description && (
                        <p>
                          {item.description}
                        </p>
                      )}

                      {formData.foodId === item.id && (
                        <div className="selected-label">
                          ✓ Selected
                        </div>
                      )}

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>
        );
      })}

      {categories.length === 0 && (
        <div className="alert alert-warning">
          No food menus are currently available.
        </div>
      )}

      <div className="d-flex justify-content-between mt-4">

        <button
          type="button"
          className="btn btn-secondary"
          onClick={prevStep}
        >
          ← Previous
        </button>

        <button
          type="button"
          className="btn btn-gold"
          onClick={nextStep}
          disabled={!formData.foodId}
        >
          Next →
        </button>

      </div>

    </div>
  );
}

export default FoodSelection;