import "./GalleryLightbox.css";
import API_URL from "../../config/api";

const SERVER_URL = API_URL;

function getMediaUrl(path) {
  if (!path) return "";

  // Already a complete URL
  if (
    path.startsWith("http://") ||
    path.startsWith("https://")
  ) {
    return path;
  }

  // Backend uploaded gallery files
  if (path.startsWith("/uploads/")) {
    return `${SERVER_URL}${path}`;
  }

  // Frontend/Vite assets
  // Example:
  // /src/assets/images/gallery/image.jpg
  // /assets/images/gallery/image.jpg
  if (
    path.startsWith("/src/") ||
    path.startsWith("/assets/")
  ) {
    return path;
  }

  // If the path is already a normal frontend-relative path
  if (path.startsWith("/")) {
    return path;
  }

  // Final fallback
  return `/${path}`;
}

function GalleryLightbox({ selectedImage }) {
  if (!selectedImage) {
    return null;
  }

  const mediaUrl = getMediaUrl(selectedImage.image);

  return (
    <div
      className="modal fade"
      id="galleryLightbox"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content gallery-lightbox">

          {/* =========================
              HEADER
          ========================= */}

          <div className="modal-header">
            <h3 className="modal-title">
              {selectedImage.title}
            </h3>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          {/* =========================
              BODY
          ========================= */}

          <div className="modal-body">

            <div className="lightbox-media">

              {selectedImage.media_type === "video" ? (
                <video
                  src={mediaUrl}
                  controls
                  playsInline
                  preload="metadata"
                  className="lightbox-video"
                >
                  Your browser does not support video playback.
                </video>
              ) : (
                <img
                  src={mediaUrl}
                  alt={selectedImage.title || "Gallery Image"}
                  className="lightbox-image"
                />
              )}

            </div>

            {/* =========================
                INFORMATION
            ========================= */}

            <div className="lightbox-info">

              {selectedImage.category && (
                <span className="lightbox-category">
                  {selectedImage.category}
                </span>
              )}

              <h4>
                {selectedImage.title}
              </h4>

              <button
                type="button"
                className="btn btn-gold"
                data-bs-dismiss="modal"
                onClick={() => {
                  window.location.href = "/booking";
                }}
              >
                Book This Event
              </button>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default GalleryLightbox;