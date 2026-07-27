import "./AboutPreview.css";
import aboutImage from "../../assets/images/about/about-preview.jpeg";
import { Link } from "react-router-dom";

function AboutPreview() {
  return (
    <section className="about-preview py-5">
      <div className="container">
        <div className="row align-items-center">

          {/* Left Side - Image */}
          <div className="col-lg-6 mb-4 mb-lg-0">
            <img
              src={aboutImage}
              alt="Grand Pearl Marquee"
              className="img-fluid rounded shadow"
            />
          </div>

          {/* Right Side - Text */}
          <div className="col-lg-6">
            <h2>About Grand Pearl Marquee</h2>

            <p>
              Grand Pearl Marquee is a premium venue designed to make every
              celebration memorable. From elegant weddings to corporate events,
              we provide exceptional service, beautiful décor, and a welcoming
              atmosphere.
            </p>

            <ul>
              <li>✔ Elegant Event Spaces</li>
              <li>✔ Professional Event Management</li>
              <li>✔ Custom Decor & Food Options</li>
              <li>✔ Perfect for Every Celebration</li>
            </ul>

            <Link to="/about" className="btn btn-primary mt-3">
              Learn More
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

export default AboutPreview;