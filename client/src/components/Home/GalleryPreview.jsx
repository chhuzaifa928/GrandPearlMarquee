import "./GalleryPreview.css";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

import gallery1 from "../../assets/images/gallery/gallery1.jpg";
import gallery2 from "../../assets/images/gallery/gallery2.jpg";
import gallery3 from "../../assets/images/gallery/gallery3.jpg";
import gallery4 from "../../assets/images/gallery/gallery4.jpg";
import gallery5 from "../../assets/images/gallery/gallery5.jpg";

function GalleryPreview() {
  return (
    <section className="gallery-preview" data-aos="fade-up">
      <div className="container">

        <div className="section-heading">
          <h2>Our Memorable Events</h2>

          <p>
            Take a glimpse into the unforgettable weddings,
            celebrations, and special moments hosted at
            Grand Pearl Marquee.
          </p>
        </div>

        <div className="gallery-grid">

          {/* Large Image */}
          <Link to="/gallery" className="gallery-item large">
            <img src={gallery1} alt="Grand Pearl Event" />
            <div className="gallery-overlay">
              <FaEye className="gallery-icon" />
              <h4>View Gallery</h4>
            </div>
          </Link>

          {/* Image 2 */}
          <Link to="/gallery" className="gallery-item">
            <img src={gallery2} alt="Grand Pearl Event" />
            <div className="gallery-overlay">
              <FaEye className="gallery-icon" />
              <h4>View Gallery</h4>
            </div>
          </Link>

          {/* Image 3 */}
          <Link to="/gallery" className="gallery-item">
            <img src={gallery3} alt="Grand Pearl Event" />
            <div className="gallery-overlay">
              <FaEye className="gallery-icon" />
              <h4>View Gallery</h4>
            </div>
          </Link>

          {/* Image 4 */}
          <Link to="/gallery" className="gallery-item">
            <img src={gallery4} alt="Grand Pearl Event" />
            <div className="gallery-overlay">
              <FaEye className="gallery-icon" />
              <h4>View Gallery</h4>
            </div>
          </Link>

          {/* Image 5 */}
          <Link to="/gallery" className="gallery-item">
            <img src={gallery5} alt="Grand Pearl Event" />
            <div className="gallery-overlay">
              <FaEye className="gallery-icon" />
              <h4>View Gallery</h4>
            </div>
          </Link>

        </div>

        <div className="text-center mt-5">
          <Link to="/gallery" className="btn btn-gold">
            Explore Full Gallery
          </Link>
        </div>

      </div>
    </section>
  );
}

export default GalleryPreview;