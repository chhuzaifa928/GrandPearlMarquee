import { Link } from "react-router-dom";
import API_URL from "../../config/api";

function DecorCard({ item, itemMedia, onOpenLightbox, getMediaUrl, index }) {
  return (
    <div
      className="col-lg-4 col-md-6 mb-4"
      data-aos="zoom-in"
      data-aos-delay={index * 100}
    >
      <div className="decor-card">

        {/* Main Image */}

        <div
          className="decor-main-media"
          onClick={() => onOpenLightbox(item, 0)}
        >

          <img
            src={`${API_URL}${item.image}`}
            alt={item.title}
            className="decor-main-image"
          />

          <div className="decor-view-overlay">
            <span>
              View Gallery
            </span>
          </div>

        </div>

        {/* Additional Media */}

        {itemMedia.length > 0 && (
          <div className="decor-media-gallery">

            {itemMedia.map(
              (mediaItem, mediaIndex) => {

                const mediaUrl =
                  getMediaUrl(
                    mediaItem.media_url
                  );

                const galleryIndex =
                  mediaIndex + 1;

                if (
                  mediaItem.media_type ===
                  "video"
                ) {
                  return (
                    <div
                      key={mediaItem.id}
                      className="decor-media-item"
                      onClick={() =>
                        onOpenLightbox(
                          item,
                          galleryIndex
                        )
                      }
                    >

                      <video
                        className="decor-media-video"
                        preload="metadata"
                        muted
                      >
                        <source
                          src={mediaUrl}
                        />
                      </video>

                      <div className="decor-video-overlay">
                        ▶
                      </div>

                    </div>
                  );
                }

                return (
                  <div
                    key={mediaItem.id}
                    className="decor-media-item"
                    onClick={() =>
                      onOpenLightbox(
                        item,
                        galleryIndex
                      )
                    }
                  >

                    <img
                      src={mediaUrl}
                      alt={`${item.title} decor`}
                      className="decor-media-image"
                    />

                    <div className="decor-media-overlay">
                      +
                    </div>

                  </div>
                );
              }
            )}

          </div>
        )}

        {/* Decor Information */}

        <div className="decor-info">

          <span>
            {item.category}
          </span>

          <h4>
            {item.title}
          </h4>

          <p>
            {item.description}
          </p>

          <Link
            to="/booking"
            className="btn btn-gold"
          >
            Book This Decor
          </Link>

        </div>

      </div>

    </div>
  );
}

export default DecorCard;
