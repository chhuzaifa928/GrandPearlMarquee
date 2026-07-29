import "./FoodBenefits.css";

function FoodBenefits() {
  const benefits = [
    {
      icon: "🍽️",
      title: "Premium Quality Food",
      text: "Every dish is prepared using fresh ingredients and high-quality spices to ensure exceptional taste."
    },
    {
      icon: "👨‍🍳",
      title: "Experienced Chefs",
      text: "Our professional chefs create delicious menus that make every celebration memorable."
    },
    {
      icon: "✨",
      title: "Hygienic Preparation",
      text: "We follow strict hygiene standards during preparation, cooking and serving."
    },
    {
      icon: "🎉",
      title: "Custom Event Menus",
      text: "Choose from our existing packages or let us prepare a customised menu for your special occasion."
    }
  ];

  return (
    <section className="food-benefits">
      <div className="container">

        <div
          className="section-heading"
          data-aos="fade-up"
        >
          <span>WHY CHOOSE OUR CATERING</span>

          <h2>Exceptional Catering Experience</h2>

          <p>
            We combine delicious flavours, premium presentation,
            and outstanding service to make every event unforgettable.
          </p>
        </div>

        <div className="row">

          {benefits.map((item, index) => (

            <div
              className="col-lg-3 col-md-6 mb-4"
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >

              <div className="benefit-card">

                <div className="benefit-icon">
                  {item.icon}
                </div>

                <h4>{item.title}</h4>

                <p>{item.text}</p>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default FoodBenefits;