import { useState } from "react";

import GalleryHero from "../../components/Gallery/GalleryHero";
import GalleryCategories from "../../components/Gallery/GalleryCategories";
import GalleryGrid from "../../components/Gallery/GalleryGrid";
import GalleryLightbox from "../../components/Gallery/GalleryLightbox";
import GalleryCTA from "../../components/Gallery/GalleryCTA";
function Gallery() {

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [selectedImage, setSelectedImage] =
    useState(null);

  return (
    <div className="gallery-page">
      <GalleryHero />

      <GalleryCategories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <GalleryGrid
        selectedCategory={selectedCategory}
        setSelectedImage={setSelectedImage}
      />

      <GalleryLightbox
        selectedImage={selectedImage}
      />
      <GalleryCTA />
    </div>
  );
}

export default Gallery;