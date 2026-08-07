import { useState } from "react";

function GalleryForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    media_type: "image",
    image: null,
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("title", formData.title);
    data.append("media_type", formData.media_type);
    data.append("image", formData.image);

    onSubmit(data);

    setFormData({
      title: "",
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

          <div className="mb-3">
            <label>Title</label>

            <input
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Media Type</label>

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

          <div className="mb-3">
            <label>Select File</label>

            <input
              type="file"
              className="form-control"
              name="image"
              accept="image/*,video/*"
              onChange={handleChange}
              required
            />
          </div>

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