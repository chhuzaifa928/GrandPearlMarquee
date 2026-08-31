function DecorGalleryLightbox({
  lightbox,
  onClose,
  onPrevious,
  onNext,
  getMediaUrl,
}) {
  const currentMedia =
    lightbox.gallery[lightbox.currentIndex];

  return (
    <div
      className="decor-lightbox"
      onClick={onClose}
    >

      <button
        className="decor-lightbox-close"
        onClick={onClose}
        aria-label="Close gallery"
      >
        ×
      </button>

      <button
        className="decor-lightbox-prev"
        onClick={(event) => {
          event.stopPropagation();
          onPrevious();
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

        {currentMedia.media_type === "video" ? (

          <video
            className="decor-lightbox-video"
            controls
            autoPlay
          >
            <source
              src={getMediaUrl(
                currentMedia.media_url
              )}
            />

            Your browser does not support
            the video tag.
          </video>

        ) : (

          <img
            className="decor-lightbox-image"
            src={getMediaUrl(
              currentMedia.media_url
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
          onNext();
        }}
        aria-label="Next"
      >
        ›
      </button>

    </div>
  );
}

export default DecorGalleryLightbox;
