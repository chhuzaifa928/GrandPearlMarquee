import "./AboutPreview.css";
import aboutImage from "../../assets/images/about/about-preview.jpeg";
import { Link } from "react-router-dom";

function AboutPreview() {
  return (
    <section className="about-preview py-5"
     data-aos="fade-up">
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
              Grand Pearl Marquee is where unforgettable celebrations come to life.
              Whether you're planning a Barat, Walima, Mehndi, Birthday, or Corporate
              Event, our elegant venue, customized décor, premium catering, and
              dedicated team work together to create memorable experiences for you and
              your guests.
            </p>

            <ul>
              <li>✔ Elegant Event Spaces</li>
              <li>✔ Professional Event Management</li>
              <li>✔ Custom Decor & Food Options</li>
              <li>✔ Perfect for Every Celebration</li>
            </ul>

            <Link to="/about" className="btn btn-gold mt-4">
              Learn More
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

export default AboutPreview;