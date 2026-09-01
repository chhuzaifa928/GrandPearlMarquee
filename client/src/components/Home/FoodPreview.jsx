import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getMediaUrl from "../../utils/getMediaUrl";

import { getPublicFoodCategories } from "../../services/publicFoodService";

import "./FoodPreview.css";

function FoodPreview() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getPublicFoodCategories();
        setCategories(data.slice(0, 4));
      } catch (error) {
        console.error(error);
      }
    };

    loadCategories();
  }, []);

  return (
    <section className="food-preview section-padding">

      <div className="container">

        <div className="section-title">

          <h2>Signature Catering</h2>

          <p>
            Choose from our carefully prepared food categories.
            During booking you can create your own custom menu.
          </p>

        </div>

        <div className="row">

          {categories.map((food) => (

            <div
              className="col-lg-3 col-md-6 mb-4"
              key={food.id}
            >

              <div className="food-card">

                <img
                  src={getMediaUrl(food.image)}
                  alt={food.category_name}
                />

                <div className="food-content">

                  <h4>{food.category_name}</h4>

                  <p>
                    Premium menu specially prepared for
                    {` ${food.category_name}`} events.
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

        <div className="text-center mt-4">

          <Link
            to="/food"
            className="btn btn-gold"
          >
            View Complete Menu
          </Link>

        </div>

      </div>

    </section>
  );
}

export default FoodPreview;