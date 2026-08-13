import "./GalleryGrid.css";

const SERVER_URL = "http://localhost:5000";

// ===============================
// Media URL Helper
// ===============================

function getMediaUrl(path) {
  if (!path) return "";

  // Already complete URL
  if (
    path.startsWith("http://") ||
    path.startsWith("https://")
  ) {
    return path;
  }

  // Admin uploaded files
  if (path.startsWith("/uploads/")) {
    return `${SERVER_URL}${path}`;
  }

  // Frontend/public assets
  if (
    path.startsWith("/src/") ||
    path.startsWith("/assets/") ||
    path.startsWith("/")
  ) {
    return path;
  }

  return `${SERVER_URL}/${path}`;
}

// ===============================
// Gallery Grid
// ===============================

function GalleryGrid({
  gallery,
  selectedCategory,
  setSelectedImage,
}) {

  // ===============================
  // Filter By Category
  // ===============================

  const filteredGallery =
    selectedCategory === "All"
      ? gallery
      : gallery.filter(
          (item) =>
            item.category === selectedCategory
        );

  // ===============================
  // Empty Gallery
  // ===============================

  if (filteredGallery.length === 0) {
    return (
      <section className="gallery-grid-section">

        <div className="container">

          <div className="text-center py-5">

            <h4>
              No gallery items available.
            </h4>

            <p className="text-muted">
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

          {filteredGallery.map((item, index) => {

            const mediaUrl =
              getMediaUrl(item.image);

            const isVideo =
              item.media_type === "video";

            return (
              <div
                className="col-lg-4 col-md-6 mb-4"
                key={item.id}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >

                <div
                  className={`gallery-card ${
                    isVideo
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
                      MEDIA
                  ========================= */}

                  {isVideo ? (

                    <div className="gallery-video-wrapper">

                      <video
                        className="gallery-card-video"
                        src={mediaUrl}
                        muted
                        playsInline
                        preload="metadata"
                      />

                      <div className="gallery-play-icon">
                        ▶
                      </div>

                    </div>

                  ) : (

                    <img
                      className="gallery-card-image"
                      src={mediaUrl}
                      alt={
                        item.title ||
                        "Grand Pearl Marquee Gallery"
                      }
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
                      {isVideo
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