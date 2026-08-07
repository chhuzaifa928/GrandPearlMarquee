import { useEffect, useState } from "react";
import {
  getSettings,
  updateSettings,
} from "../../services/settingsService";

function Settings() {

  const [formData, setFormData] = useState({
    website_name: "",
    tagline: "",
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    facebook: "",
    instagram: "",
    youtube: "",
    tiktok: "",

    hero_tagline: "",
    hero_title: "",
    hero_description: "",
    hero_image: "",
  });

  const [heroFile, setHeroFile] = useState(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await getSettings();
      setFormData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      let heroImage = formData.hero_image;

      if (heroFile) {

        const uploadData = new FormData();

        uploadData.append("image", heroFile);

        const response = await fetch(
          "http://localhost:5000/api/upload/settings",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: uploadData,
          }
        );

        const result = await response.json();

        console.log("Upload Response:", result);

        if (result.success) {
          heroImage = result.image;
        }

      }

      await updateSettings({
        ...formData,
        hero_image: heroImage,
      });

      alert("Settings updated successfully.");

      loadSettings();

    } catch (error) {

      console.error(error);

      alert("Failed to update settings.");

    }

  };

  return (
    <div className="container-fluid">

      <h2 className="fw-bold mb-4">
        Website Settings
      </h2>

      <div className="card shadow-sm">

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="row">

              <div className="col-md-6 mb-3">
                <label>Website Name</label>

                <input
                  type="text"
                  className="form-control"
                  name="website_name"
                  value={formData.website_name || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Tagline</label>

                <input
                  type="text"
                  className="form-control"
                  name="tagline"
                  value={formData.tagline || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Phone</label>

                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={formData.phone || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>WhatsApp</label>

                <input
                  type="text"
                  className="form-control"
                  name="whatsapp"
                  value={formData.whatsapp || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Email</label>

                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Address</label>

                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={formData.address || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Facebook</label>

                <input
                  type="text"
                  className="form-control"
                  name="facebook"
                  value={formData.facebook || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Instagram</label>

                <input
                  type="text"
                  className="form-control"
                  name="instagram"
                  value={formData.instagram || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>YouTube</label>

                <input
                  type="text"
                  className="form-control"
                  name="youtube"
                  value={formData.youtube || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>TikTok</label>

                <input
                  type="text"
                  className="form-control"
                  name="tiktok"
                  value={formData.tiktok || ""}
                  onChange={handleChange}
                />
              </div>

            </div>

            <hr className="my-4"/>

            <h4 className="mb-3">
              Homepage Hero Section
            </h4>

            <div className="row">

              <div className="col-md-12 mb-3">

                <label>Hero Tagline</label>

                <input
                  type="text"
                  className="form-control"
                  name="hero_tagline"
                  value={formData.hero_tagline || ""}
                  onChange={handleChange}
                />

              </div>

              <div className="col-md-6 mb-3">
  <label>Hero Title Line 1</label>

  <input
    type="text"
    className="form-control"
    name="hero_title_line1"
    value={formData.hero_title_line1 || ""}
    onChange={handleChange}
  />
</div>

<div className="col-md-6 mb-3">
  <label>Hero Title Line 2</label>

  <input
    type="text"
    className="form-control"
    name="hero_title_line2"
    value={formData.hero_title_line2 || ""}
    onChange={handleChange}
  />
</div>
              <div className="col-md-12 mb-3">

                <label>Hero Description</label>

                <textarea
                  className="form-control"
                  rows="4"
                  name="hero_description"
                  value={formData.hero_description || ""}
                  onChange={handleChange}
                />

              </div>

              <div className="col-md-12 mb-3">

                <label>Hero Background Image</label>

                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) =>
                    setHeroFile(e.target.files[0])
                  }
                />

                {formData.hero_image && (

                  <img
                    src={`http://localhost:5000${formData.hero_image}`}
                    alt="Hero"
                    className="img-fluid rounded mt-3"
                    style={{
                      maxHeight: "220px",
                      objectFit: "cover",
                    }}
                  />

                )}

              </div>

            </div>

            <button
              className="btn btn-warning mt-3"
              type="submit"
            >
              Save Settings
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Settings;