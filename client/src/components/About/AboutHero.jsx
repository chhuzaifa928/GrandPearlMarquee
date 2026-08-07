import "./AboutHero.css";
import heroImage from "../../assets/images/about/about-hero.jpg";

function AboutHero() {
  return (
    <section
      className="about-hero"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="about-overlay"></div>

      <div className="container" data-aos="fade-up">
        <div className="about-hero-content">
          <span className="about-tag">
            ✨ ABOUT GRAND PEARL MARQUEE
          </span>

          <h1>
            <span> Creating Elegant Celebrations &amp; Timeless Memories</span>
          </h1>

          <p>
            Grand Pearl Marquee is one of the finest event venues, offering
            luxurious halls, stunning décor, premium catering, and exceptional
            hospitality for weddings, corporate events, birthdays, engagements,
            and every special occasion.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutHero;