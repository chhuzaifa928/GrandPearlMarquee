import "./Hero.css";
import heroImage from "../../assets/images/hero/hero-main.jpg";

function Hero() {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="overlay">
        <div className="hero-content">
          <h1>Welcome to Grand Pearl Marquee</h1>

          <p>
            Creating unforgettable weddings, engagements, birthdays,
            corporate events, and family celebrations.
          </p>

          <div className="hero-buttons">
            <button className="btn btn-primary">Book Now</button>

            <button className="btn btn-outline-light">
              Explore Gallery
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;