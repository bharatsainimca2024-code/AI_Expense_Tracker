import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";

import Dashboard from "../components/Dashboard.jsx";
import CategoryList from "../components/CategoryList.jsx";
import Modal from "../components/Modal.jsx";
import AddCategoryForm from "../components/AddCategoryForm.jsx";
import { useUser } from "../hooks/useUser.jsx";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";

const Category = () => {
  useUser();

  const [categoryData, setCategoryData] = useState([]);
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategoryDetails = async () => {
    try {
      const res = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
      setCategoryData(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch {
      toast.error("Failed to fetch categories");
    }
  };

  const handleAddCategory = async (category) => {
    try {
      await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, category);
      toast.success("Category added");
      setOpenAddCategoryModal(false);
      fetchCategoryDetails();
    } catch {
      toast.error("Failed to add category");
    }
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setOpenEditCategoryModal(true);
  };

  const handleUpdateCategory = async (updatedCategory) => {
    try {
      await axiosConfig.put(
        `${API_ENDPOINTS.UPDATE_CATEGORY}/${selectedCategory.id}`,
        updatedCategory
      );
      toast.success("Category updated");
      setOpenEditCategoryModal(false);
      setSelectedCategory(null);
      fetchCategoryDetails();
    } catch {
      toast.error("Failed to update category");
    }
  };

  useEffect(() => {
    fetchCategoryDetails();
  }, []);

  return (
    <Dashboard activeMenu="Category">
      <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-8 py-8">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-extrabold text-white tracking-wide">
            Categories
          </h2>

          {/* 3D GLOW BUTTON */}
          <button
            onClick={() => setOpenAddCategoryModal(true)}
            className="
            flex items-center gap-2 px-7 py-3 rounded-2xl text-white font-semibold
            bg-gradient-to-br from-purple-600 to-indigo-600
            shadow-[0_10px_0_#312e81,0_0_25px_rgba(139,92,246,0.7)]
            hover:translate-y-[2px] hover:shadow-[0_8px_0_#312e81,0_0_35px_rgba(139,92,246,0.9)]
            active:translate-y-[8px] active:shadow-none
            transition-all duration-200"
          >
            <Plus size={18} />
            Add Category
          </button>
        </div>

        <CategoryList
          categories={categoryData}
          onEditCategory={handleEditCategory}
        />
      </div>

      {/* ADD */}
      <Modal
        isOpen={openAddCategoryModal}
        title="Add Category"
        onClose={() => setOpenAddCategoryModal(false)}
      >
        <AddCategoryForm onSubmit={handleAddCategory} />
      </Modal>

      {/* EDIT */}
      <Modal
        isOpen={openEditCategoryModal}
        title="Edit Category"
        onClose={() => {
          setOpenEditCategoryModal(false);
          setSelectedCategory(null);
        }}
      >
        <AddCategoryForm
          initialData={selectedCategory}
          onSubmit={handleUpdateCategory}
        />
      </Modal>
    </Dashboard>
  );
};

export default Category;
