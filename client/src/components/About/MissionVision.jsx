import "./MissionVision.css";
import { FaBullseye, FaEye } from "react-icons/fa";

function MissionVision() {
  return (
    <section className="mission-vision">
      <div className="container">

        <div className="section-heading" data-aos="fade-up">
          <span>OUR VALUES</span>

          <h2>Our Mission & Vision</h2>

          <p>
            At Grand Pearl Marquee, our commitment is to provide exceptional
            event experiences through outstanding hospitality, elegant venues,
            and unforgettable celebrations.
          </p>
        </div>

        <div className="row">

          {/* Mission Card */}
          <div
            className="col-lg-6 mb-4"
            data-aos="fade-right"
          >
            <div className="value-card">

              <div className="value-icon">
                <FaBullseye />
              </div>

              <h3>Our Mission</h3>

              <p>
                To create unforgettable celebrations by offering luxurious
                venues, exceptional catering, beautiful décor, and
                professional event management that exceeds every client's
                expectations.
              </p>

            </div>
          </div>

          {/* Vision Card */}
          <div
            className="col-lg-6 mb-4"
            data-aos="fade-left"
          >
            <div className="value-card">

              <div className="value-icon">
                <FaEye />
              </div>

              <h3>Our Vision</h3>

              <p>
                To become Pakistan's most trusted and admired event venue,
                recognised for excellence, innovation, and creating lifelong
                memories for every family and organisation.
              </p>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default MissionVision;