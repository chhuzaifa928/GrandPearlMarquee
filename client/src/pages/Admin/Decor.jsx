import { useEffect, useState } from "react";

import DecorForm from "../../components/Admin/Decor/DecorForm";
import DecorTable from "../../components/Admin/Decor/DecorTable";
import DecorModal from "../../components/Admin/Decor/DecorModal";

import {
  getAllDecor,
  addDecor,
  updateDecor,
  deleteDecor,
} from "../../services/decorService";

function Decor() {
  const [decor, setDecor] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedDecor, setSelectedDecor] = useState(null);

  useEffect(() => {
    loadDecor();
  }, []);

  const loadDecor = async () => {
    try {
      const data = await getAllDecor();
      setDecor(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Add Decor
  const handleAddDecor = async (formData) => {
    try {
      await addDecor(formData);

      alert("Decor added successfully.");

      loadDecor();
    } catch (error) {
      console.error(error);
      alert("Failed to add decor.");
    }
  };

  // Open Edit Modal
  const handleEditDecor = (item) => {
    setSelectedDecor(item);
    setShowModal(true);
  };

  // Save Edited Decor
  const handleSaveDecor = async (id, formData) => {
    try {
      await updateDecor(id, formData);

      alert("Decor updated successfully.");

      setShowModal(false);

      loadDecor();
    } catch (error) {
      console.error(error);
      alert("Failed to update decor.");
    }
  };

  // Delete Decor
  const handleDeleteDecor = async (id) => {
    if (!window.confirm("Delete this decor?")) return;

    try {
      await deleteDecor(id);

      alert("Decor deleted successfully.");

      loadDecor();
    } catch (error) {
      console.error(error);
      alert("Failed to delete decor.");
    }
  };

  return (
    <div className="container-fluid">

      <h2 className="fw-bold mb-4">
        Decor Management
      </h2>

      <DecorForm onSubmit={handleAddDecor} />

      {loading ? (
        <div className="text-center py-5">
          <div
            className="spinner-border text-warning"
            role="status"
          >
            <span className="visually-hidden">
              Loading...
            </span>
          </div>
        </div>
      ) : (
        <DecorTable
          decor={decor}
          onEdit={handleEditDecor}
          onDelete={handleDeleteDecor}
        />
      )}

      <DecorModal
        show={showModal}
        onClose={() => setShowModal(false)}
        decor={selectedDecor}
        onSave={handleSaveDecor}
      />

    </div>
  );
}

export default Decor;