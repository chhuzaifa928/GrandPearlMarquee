import "./GalleryGrid.css";
import galleryData from "../../data/galleryData";

function GalleryGrid({
  selectedCategory,
  setSelectedImage,
}) {

  const filteredImages =
    selectedCategory === "All"
      ? galleryData
      : galleryData.filter(
          (item) => item.category === selectedCategory
        );

  return (
    <section className="gallery-grid-section">
      <div className="container">

        <div className="row">

          {filteredImages.map((item, index) => (

            <div
              className="col-lg-4 col-md-6 mb-4"
              key={item.id}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >

              <div
                className="gallery-card"
                onClick={() => setSelectedImage(item)}
                data-bs-toggle="modal"
                data-bs-target="#galleryLightbox"
              >

                <img
                  src={item.image}
                  alt={item.title}
                />

                <div className="gallery-card-overlay">

                  <span>{item.category}</span>

                  <h4>{item.title}</h4>

                  <p>Click to View</p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default GalleryGrid;