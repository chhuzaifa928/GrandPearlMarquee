import { useState } from "react";

const GALLERY_CATEGORIES = [
  "Barat",
  "Walima",
  "Mehndi",
  "Nikkah",
  "Birthday",
  "Corporate",
  "Gathering",
  "Engagement",
];

function GalleryForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
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

    if (!formData.image) {
      alert("Please select an image or video.");
      return;
    }

    if (!formData.category) {
      alert("Please select a category.");
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

          {/* Title */}

          <div className="mb-3">

            <label className="form-label">
              Title
            </label>

            <input
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter gallery title"
              required
            />

          </div>

          {/* Category */}

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

              {GALLERY_CATEGORIES.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}

            </select>

          </div>

          {/* Media Type */}

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

          {/* File */}

          <div className="mb-3">

            <label className="form-label">
              Select File
            </label>

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