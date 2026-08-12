import { useEffect, useState } from "react";

import GalleryHero from "../../components/Gallery/GalleryHero";
import GalleryCategories from "../../components/Gallery/GalleryCategories";
import GalleryGrid from "../../components/Gallery/GalleryGrid";
import GalleryLightbox from "../../components/Gallery/GalleryLightbox";
import GalleryCTA from "../../components/Gallery/GalleryCTA";

import { getGallery } from "../../services/galleryService";

function Gallery() {
  const [gallery, setGallery] = useState([]);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [selectedImage, setSelectedImage] =
    useState(null);

  const [loading, setLoading] = useState(true);

  // ===============================
  // Load Gallery From Backend
  // ===============================

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    try {
      setLoading(true);

      const data = await getGallery();

      console.log("PUBLIC GALLERY:", data);

      setGallery(data);

    } catch (error) {
      console.error("Gallery Load Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gallery-page">

      <GalleryHero />

      {/* =========================
          CATEGORY FILTER
      ========================= */}

      <GalleryCategories
        gallery={gallery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* =========================
          GALLERY GRID
      ========================= */}

      {loading ? (

        <section className="gallery-grid-section">
          <div className="container">

            <div className="text-center py-5">

              <div
                className="spinner-border text-warning"
                role="status"
              >
                <span className="visually-hidden">
                  Loading gallery...
                </span>
              </div>

              <p className="mt-3">
                Loading gallery...
              </p>

            </div>

          </div>
        </section>

      ) : (

        <GalleryGrid
          gallery={gallery}
          selectedCategory={selectedCategory}
          setSelectedImage={setSelectedImage}
        />

      )}

      <GalleryLightbox
        selectedImage={selectedImage}
      />

      <GalleryCTA />

    </div>
  );
}

export default Gallery;