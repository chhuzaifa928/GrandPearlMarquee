import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./DecorGallery.css";

import {
  getDecor,
  getDecorMedia,
} from "../../services/publicDecorService";

function DecorGallery({ selectedCategory }) {
  const [decor, setDecor] = useState([]);
  const [media, setMedia] = useState({});
  const [loading, setLoading] = useState(true);

  // ===============================
  // Lightbox State
  // ===============================

  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    loadDecor();
  }, []);

  // ===============================
  // Load Decor
  // ===============================

  const loadDecor = async () => {
    try {
      const data = await getDecor();

      setDecor(data);

      const mediaData = {};

      await Promise.all(
        data.map(async (item) => {
          try {
            const itemMedia = await getDecorMedia(item.id);

            mediaData[item.id] = itemMedia;
          } catch (error) {
            console.error(
              `Failed to load media for decor ${item.id}`,
              error
            );

            mediaData[item.id] = [];
          }
        })
      );

      setMedia(mediaData);
    } catch (error) {
      console.error("Failed to load decor:", error);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Filter Categories
  // ===============================

  const filteredDecor =
    selectedCategory === "All"
      ? decor
      : decor.filter(
          (item) => item.category === selectedCategory
        );

  // ===============================
  // Media URL
  // ===============================

  const getMediaUrl = (url) => {
    if (!url) return "";

    if (url.startsWith("http")) {
      return url;
    }

    return `http://localhost:5000${url}`;
  };

  // ===============================
  // Open Lightbox
  // ===============================

  const openLightbox = (item, mediaIndex = 0) => {
    const itemMedia = media[item.id] || [];

    const gallery = [
      {
        id: `main-${item.id}`,
        media_type: "image",
        media_url: item.image,
      },
      ...itemMedia,
    ];

    setLightbox({
      item,
      gallery,
      currentIndex: mediaIndex,
    });
  };

  // ===============================
  // Close Lightbox
  // ===============================

  const closeLightbox = () => {
    setLightbox(null);
  };

  // ===============================
  // Next Media
  // ===============================

  const nextMedia = () => {
    if (!lightbox) return;

    const nextIndex =
      (lightbox.currentIndex + 1) %
      lightbox.gallery.length;

    setLightbox({
      ...lightbox,
      currentIndex: nextIndex,
    });
  };

  // ===============================
  // Previous Media
  // ===============================

  const previousMedia = () => {
    if (!lightbox) return;

    const previousIndex =
      (lightbox.currentIndex -
        1 +
        lightbox.gallery.length) %
      lightbox.gallery.length;

    setLightbox({
      ...lightbox,
      currentIndex: previousIndex,
    });
  };

  // ===============================
  // Keyboard Navigation
  // ===============================

  useEffect(() => {
    const handleKeyboard = (event) => {
      if (!lightbox) return;

      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowRight") {
        nextMedia();
      }

      if (event.key === "ArrowLeft") {
        previousMedia();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyboard
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyboard
      );
    };
  }, [lightbox]);

  // ===============================
  // Loading
  // ===============================

  if (loading) {
    return (
      <section className="decor-gallery section-padding">
        <div className="container">
          <div className="text-center py-5">

            <div
              className="spinner-border text-warning"
              role="status"
            >
              <span className="visually-hidden">
                Loading...
              </span>
            </div>

            <p className="mt-3">
              Loading decor collection...
            </p>

          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="decor-gallery section-padding">

        <div className="container">

          {/* Section Title */}

          <div className="section-title">

            <span>
              OUR DECOR COLLECTION
            </span>

            <h2>
              Luxury Event Decorations
            </h2>

            <p>
              Explore our carefully crafted décor
              collections designed for every special
              occasion.
            </p>

          </div>

          {/* Decor */}

          <div className="row">

            {filteredDecor.map((item, index) => {

              const itemMedia =
                media[item.id] || [];

              return (
                <div
                  key={item.id}
                  className="col-lg-4 col-md-6 mb-4"
                  data-aos="zoom-in"
                  data-aos-delay={index * 100}
                >

                  <div className="decor-card">

                    {/* Main Image */}

                    <div
                      className="decor-main-media"
                      onClick={() =>
                        openLightbox(item, 0)
                      }
                    >

                      <img
                        src={`http://localhost:5000${item.image}`}
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
                                    openLightbox(
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
                                  openLightbox(
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
            })}

          </div>

          {/* No Decor */}

          {filteredDecor.length === 0 && (
            <div className="text-center py-5">

              <h4>
                No decor available
              </h4>

              <p className="text-muted">
                Please check another category.
              </p>

            </div>
          )}

        </div>

      </section>

      {/* ===============================
          LIGHTBOX
      =============================== */}

      {lightbox && (
        <div
          className="decor-lightbox"
          onClick={closeLightbox}
        >

          <button
            className="decor-lightbox-close"
            onClick={closeLightbox}
            aria-label="Close gallery"
          >
            ×
          </button>

          <button
            className="decor-lightbox-prev"
            onClick={(event) => {
              event.stopPropagation();
              previousMedia();
            }}
            aria-label="Previous"
          >
            ‹
          </button>

          <div
            className="decor-lightbox-content"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {lightbox.gallery[
              lightbox.currentIndex
            ].media_type === "video" ? (

              <video
                className="decor-lightbox-video"
                controls
                autoPlay
              >
                <source
                  src={getMediaUrl(
                    lightbox.gallery[
                      lightbox.currentIndex
                    ].media_url
                  )}
                />

                Your browser does not support
                the video tag.
              </video>

            ) : (

              <img
                className="decor-lightbox-image"
                src={getMediaUrl(
                  lightbox.gallery[
                    lightbox.currentIndex
                  ].media_url
                )}
                alt={
                  lightbox.item.title
                }
              />

            )}

            <div className="decor-lightbox-caption">

              <strong>
                {lightbox.item.title}
              </strong>

              <span>
                {lightbox.currentIndex + 1} /{" "}
                {lightbox.gallery.length}
              </span>

            </div>

          </div>

          <button
            className="decor-lightbox-next"
            onClick={(event) => {
              event.stopPropagation();
              nextMedia();
            }}
            aria-label="Next"
          >
            ›
          </button>

        </div>
      )}
    </>
  );
}

export default DecorGallery;