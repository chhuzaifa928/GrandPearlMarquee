import "./GalleryCategories.css";

function GalleryCategories({
  gallery,
  selectedCategory,
  setSelectedCategory,
}) {

  // ===============================
  // Create Categories From Database
  // ===============================

  const categories = [
    "All",
    ...new Set(
      gallery
        .map((item) => item.category)
        .filter(Boolean)
    ),
  ];

  return (
    <section className="gallery-categories">

      <div className="container">

        <div
          className="section-heading"
          data-aos="fade-up"
        >

          <span>EVENT COLLECTIONS</span>

          <h2>Browse By Event Type</h2>

          <p>
            Explore memorable celebrations organised
            at Grand Pearl Marquee.
          </p>

        </div>

        <div
          className="category-buttons"
          data-aos="fade-up"
          data-aos-delay="150"
        >

          {categories.map((category) => (

            <button
              key={category}
              onClick={() =>
                setSelectedCategory(category)
              }
              className={
                selectedCategory === category
                  ? "category-btn active"
                  : "category-btn"
              }
            >
              {category}
            </button>

          ))}

        </div>

      </div>

    </section>
  );
}

export default GalleryCategories;