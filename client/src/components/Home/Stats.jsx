import "./Stats.css";

function Stats() {
  const stats = [
    {
      number: "1000+",
      title: "Guest Capacity",
    },
    {
      number: "2000+",
      title: "Successful Events",
    },
    {
      number: "100+",
      title: "Luxury Decor Themes",
    },
    {
      number: "100%",
      title: "Customer Satisfaction",
    },
  ];

  return (
    <section className="stats-section"
     data-aos="fade-up">
      <div className="container">
        <div className="row">

          {stats.map((item, index) => (
            <div className="col-lg-3 col-md-6 mb-4" key={index}>
              <div className="stat-card">
                <h2>{item.number}</h2>
                <p>{item.title}</p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Stats;