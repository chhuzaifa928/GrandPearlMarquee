import { useEffect, useState } from "react";

function FoodModal({
  show,
  onClose,
  onSave,
  categories,
  food,
}) {
  const [formData, setFormData] = useState({
    category_id: "",
    item_name: "",
    description: "",
  });

  useEffect(() => {
    if (food) {
      setFormData({
        category_id: food.category_id,
        item_name: food.item_name,
        description: food.description || "",
      });
    }
  }, [food]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave(food.id, formData);
  };

  if (!show) return null;

  return (
    <div
      className="modal d-block"
      style={{ background: "rgba(0,0,0,.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5>Edit Food Item</h5>

            <button
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="modal-body">

              <div className="mb-3">

                <label>Category</label>

                <select
                  className="form-select"
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                >
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
                />

              </div>

              <div className="mb-3">

                <label>Description</label>

                <textarea
                  rows="3"
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />

              </div>

            </div>

            <div className="modal-footer">

              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>

              <button
                className="btn btn-warning"
                type="submit"
              >
                Save Changes
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
}

export default FoodModal;