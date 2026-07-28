import "./OurStory.css";
import storyImage from "../../assets/images/about/our-story.jpg";
import { FaCheckCircle } from "react-icons/fa";

function OurStory() {
  return (
    <section className="our-story">
      <div className="container">

        <div className="row align-items-center">

          {/* Image */}
          <div
            className="col-lg-6 mb-5 mb-lg-0"
            data-aos="fade-right"
          >
            <img
              src={storyImage}
              alt="Grand Pearl Marquee"
              className="story-image"
            />
          </div>

          {/* Content */}
          <div
            className="col-lg-6"
            data-aos="fade-left"
          >

            <span className="section-tag">
              OUR STORY
            </span>

            <h2>
              Where Every Celebration
              Becomes a Beautiful Memory
            </h2>

            <p>
              Grand Pearl Marquee was established with a vision
              to provide an elegant venue where families can
              celebrate life's most precious moments in comfort,
              luxury, and style.
            </p>

            <p>
              From weddings and engagements to birthdays,
              corporate events, and family gatherings, our
              experienced team ensures every detail is planned
              to perfection.
            </p>

            <ul className="story-list">

              <li>
                <FaCheckCircle />
                Elegant Indoor Halls
              </li>

              <li>
                <FaCheckCircle />
                Beautiful Outdoor Lawn
              </li>

              <li>
                <FaCheckCircle />
                Premium Catering Services
              </li>

              <li>
                <FaCheckCircle />
                Professional Event Management
              </li>

            </ul>

          </div>

        </div>

      </div>
    </section>
  );
}

export default OurStory;