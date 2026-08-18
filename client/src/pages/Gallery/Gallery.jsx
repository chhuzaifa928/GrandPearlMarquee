import { useEffect, useState } from "react";

import SEO from "../../components/SEO/SEO";

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
  // Load Gallery From Database
  // ===============================

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    try {
      const data = await getGallery();

      console.log("PUBLIC GALLERY:", data);

      setGallery(data);
    } catch (error) {
      console.error(
        "Failed to load gallery:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Loading
  // ===============================

  if (loading) {
    return (
      <div className="container text-center py-5">

        <div
          className="spinner-border text-warning"
          role="status"
        >
          <span className="visually-hidden">
            Loading...
          </span>
        </div>

        <p className="mt-3">
          Loading gallery...
        </p>

      </div>
    );
  }

  return (
    <>
      <SEO
        title="Wedding & Event Gallery | Grand Pearl Marquee Rawalpindi"
        description="View wedding, Mehndi, Barat, Walima and event photos from Grand Pearl Marquee in Rawalpindi. Explore our venue, décor and celebrations."
        keywords="Grand Pearl Marquee gallery, wedding photos Rawalpindi, wedding venue photos Rawalpindi, Mehndi decor photos, Barat decor photos, Walima photos"
      />

      <div className="gallery-page">

        <GalleryHero />

        <GalleryCategories
          gallery={gallery}
          selectedCategory={selectedCategory}
          setSelectedCategory={
            setSelectedCategory
          }
        />

        <GalleryGrid
          gallery={gallery}
          selectedCategory={selectedCategory}
          setSelectedImage={
            setSelectedImage
          }
        />

        <GalleryLightbox
          selectedImage={selectedImage}
        />

        <GalleryCTA />

      </div>
    </>
  );
}

export default Gallery;