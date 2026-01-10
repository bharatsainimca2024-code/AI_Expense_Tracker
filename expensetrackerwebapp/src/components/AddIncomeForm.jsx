import { useEffect, useState } from "react";
import Input from "./Input";
import EmojiPickerPopup from "./EmojiPickerPopup";

const AddIncomeForm = ({ onAddIncome, categories = [] }) => {
  const [income, setIncome] = useState({
    name: "",
    icon: "",
    categoryId: "",
    amount: "",
    date: "",
  });

  useEffect(() => {
    if (categories.length > 0 && !income.categoryId) {
      setIncome((prev) => ({
        ...prev,
        categoryId: categories[0].id,
      }));
    }
  }, [categories]);

  const handleChange = (key, value) => {
    setIncome((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onAddIncome(income);

    setIncome({
      name: "",
      icon: "",
      categoryId: categories[0]?.id || "",
      amount: "",
      date: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl space-y-4"
    >
      {/* Icon Picker */}
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(icon) => handleChange("icon", icon)}
      />

      {/* Income Source */}
      <Input
        label="Income Source"
        value={income.name}
        onChange={(e) => handleChange("name", e.target.value)}
        placeholder="Salary, Bonus, Freelance"
      />

      {/* Category */}
      <Input
        label="Category"
        isSelect
        value={income.categoryId}
        onChange={(e) => handleChange("categoryId", e.target.value)}
        options={categories.map((c) => ({
          value: c.id,
          label: c.name,
        }))}
      />

      {/* Amount */}
      <Input
        label="Amount"
        type="number"
        value={income.amount}
        onChange={(e) => handleChange("amount", e.target.value)}
        placeholder="Enter amount"
      />

      {/* Date */}
      <Input
        label="Date"
        type="date"
        value={income.date}
        onChange={(e) => handleChange("date", e.target.value)}
      />

      {/* Action Button */}
      <div className="flex justify-end pt-2">
        <button type="submit" className="add-btn">
          Add Income
        </button>
      </div>

      {/* Button Styles */}
      <style>{`
        .add-btn {
          padding: 10px 26px;
          border-radius: 12px;
          background: linear-gradient(135deg, #6366f1, #4f46e5);
          color: #ffffff;
          font-weight: 600;
          font-size: 14px;
          border: none;
          cursor: pointer;
          box-shadow:
            0 6px 0 #4338ca,
            0 14px 28px rgba(79, 70, 229, 0.45);
          transition: all 0.15s ease;
        }

        .add-btn:hover {
          transform: translateY(-2px);
          box-shadow:
            0 8px 0 #4338ca,
            0 18px 34px rgba(79, 70, 229, 0.55);
        }

        .add-btn:active {
          transform: translateY(3px);
          box-shadow:
            0 3px 0 #4338ca,
            0 8px 18px rgba(79, 70, 229, 0.35);
        }
      `}</style>
    </form>
  );
};

export default AddIncomeForm;
