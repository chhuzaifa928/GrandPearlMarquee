import { useCallback, useEffect, useState } from "react";

import "./DecorGallery.css";
import API_URL from "../../config/api";

import {
  getDecor,
  getDecorMedia,
} from "../../services/publicDecorService";

import DecorCard from "./DecorCard";
import DecorGalleryLightbox from "./DecorGalleryLightbox";

function DecorGallery({ selectedCategory }) {
  const [decor, setDecor] = useState([]);
  const [media, setMedia] = useState({});
  const [loading, setLoading] = useState(true);

  // ===============================
  // Lightbox State
  // ===============================

  const [lightbox, setLightbox] = useState(null);

  // ===============================
  // Load Decor
  // ===============================

  useEffect(() => {
    let cancelled = false;

    const loadDecor = async () => {
      try {
        const data = await getDecor();

        if (cancelled) return;

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

        if (cancelled) return;

        setMedia(mediaData);
      } catch (error) {
        console.error("Failed to load decor:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadDecor();

    return () => {
      cancelled = true;
    };
  }, []);

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

    return `${API_URL}${url}`;
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

  const nextMedia = useCallback(() => {
    if (!lightbox) return;

    const nextIndex =
      (lightbox.currentIndex + 1) %
      lightbox.gallery.length;

    setLightbox({
      ...lightbox,
      currentIndex: nextIndex,
    });
  }, [lightbox]);

  // ===============================
  // Previous Media
  // ===============================

  const previousMedia = useCallback(() => {
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
  }, [lightbox]);

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
  }, [lightbox, nextMedia, previousMedia]);

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

            {filteredDecor.map((item, index) => (

              <DecorCard
                key={item.id}
                item={item}
                itemMedia={media[item.id] || []}
                onOpenLightbox={openLightbox}
                getMediaUrl={getMediaUrl}
                index={index}
              />

            ))}

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
        <DecorGalleryLightbox
          lightbox={lightbox}
          onClose={closeLightbox}
          onPrevious={previousMedia}
          onNext={nextMedia}
          getMediaUrl={getMediaUrl}
        />
      )}
    </>
  );
}

export default DecorGallery;
