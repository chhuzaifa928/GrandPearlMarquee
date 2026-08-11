import { useState } from "react";

function DecorForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    image: null,
    media: [],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({
        ...formData,
        image: files[0],
      });
    } else if (name === "media") {
      setFormData({
        ...formData,
        media: Array.from(files),
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

    if (formData.image) {
      data.append("image", formData.image);
    }

    formData.media.forEach((file) => {
      data.append("media", file);
    });

    onSubmit(data);

    setFormData({
      category: "",
      title: "",
      description: "",
      image: null,
      media: [],
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

          {/* Category */}
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

          {/* Title */}
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

          {/* Description */}
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

          {/* Main Image */}
          <div className="mb-3">
            <label className="form-label">
              Main Decor Image
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

          {/* Additional Images */}
          <div className="mb-3">
            <label className="form-label">
              Additional Decor Images
            </label>

            <input
              type="file"
              name="media"
              className="form-control"
              accept="image/*"
              multiple
              onChange={handleChange}
            />

            <small className="text-muted">
              You can select multiple images.
            </small>
          </div>

          {/* Videos */}
          <div className="mb-3">
            <label className="form-label">
              Decor Videos
            </label>

            <input
              type="file"
              name="media"
              className="form-control"
              accept="video/mp4,video/webm,video/quicktime"
              multiple
              onChange={(e) => {
                const newVideos = Array.from(e.target.files);

                setFormData((prev) => ({
                  ...prev,
                  media: [...prev.media, ...newVideos],
                }));
              }}
            />

            <small className="text-muted">
              You can select multiple videos.
            </small>
          </div>

          {/* Submit */}
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