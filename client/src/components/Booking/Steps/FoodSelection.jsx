import { useEffect, useState } from "react";
import getMediaUrl from "../../../utils/getMediaUrl";

import "./FoodSelection.css";

import {
  getPublicFoodCategories,
  getItems,
} from "../../../services/publicFoodService";

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
  let cancelled = false;

  const loadFoodData = async () => {
    try {
      const categoryData = await getPublicFoodCategories();
      const itemData = await getItems();

      if (!cancelled) {
        setCategories(categoryData);
        setItems(itemData);
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to load food data:", error);

      if (!cancelled) {
        setLoading(false);
      }
    }
  };

  loadFoodData();

  return () => {
    cancelled = true;
  };
}, []);

  // =================================
  // SELECT EXISTING FOOD
  // =================================

  const selectFood = (item) => {
    setFormData({
      ...formData,

      foodId: item.id,

      foodName: item.item_name,

      foodCategory: item.category_name,

      foodDescription: item.description || "",

      customFood: "",
    });
  };

  // =================================
  // SELECT CUSTOM FOOD
  // =================================

  const selectCustomFood = () => {
    setFormData({
      ...formData,

      foodId: "custom",

      foodName: "Custom Food",

      foodCategory: "Custom",

      foodDescription: "",

      customFood: formData.customFood || "",
    });
  };

  // =================================
  // CUSTOM FOOD CHANGE
  // =================================

  const handleCustomFoodChange = (event) => {
    setFormData({
      ...formData,

      customFood: event.target.value,
    });
  };

  // =================================
  // LOADING
  // =================================

  if (loading) {
    return (
      <div className="booking-card text-center">
        <div
          className="spinner-border text-warning"
          role="status"
        ></div>

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

      {/* =================================
          DATABASE FOOD CATEGORIES
      ================================= */}

      {categories.map((category) => {
        const categoryItems = items.filter(
          (item) =>
            item.category_name ===
            category.category_name
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
                    onClick={() =>
                      selectFood(item)
                    }
                  >
                    {item.image && (
                      <img
                        src={getMediaUrl(item.image)}
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

      {/* =================================
          CUSTOM FOOD
      ================================= */}

      <div className="custom-food-section mt-5">
        <h3>Custom Food</h3>

        <p>
          Can't find the menu you want?
          Create your own food selection.
        </p>

        <div
          className={`booking-package-card ${
            formData.foodId === "custom"
              ? "selected"
              : ""
          }`}
          onClick={selectCustomFood}
        >
          <div className="package-body">
            <span className="package-category">
              Custom
            </span>

            <h4>
              Create Your Own Menu
            </h4>

            <p>
              Enter the food items you would like
              for your event.
            </p>

            {/* =============================
                CUSTOM FOOD INPUT
            ============================= */}

            {formData.foodId === "custom" && (
              <div
                className="mt-3"
                onClick={(event) =>
                  event.stopPropagation()
                }
              >
                <label className="form-label">
                  Your Food Requirements
                </label>

                <textarea
                  className="form-control"
                  rows="6"
                  placeholder={
                    "Example:\nChicken Biryani\nMutton Karahi\nBBQ\nNaan\nSalad\nKheer"
                  }
                  value={
                    formData.customFood || ""
                  }
                  onChange={handleCustomFoodChange}
                />

                <small className="text-muted">
                  Write the food items you would
                  like for your event. The Grand
                  Pearl team will discuss the final
                  menu with you.
                </small>
              </div>
            )}

            {/* =============================
                SELECTED LABEL
            ============================= */}

            {formData.foodId === "custom" && (
              <div className="selected-label mt-3">
                ✓ Custom Food Selected
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =================================
          NO FOOD
      ================================= */}

      {categories.length === 0 && (
        <div className="alert alert-warning">
          No food menus are currently available.
        </div>
      )}

      {/* =================================
          NAVIGATION
      ================================= */}

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
          disabled={
            !formData.foodId ||
            (
              formData.foodId === "custom" &&
              !formData.customFood?.trim()
            )
          }
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default FoodSelection;

