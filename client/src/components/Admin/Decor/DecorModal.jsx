import { useEffect, useState } from "react";

import API_URL from "../../../config/api";

function DecorModal({ show, onClose, onSave, decor }) {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    image: null,
    oldImage: "",
  });

  useEffect(() => {
    if (decor) {
      setFormData({
        category: decor.category,
        title: decor.title,
        description: decor.description,
        image: null,
        oldImage: decor.image,
      });
    }
  }, [decor]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("category", formData.category);
    data.append("title", formData.title);
    data.append("description", formData.description);

    if (formData.image) {
      data.append("image", formData.image);
    } else {
      data.append("image", formData.oldImage);
    }

    onSave(decor.id, data);
  };

  if (!show) return null;

  return (
    <div
      className="modal d-block"
      style={{ background: "rgba(0,0,0,.5)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">

          <div className="modal-header">
            <h5>Edit Decor</h5>

            <button
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="modal-body">

              <div className="mb-3">
                <label>Category</label>

                <input
                  className="form-control"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label>Title</label>

                <input
                  className="form-control"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
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

              <div className="mb-3">

                <img
                  src={`${API_URL}${formData.oldImage}`}
                  alt=""
                  style={{
                    width: 150,
                    borderRadius: 8,
                  }}
                />

              </div>

              <div className="mb-3">

                <label>Replace Image</label>

                <input
                  type="file"
                  className="form-control"
                  name="image"
                  accept="image/*"
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

export default DecorModal;