import "./AboutHero.css";
import heroImage from "../../assets/images/about/about-hero.jpg";

function AboutHero() {
  return (
    <section
      className="about-hero"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="about-overlay"></div>

      <div
        className="container about-hero-content"
        data-aos="fade-up"
      >
        <span className="about-tag">ABOUT GRAND PEARL MARQUEE</span>

        <h1>Creating Elegant Celebrations & Timeless Memories</h1>

        <p>
          Grand Pearl Marquee is one of the finest event venues,
          offering luxurious halls, stunning décor, premium catering,
          and exceptional hospitality for weddings, corporate events,
          birthdays, engagements, and every special occasion.
        </p>
      </div>
    </section>
  );
}

export default AboutHero;