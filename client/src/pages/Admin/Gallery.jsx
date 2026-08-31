import { useEffect, useState } from "react";

import GalleryForm from "../../components/Admin/Gallery/GalleryForm";
import GalleryTable from "../../components/Admin/Gallery/GalleryTable";

import {
  getGallery,
  uploadGallery,
  deleteGallery,
  getGalleryCategories,
  addGalleryCategory,
  deleteGalleryCategory,
} from "../../services/galleryService";

function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  // =====================================
  // Load Gallery + Categories
  // =====================================

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      try {
        const [galleryData, categoryData] =
          await Promise.all([
            getGallery(),
            getGalleryCategories(),
          ]);

        if (cancelled) return;

        setGallery(galleryData);
        setCategories(categoryData);
      } catch (error) {
        console.error("Failed to load gallery data:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadData();

    return () => {
      cancelled = true;
    };
  }, []);

  const refreshData = async () => {
    try {
      const [galleryData, categoryData] =
        await Promise.all([
          getGallery(),
          getGalleryCategories(),
        ]);

      setGallery(galleryData);
      setCategories(categoryData);
    } catch (error) {
      console.error("Failed to load gallery data:", error);
    }
  };

  // =====================================
  // Upload Gallery
  // =====================================

  const handleUpload = async (formData) => {
    try {
      await uploadGallery(formData);

      alert("Gallery uploaded successfully.");

      refreshData();
    } catch (error) {
      console.error(error);

      alert("Upload failed.");
    }
  };

  // =====================================
  // Add Category
  // =====================================

  const handleAddCategory = async (categoryName) => {
    try {
      await addGalleryCategory(categoryName);

      alert("Category added successfully.");

      // Reload categories immediately
      refreshData();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to add category."
      );
    }
  };

  // =====================================
  // Delete Gallery
  // =====================================

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this media?")) {
      return;
    }

    try {
      await deleteGallery(id);

      alert("Gallery item deleted.");

      refreshData();
    } catch (error) {
      console.error(error);

      alert("Failed to delete gallery item.");
    }
  };

  // =====================================
  // Delete Category
  // =====================================

  const handleDeleteCategory = async (category) => {
    if (
      !window.confirm(
        `Delete the category "${category.name}"? Its gallery items will be uncategorized.`
      )
    ) {
      return;
    }

    try {
      await deleteGalleryCategory(category.id);

      alert("Category deleted.");

      refreshData();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete category."
      );
    }
  };

  // =====================================
  // Loading
  // =====================================

  if (loading) {
    return (
      <div className="text-center py-5">
        <div
          className="spinner-border text-warning"
          role="status"
        ></div>
      </div>
    );
  }

  // =====================================
  // Render
  // =====================================

  return (
    <div className="container-fluid">

      <h2 className="fw-bold mb-4">
        Gallery Management
      </h2>

      <GalleryForm
        onSubmit={handleUpload}
        categories={categories}
        onAddCategory={handleAddCategory}
        onDeleteCategory={handleDeleteCategory}
      />

      <GalleryTable
        gallery={gallery}
        onDelete={handleDelete}
      />

    </div>
  );
}

export default Gallery;