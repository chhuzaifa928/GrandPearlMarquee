import { useState } from "react";

function DecorForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({
        ...formData,
        image: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const submitForm = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("category", formData.category);
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("image", formData.image);

    onSubmit(data);

    setFormData({
      category: "",
      title: "",
      description: "",
      image: null,
    });

    e.target.reset();
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header">
        <h4>Add New Decor</h4>
      </div>

      <div className="card-body">

        <form onSubmit={submitForm}>

          <div className="mb-3">
            <label className="form-label">
              Category
            </label>

            <input
              type="text"
              name="category"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Title
            </label>

            <input
              type="text"
              name="title"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Description
            </label>

            <textarea
              name="description"
              className="form-control"
              rows="3"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Image
            </label>

            <input
              type="file"
              name="image"
              className="form-control"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="btn btn-warning"
            type="submit"
          >
            Add Decor
          </button>

        </form>

      </div>
    </div>
  );
}

export default DecorForm;