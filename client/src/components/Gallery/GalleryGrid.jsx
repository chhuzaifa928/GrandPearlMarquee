import "./GalleryGrid.css";

const SERVER_URL = "http://localhost:5000";

function getMediaUrl(path) {
  if (!path) return "";

  // Already complete URL
  if (
    path.startsWith("http://") ||
    path.startsWith("https://")
  ) {
    return path;
  }

  // Admin uploaded media
  if (path.startsWith("/uploads/")) {
    return `${SERVER_URL}${path}`;
  }

  // Frontend assets
  if (
    path.startsWith("/src/") ||
    path.startsWith("/assets/")
  ) {
    return path;
  }

  return `/${path}`;
}

function GalleryGrid({
  gallery,
  selectedCategory,
  setSelectedImage,
}) {

  // ===============================
  // Filter By Category
  // ===============================

  const filteredImages =
    selectedCategory === "All"
      ? gallery
      : gallery.filter(
          (item) =>
            item.category === selectedCategory
        );

  // ===============================
  // Empty Gallery
  // ===============================

  if (filteredImages.length === 0) {
    return (
      <section className="gallery-grid-section">

        <div className="container">

          <div className="text-center py-5">

            <h4>
              No gallery items available.
            </h4>

            <p>
              Please check another category.
            </p>

          </div>

        </div>

      </section>
    );
  }

  return (
    <section className="gallery-grid-section">

      <div className="container">

        <div className="row">

          {filteredImages.map((item, index) => {

            const mediaUrl =
              getMediaUrl(item.image);

            return (

              <div
                className="col-lg-4 col-md-6 mb-4"
                key={item.id}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >

                <div
                  className={`gallery-card ${
                    item.media_type === "video"
                      ? "gallery-video-card"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedImage(item)
                  }
                  data-bs-toggle="modal"
                  data-bs-target="#galleryLightbox"
                >

                  {/* =========================
                      IMAGE
                  ========================= */}

                  {item.media_type === "image" ? (

                    <img
                      src={mediaUrl}
                      alt={
                        item.title ||
                        "Gallery Image"
                      }
                    />

                  ) : (

                    /* =========================
                       VIDEO
                    ========================= */

                    <video
                      src={mediaUrl}
                      muted
                      playsInline
                      preload="metadata"
                    />

                  )}

                  {/* =========================
                      OVERLAY
                  ========================= */}

                  <div className="gallery-card-overlay">

                    <span>
                      {item.category}
                    </span>

                    <h4>
                      {item.title}
                    </h4>

                    <p>
                      {item.media_type === "video"
                        ? "Click to Watch"
                        : "Click to View"}
                    </p>

                  </div>

                </div>

              </div>

            );
          })}

        </div>

      </div>

    </section>
  );
}

export default GalleryGrid;