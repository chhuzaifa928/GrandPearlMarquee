import { useEffect, useState } from "react";

import GalleryForm from "../../components/Admin/Gallery/GalleryForm";
import GalleryTable from "../../components/Admin/Gallery/GalleryTable";

import {
  getGallery,
  uploadGallery,
  deleteGallery,
} from "../../services/galleryService";

function Gallery() {

  const [gallery, setGallery] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {

    try {

      const data = await getGallery();

      setGallery(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  // ==========================
  // Upload
  // ==========================

  const handleUpload = async (formData) => {

    try {

      await uploadGallery(formData);

      alert("Gallery uploaded successfully.");

      loadGallery();

    } catch (error) {

      console.error(error);

      alert("Upload failed.");

    }

  };

  // ==========================
  // Delete
  // ==========================

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this media?")) return;

    try {

      await deleteGallery(id);

      alert("Gallery item deleted.");

      loadGallery();

    } catch (error) {

      console.error(error);

    }

  };

  if (loading) {

    return (

      <div className="text-center py-5">

        <div
          className="spinner-border text-warning"
          role="status"
        ></div>

      </div>

    );

  }

  return (

    <div className="container-fluid">

      <h2 className="fw-bold mb-4">

        Gallery Management

      </h2>

      <GalleryForm
        onSubmit={handleUpload}
      />

      <GalleryTable
        gallery={gallery}
        onDelete={handleDelete}
      />

    </div>

  );

}

export default Gallery;