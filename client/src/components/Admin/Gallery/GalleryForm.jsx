import { useState } from "react";
import { useToast } from "../../../hooks/useToast";
import "./GalleryForm.css";

function GalleryForm({
  onSubmit,
  categories = [],
  onAddCategory,
  onDeleteCategory,
}) {
  const toast = useToast();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    media_type: "image",
    image: null,
  });

  const [newCategory, setNewCategory] = useState("");
  const [addingCategory, setAddingCategory] = useState(false);
  const [deletingCategoryId, setDeletingCategoryId] = useState(null);

  // =====================================
  // Handle Form Changes
  // =====================================

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  // =====================================
  // Add New Category
  // =====================================

  const handleAddCategory = async () => {
    const categoryName = newCategory.trim();

    if (!categoryName) {
      toast.warning("Please enter a category name.");
      return;
    }

    if (!onAddCategory) {
      return;
    }

    try {
      setAddingCategory(true);

      await onAddCategory(categoryName);

      // Select newly added category
      setFormData((previous) => ({
        ...previous,
        category: categoryName,
      }));

      setNewCategory("");
    } catch (error) {
      console.error(error);
    } finally {
      setAddingCategory(false);
    }
  };

  // =====================================
  // Delete Category
  // =====================================

  const handleDeleteCategory = async (category) => {
    if (!onDeleteCategory) {
      return;
    }

    setDeletingCategoryId(category.id);

    try {
      await onDeleteCategory(category);
    } finally {
      setDeletingCategoryId(null);
    }
  };

  // =====================================
  // Submit Gallery
  // =====================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.category) {
      toast.warning("Please select a gallery category.");
      return;
    }

    if (!formData.image) {
      toast.warning("Please select an image or video.");
      return;
    }

    const data = new FormData();

    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("media_type", formData.media_type);
    data.append("image", formData.image);

    onSubmit(data);

    setFormData({
      title: "",
      category: "",
      media_type: "image",
      image: null,
    });

    e.target.reset();
  };

  return (
    <div className="card shadow-sm mb-4">

      <div className="card-header">
        <h4>Upload Gallery</h4>
      </div>

      <div className="card-body">

        <form onSubmit={handleSubmit}>

          {/* =====================================
              Title
          ===================================== */}

          <div className="mb-3">

            <label className="form-label">
              Title
            </label>

            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter gallery title"
              required
            />

          </div>

          {/* =====================================
              Category
          ===================================== */}

          <div className="mb-3">

            <label className="form-label">
              Category
            </label>

            <select
              className="form-select"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >

              <option value="">
                Select Category
              </option>

              {categories.map((category) => (

                <option
                  key={category.id}
                  value={category.name}
                >
                  {category.name}
                </option>

              ))}

            </select>

          </div>

          {/* =====================================
              Add New Category
          ===================================== */}

          <div className="mb-3">

            <label className="form-label">
              Add New Category
            </label>

            <div className="input-group add-category-group">

              <input
                type="text"
                className="form-control"
                value={newCategory}
                onChange={(e) =>
                  setNewCategory(e.target.value)
                }
                placeholder="Enter new category"
              />

              <button
                type="button"
                className="btn btn-dark"
                onClick={handleAddCategory}
                disabled={addingCategory}
              >

                {addingCategory
                  ? "Adding..."
                  : "Add Category"}

              </button>

            </div>

            <small className="text-muted">
              Add a new event category if it does not
              already exist.
            </small>

          </div>

          {/* =====================================
              Manage Categories
          ===================================== */}

          <div className="mb-3">

            <label className="form-label">
              Manage Categories
            </label>

            <ul className="category-list">

              {categories.map((category) => (
                <li
                  key={category.id}
                  className="category-list-item"
                >
                  <span className="category-name">
                    {category.name}
                  </span>

                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      handleDeleteCategory(category)
                    }
                    disabled={
                      deletingCategoryId === category.id
                    }
                  >
                    {deletingCategoryId === category.id
                      ? "Deleting..."
                      : "Delete"}
                  </button>
                </li>
              ))}

            </ul>

          </div>

          {/* =====================================
              Media Type
          ===================================== */}

          <div className="mb-3">

            <label className="form-label">
              Media Type
            </label>

            <select
              className="form-select"
              name="media_type"
              value={formData.media_type}
              onChange={handleChange}
            >

              <option value="image">
                Image
              </option>

              <option value="video">
                Video
              </option>

            </select>

          </div>

          {/* =====================================
              File
          ===================================== */}

          <div className="mb-3">

            <label className="form-label">
              Select File
            </label>

            <input
              type="file"
              className="form-control"
              name="image"
              accept={
                formData.media_type === "video"
                  ? "video/*"
                  : "image/*"
              }
              onChange={handleChange}
              required
            />

          </div>

          {/* =====================================
              Upload Button
          ===================================== */}

          <button
            className="btn btn-warning"
            type="submit"
          >
            Upload
          </button>

        </form>

      </div>

    </div>
  );
}

export default GalleryForm;