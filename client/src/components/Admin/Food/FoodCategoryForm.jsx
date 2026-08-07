import { useState } from "react";

function FoodCategoryForm({ onSubmit }) {
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!category.trim()) return;

    const formData = new FormData();
    formData.append("category_name", category);

    if (image) {
      formData.append("image", image);
    }

    onSubmit(formData);

    setCategory("");
    setImage(null);

    e.target.reset();
  };

  return (
    <div className="card shadow-sm mb-4">

      <div className="card-header">
        <h4>Add Food Category</h4>
      </div>

      <div className="card-body">

        <form onSubmit={handleSubmit}>

          <div className="mb-3">

            <input
              type="text"
              className="form-control"
              placeholder="Category Name"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            />

          </div>

          <div className="mb-3">

            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) =>
                setImage(e.target.files[0])
              }
            />

          </div>

          <button
            className="btn btn-warning"
            type="submit"
          >
            Add Category
          </button>

        </form>

      </div>

    </div>
  );
}

export default FoodCategoryForm;