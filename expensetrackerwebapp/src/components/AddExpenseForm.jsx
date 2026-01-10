import { useEffect, useState } from "react";
import Input from "./Input";
import EmojiPickerPopup from "./EmojiPickerPopup";

const AddExpenseForm = ({ onAddExpense, categories }) => {
  const [expense, setExpense] = useState({
    name: "",
    icon: "",
    categoryId: "",
    amount: "",
    date: "",
  });

  useEffect(() => {
    if (categories.length > 0 && !expense.categoryId) {
      setExpense((prev) => ({
        ...prev,
        categoryId: categories[0].id,
      }));
    }
  }, [categories]);

  const handleChange = (key, value) => {
    setExpense((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onAddExpense(expense);

    setExpense({
      name: "",
      icon: "",
      categoryId: categories[0]?.id || "",
      amount: "",
      date: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(icon) => handleChange("icon", icon)}
      />

      <Input
        label="Expense Name"
        value={expense.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />

      <Input
        label="Category"
        isSelect
        value={expense.categoryId}
        onChange={(e) => handleChange("categoryId", e.target.value)}
        options={categories.map((c) => ({
          value: c.id,
          label: c.name,
        }))}
      />

      <Input
        label="Amount"
        type="number"
        value={expense.amount}
        onChange={(e) => handleChange("amount", e.target.value)}
      />

      <Input
        label="Date"
        type="date"
        value={expense.date}
        onChange={(e) => handleChange("date", e.target.value)}
      />

      <div className="expense-form-actions">
        <button className="expense-submit-btn">Add Expense</button>
      </div>

      {/* SCOPED STYLES */}
      <style>{`
        .expense-form {
          background: white;
          padding: 24px;
          border-radius: 18px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .expense-form-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 8px;
        }

        .expense-submit-btn {
          padding: 10px 20px;
          border-radius: 12px;
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
          font-weight: 600;
          border: none;
          cursor: pointer;
          box-shadow: 0 8px 25px rgba(239,68,68,0.35);
          transition: all 0.25s ease;
        }

        .expense-submit-btn:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 12px 35px rgba(239,68,68,0.55);
        }
      `}</style>
    </form>
  );
};

export default AddExpenseForm;
