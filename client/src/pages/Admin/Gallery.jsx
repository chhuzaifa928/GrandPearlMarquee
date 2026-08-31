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

import useFetch from "../../hooks/useFetch";

// =====================================
// Load Gallery + Categories
// =====================================

const fetchGalleryData = async () => {
  const [galleryData, categoryData] = await Promise.all([
    getGallery(),
    getGalleryCategories(),
  ]);

  return { gallery: galleryData, categories: categoryData };
};

function Gallery() {
  const { data: galleryData, loading, refetch } = useFetch(fetchGalleryData);

  const gallery = galleryData?.gallery ?? [];
  const categories = galleryData?.categories ?? [];

  // =====================================
  // Upload Gallery
  // =====================================

  const handleUpload = async (formData) => {
    try {
      await uploadGallery(formData);

      alert("Gallery uploaded successfully.");

      refetch();
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
      refetch();
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

      refetch();
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

      refetch();
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