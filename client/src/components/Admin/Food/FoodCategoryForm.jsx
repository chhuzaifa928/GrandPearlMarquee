import { useState } from "react";

function FoodCategoryForm({ onSubmit }) {
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!category.trim()) return;

    onSubmit(category);

    setCategory("");
  };

  return (
    <div className="card shadow-sm mb-4">

      <div className="card-header">
        <h4>Add Food Category</h4>
      </div>

      <div className="card-body">

        <form onSubmit={handleSubmit}>

          <div className="input-group">

            <input
              type="text"
              className="form-control"
              placeholder="Category Name"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            />

            <button
              className="btn btn-warning"
              type="submit"
            >
              Add Category
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default FoodCategoryForm;