import { useState } from "react";

function FoodItemForm({ categories = [], onSubmit }) {
  const [formData, setFormData] = useState({
    category_id: "",
    item_name: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);

    setFormData({
      category_id: "",
      item_name: "",
      description: "",
    });
  };

  return (
    <div className="card shadow-sm mb-4">

      <div className="card-header">
        <h4>Add Food Item</h4>
      </div>

      <div className="card-body">

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label>Category</label>

            <select
              className="form-select"
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Category
              </option>

              {categories.map((cat) => (
                <option
                  key={cat.id}
                  value={cat.id}
                >
                  {cat.category_name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">

            <label>Food Item</label>

            <input
              className="form-control"
              name="item_name"
              value={formData.item_name}
              onChange={handleChange}
              required
            />

          </div>

          <div className="mb-3">

            <label>Description</label>

            <textarea
              className="form-control"
              rows="3"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />

          </div>

          <button
            className="btn btn-warning"
            type="submit"
          >
            Add Item
          </button>

        </form>

      </div>

    </div>
  );
}

export default FoodItemForm;