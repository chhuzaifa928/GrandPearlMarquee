import { useEffect, useState } from "react";

import FoodCategoryForm from "../../components/Admin/Food/FoodCategoryForm";
import FoodCategoryTable from "../../components/Admin/Food/FoodCategoryTable";
import FoodItemForm from "../../components/Admin/Food/FoodItemForm";
import FoodItemTable from "../../components/Admin/Food/FoodItemTable";
import FoodModal from "../../components/Admin/Food/FoodModal";

import {
  getCategories,
  addCategory,
  deleteCategory,
  getItems,
  addItem,
  updateItem,
  deleteItem,
} from "../../services/foodService";

function Food() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const categoryData = await getCategories();
      const itemData = await getItems();

      setCategories(categoryData);
      setItems(itemData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // Category
  // ============================

  const handleAddCategory = async (category) => {
    try {
      await addCategory(category);

      alert("Category added successfully.");

      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await deleteCategory(id);

      alert("Category deleted successfully.");

      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  // ============================
  // Food Items
  // ============================

  const handleAddItem = async (item) => {
    try {
      await addItem(item);

      alert("Food item added successfully.");

      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  // EDIT
  const handleEditItem = (item) => {
    setSelectedFood(item);
    setShowModal(true);
  };

  // SAVE
  const handleSaveItem = async (id, item) => {
    try {
      await updateItem(id, item);

      alert("Food item updated successfully.");

      setShowModal(false);

      loadData();
    } catch (error) {
      console.error(error);
      alert("Failed to update food item.");
    }
  };

  // DELETE
  const handleDeleteItem = async (id) => {
    if (!window.confirm("Delete this item?")) return;

    try {
      await deleteItem(id);

      alert("Food item deleted successfully.");

      loadData();
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
        Food Management
      </h2>

      <FoodCategoryForm
        onSubmit={handleAddCategory}
      />

      <FoodCategoryTable
        categories={categories}
        onDelete={handleDeleteCategory}
      />

      <FoodItemForm
        categories={categories}
        onSubmit={handleAddItem}
      />

      <FoodItemTable
        items={items}
        onEdit={handleEditItem}
        onDelete={handleDeleteItem}
      />

      <FoodModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveItem}
        food={selectedFood}
        categories={categories}
      />

    </div>
  );
}

export default Food;