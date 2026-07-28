import "./DecorHero.css";
import heroImage from "../../assets/images/decor/decor-hero.jpg";

function DecorHero() {
  return (
    <section
      className="decor-hero"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="decor-overlay"></div>

      <div
        className="container decor-content"
        data-aos="fade-up"
      >
        <span className="decor-tag">
          PREMIUM DECOR COLLECTION
        </span>

        <h1>
          Elegant Decorations For Every Celebration
        </h1>

        <p>
          Discover our luxurious décor collections designed for Barat,
          Walima, Mehndi, Nikkah, Birthdays, Corporate Events, and every
          special occasion. Every setup is crafted with elegance,
          creativity, and attention to detail.
        </p>
      </div>
    </section>
  );
}

export default DecorHero;