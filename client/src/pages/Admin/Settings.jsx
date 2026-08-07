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
  });

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
      await updateSettings(formData);

      alert("Settings updated successfully.");
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
                  value={formData.website_name}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Tagline</label>

                <input
                  type="text"
                  className="form-control"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Phone</label>

                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>WhatsApp</label>

                <input
                  type="text"
                  className="form-control"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Email</label>

                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Address</label>

                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Facebook</label>

                <input
                  type="text"
                  className="form-control"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Instagram</label>

                <input
                  type="text"
                  className="form-control"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>YouTube</label>

                <input
                  type="text"
                  className="form-control"
                  name="youtube"
                  value={formData.youtube}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>TikTok</label>

                <input
                  type="text"
                  className="form-control"
                  name="tiktok"
                  value={formData.tiktok}
                  onChange={handleChange}
                />
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