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

import { useToast } from "../../hooks/useToast";
import { useConfirm } from "../../hooks/useConfirm";

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
  const toast = useToast();
  const confirm = useConfirm();

  const { data: galleryData, loading, refetch } = useFetch(fetchGalleryData);

  const gallery = galleryData?.gallery ?? [];
  const categories = galleryData?.categories ?? [];

  // =====================================
  // Upload Gallery
  // =====================================

  const handleUpload = async (formData) => {
    try {
      await uploadGallery(formData);

      toast.success("Gallery uploaded successfully.");

      refetch();
    } catch (error) {
      console.error(error);

      toast.error("Upload failed.");
    }
  };

  // =====================================
  // Add Category
  // =====================================

  const handleAddCategory = async (categoryName) => {
    try {
      await addGalleryCategory(categoryName);

      toast.success("Category added successfully.");

      // Reload categories immediately
      refetch();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to add category."
      );
    }
  };

  // =====================================
  // Delete Gallery
  // =====================================

  const handleDelete = async (id) => {
    const ok = await confirm({
      title: "Delete media?",
      message: "Are you sure you want to delete this gallery item?",
    });

    if (!ok) return;

    try {
      await deleteGallery(id);

      toast.success("Gallery item deleted.");

      refetch();
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete gallery item.");
    }
  };

  // =====================================
  // Delete Category
  // =====================================

  const handleDeleteCategory = async (category) => {
    const ok = await confirm({
      title: "Delete category?",
      message: `Delete the category "${category.name}"? Its gallery items will be uncategorized.`,
    });

    if (!ok) return;

    try {
      await deleteGalleryCategory(category.id);

      toast.success("Category deleted.");

      refetch();
    } catch (error) {
      console.error(error);

      toast.error(
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