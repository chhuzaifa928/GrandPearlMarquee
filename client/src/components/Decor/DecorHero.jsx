import "./DecorHero.css";
import heroImage from "../../assets/images/decor/decor-hero.jpg"; // Adjust image path as needed

function DecorHero() {
  return (
    <section
      className="decor-hero"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${heroImage})`,
      }}
    >
      <div className="container" data-aos="fade-up">
        <div className="decor-hero-content">
          <span className="decor-tag">
            ✨ PREMIUM DECORATION SERVICES
          </span>

          <h1>
            Elegant Decorations For Every Celebration
          </h1>

          <p>
            Discover our luxurious décor collections designed for Barat, Walima, Mehndi,
            Nikkah, Birthdays, Corporate Events, and every special occasion. Every setup is
            crafted with elegance, creativity, and attention to detail.
          </p>
        </div>
      </div>
    </section>
  );
}

export default DecorHero;