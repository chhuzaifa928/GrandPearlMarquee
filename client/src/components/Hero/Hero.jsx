function Hero() {
  return (
    <section
      className="d-flex align-items-center justify-content-center text-center text-white"
      style={{
        height: "90vh",
        background:
          "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600') center/cover",
      }}
    >
      <div className="container">
        <h1 className="display-3 fw-bold">
          Grand Pearl Marquee
        </h1>

        <p className="lead mt-3">
          Creating unforgettable weddings, engagements,
          birthdays and corporate events.
        </p>

        <div className="mt-4">
          <button className="btn btn-warning btn-lg me-3">
            Book Now
          </button>

          <button className="btn btn-outline-light btn-lg">
            View Packages
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;