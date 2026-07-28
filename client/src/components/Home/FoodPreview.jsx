import "./FoodPreview.css";
import { Link } from "react-router-dom";

import pakistani from "../../assets/images/food/pakistani.jpg";
import chinese from "../../assets/images/food/chinese.jpg";
import bbq from "../../assets/images/food/bbq.jpg";
import desserts from "../../assets/images/food/dessert.jpg";

function FoodPreview() {
  const foodCategories = [
    {
      title: "Pakistani Cuisine",
      image: pakistani,
      description: "Traditional dishes including Karahi, Biryani, Qorma and more."
    },
    {
      title: "Chinese Cuisine",
      image: chinese,
      description: "Delicious Chinese dishes prepared with premium ingredients."
    },
    {
      title: "BBQ Specials",
      image: bbq,
      description: "Fresh BBQ platters including Tikka, Seekh Kabab and Malai Boti."
    },
    {
      title: "Desserts",
      image: desserts,
      description: "A variety of desserts to complete every celebration."
    }
  ];

  return (
    <section className="food-preview">
      <div className="container">

        <div className="section-title">
          <h2>Signature Catering</h2>
          <p>
            Choose from our carefully prepared food categories.
            During booking you can create your own custom menu.
          </p>
        </div>

        <div className="row">

          {foodCategories.map((food, index) => (
            <div className="col-lg-3 col-md-6 mb-4" key={index}>

              <div className="food-card">

                <img
                  src={food.image}
                  alt={food.title}
                />

                <div className="food-content">

                  <h4>{food.title}</h4>

                  <p>{food.description}</p>

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