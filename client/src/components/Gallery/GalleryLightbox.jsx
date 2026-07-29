import "./GalleryLightbox.css";
import { Link } from "react-router-dom";

function GalleryLightbox({ selectedImage }) {
  if (!selectedImage) return null;

  return (
    <div
      className="modal fade"
      id="galleryLightbox"
      tabIndex="-1"
      aria-labelledby="galleryLightboxLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header">
            <h4
              className="modal-title"
              id="galleryLightboxLabel"
            >
              {selectedImage.title}
            </h4>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">

            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="img-fluid rounded mb-4"
            />

            <span className="gallery-badge">
              {selectedImage.category}
            </span>

            <h3 className="mt-3">
              {selectedImage.title}
            </h3>

            <p className="gallery-description">
              {selectedImage.description}
            </p>

            <div className="text-center mt-4">

              <Link
                to="/booking"
                className="btn btn-gold"
                data-bs-dismiss="modal"
              >
                Book This Event
              </Link>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default GalleryLightbox;