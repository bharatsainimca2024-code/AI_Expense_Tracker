import { useEffect, useState } from "react";
import Input from "./Input.jsx";
import EmojiPickerPopup from "./EmojiPickerPopup.jsx";

const AddCategoryForm = ({ onSubmit, initialData }) => {
  const [category, setCategory] = useState({
    name: "",
    type: "income",
    icon: ""
  });

  useEffect(() => {
    if (initialData) {
      setCategory({
        name: initialData.name || "",
        type: initialData.type || "income",
        icon: initialData.icon || ""
      });
    }
  }, [initialData]);

  const categoryTypeOptions = [
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" }
  ];

  const handleChange = (key, value) => {
    setCategory((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(category);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        space-y-6
        bg-white
        p-6 rounded-3xl
      "
    >
      {/* ICON PICKER */}
      <div className="flex justify-center">
        <div
          className="
            bg-gradient-to-br from-indigo-50 to-purple-50
            p-4 rounded-2xl
            shadow-sm
          "
        >
          <EmojiPickerPopup
            icon={category.icon}
            onSelect={(icon) => handleChange("icon", icon)}
          />
        </div>
      </div>

      {/* CATEGORY NAME */}
      <Input
        label="Category Name"
        value={category.name}
        onChange={(e) => handleChange("name", e.target.value)}
        placeholder="e.g. Salary, Groceries"
        type="text"
      />

      {/* CATEGORY TYPE */}
      <Input
        label="Category Type"
        value={category.type}
        onChange={(e) => handleChange("type", e.target.value)}
        isSelect
        options={categoryTypeOptions}
      />

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        className="
          w-full py-3 rounded-2xl
          font-semibold tracking-wide
          text-white
          bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400
          shadow-md
          hover:shadow-lg
          hover:scale-[1.02]
          active:scale-[0.98]
          transition-all duration-300
        "
      >
        {initialData ? "Update Category" : "Add Category"}
      </button>
    </form>
  );
};

export default AddCategoryForm;
