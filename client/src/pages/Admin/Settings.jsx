import { useEffect, useState } from "react";
import getMediaUrl from "../../utils/getMediaUrl";
import {
  getSettings,
  updateSettings,
  uploadHeroImage,
} from "../../services/settingsService";
import { useToast } from "../../hooks/useToast";

function Settings() {
  const toast = useToast();

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
    hero_title_line1: "",
    hero_title_line2: "",
  });

  const [heroImage, setHeroImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadSettings = async () => {
      try {
        const data = await getSettings();

        if (cancelled) return;

        setFormData({
          website_name: data.website_name || "",
          tagline: data.tagline || "",
          phone: data.phone || "",
          whatsapp: data.whatsapp || "",
          email: data.email || "",
          address: data.address || "",
          facebook: data.facebook || "",
          instagram: data.instagram || "",
          youtube: data.youtube || "",
          tiktok: data.tiktok || "",

          hero_tagline: data.hero_tagline || "",
          hero_title: data.hero_title || "",
          hero_description: data.hero_description || "",
          hero_image: data.hero_image || "",
          hero_title_line1: data.hero_title_line1 || "",
          hero_title_line2: data.hero_title_line2 || "",
        });
      } catch (error) {
        console.error("Failed to load settings:", error);
      }
    };

    loadSettings();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleHeroImageChange = (e) => {
    setHeroImage(e.target.files[0]);
  };

  const handleHeroImageUpload = async () => {
    if (!heroImage) {
      toast.warning("Please select a hero image first.");
      return;
    }

    try {
      setUploading(true);

      const data = await uploadHeroImage(heroImage);

      setFormData({
        ...formData,
        hero_image: data.image,
      });

      setHeroImage(null);

      toast.success("Hero image uploaded successfully.");
    } catch (error) {
      console.error("Hero image upload failed:", error);
      toast.error("Failed to upload hero image.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateSettings(formData);

      toast.success("Settings updated successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update settings.");
    }
  };

  return (
    <div>
      <h2 className="fw-bold mb-4">
        Website Settings
      </h2>

      <div className="card shadow-sm">
        <div className="card-body">

          <form onSubmit={handleSubmit}>

            {/* =========================
                GENERAL WEBSITE SETTINGS
            ========================== */}

            <h4 className="mb-4">
              General Website Settings
            </h4>

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

            <hr className="my-4" />

            {/* =========================
                HERO SETTINGS
            ========================== */}

            <h4 className="mb-4">
              Hero Section Settings
            </h4>

            <div className="row">

              <div className="col-md-6 mb-3">
                <label>Hero Tagline</label>

                <input
                  type="text"
                  className="form-control"
                  name="hero_tagline"
                  value={formData.hero_tagline}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Hero Title</label>

                <input
                  type="text"
                  className="form-control"
                  name="hero_title"
                  value={formData.hero_title}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Hero Title Line 1</label>

                <input
                  type="text"
                  className="form-control"
                  name="hero_title_line1"
                  value={formData.hero_title_line1}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Hero Title Line 2</label>

                <input
                  type="text"
                  className="form-control"
                  name="hero_title_line2"
                  value={formData.hero_title_line2}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 mb-3">
                <label>Hero Description</label>

                <textarea
                  className="form-control"
                  rows="4"
                  name="hero_description"
                  value={formData.hero_description}
                  onChange={handleChange}
                />
              </div>

              {/* Current Hero Image */}

              {formData.hero_image && (
                <div className="col-12 mb-3">
                  <label className="d-block mb-2">
                    Current Hero Image
                  </label>

                  <img
                   src={getMediaUrl(formData.hero_image)}
                    alt="Current Hero"
                    style={{
                      width: "100%",
                      maxWidth: "600px",
                      height: "250px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              )}

              {/* Upload Hero Image */}

              <div className="col-md-8 mb-3">
                <label>Upload New Hero Image</label>

                <input
                  type="file"
                  className="form-control"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleHeroImageChange}
                />
              </div>

              <div className="col-md-4 mb-3 d-flex align-items-end">

                <button
                  type="button"
                  className="btn btn-dark w-100"
                  onClick={handleHeroImageUpload}
                  disabled={uploading}
                >
                  {uploading
                    ? "Uploading..."
                    : "Upload Hero Image"}
                </button>

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