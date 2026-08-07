import "./DecorPreview.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { getDecor } from "../../services/publicDecorService";

function DecorPreview() {
  const [decor, setDecor] = useState([]);

  useEffect(() => {
    loadDecor();
  }, []);

  const loadDecor = async () => {
  try {
   const data = await getDecor();

setDecor(data.slice(0, 6));
  } catch (error) {
    console.error(error);
  }
};

  return (
    <section className="decor-preview section-padding">

      <div className="container">

        <div className="section-title">
          <h2>Our Premium Decor Collection</h2>

          <p>
            Elegant themes crafted to make every celebration unforgettable.
          </p>
        </div>

        <div className="row">

          {decor.length === 0 ? (

            <div className="text-center">
              <h4>No Decor Available</h4>
            </div>

          ) : (

            decor.map((item) => (

              <div
                className="col-lg-4 col-md-6 mb-4"
                key={item.id}
              >

                <div className="decor-card">

                  <img
  src={`http://localhost:5000${item.image}`}
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

            ))

          )}

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