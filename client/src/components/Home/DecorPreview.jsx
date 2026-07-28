import "./DecorPreview.css";
import { Link } from "react-router-dom";

import barat from "../../assets/images/decor/barat.jpg";
import walima from "../../assets/images/decor/walima.jpg";
import mehndi from "../../assets/images/decor/mehndi.jpg";
import engagement from "../../assets/images/decor/engagement.jpg";
import birthday from "../../assets/images/decor/birthday.jpg";
import bridal from "../../assets/images/decor/bridal-shower.jpg";

function DecorPreview() {
  const decorImages = [
    { title: "Barat", image: barat },
    { title: "Walima", image: walima },
    { title: "Mehndi", image: mehndi },
    { title: "Engagement", image: engagement },
    { title: "Birthday", image: birthday },
    { title: "Bridal Shower", image: bridal },
  ];

  return (
    <section className="decor-preview"
     data-aos="fade-up">
      <div className="container">

        <div className="section-title">
          <h2>Our Premium Decor Collection</h2>
          <p>
            Elegant themes crafted to make every celebration unforgettable.
          </p>
        </div>

        <div className="row">

          {decorImages.map((item, index) => (
            <div className="col-lg-4 col-md-6 mb-4" key={index}>

              <div className="decor-card">

                <img
                  src={item.image}
                  alt={item.title}
                />

                <div className="decor-overlay">

                  <h3>{item.title}</h3>

                  <Link
                    to="/decor"
                    className="btn btn-light"
                  >
                    View Gallery
                  </Link>

                </div>

              </div>

            </div>
          ))}

        </div>

        <div className="text-center mt-4">
          <Link
            to="/decor"
            className="btn btn-gold"
          >
            Explore All Decor
          </Link>
        </div>

      </div>
    </section>
  );
}

export default DecorPreview;
