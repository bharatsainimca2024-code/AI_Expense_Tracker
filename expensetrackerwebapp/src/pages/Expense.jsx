import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard.jsx";
import ExpenseOverview from "../components/ExpenseOverview.jsx";
import ExpenseList from "../components/ExpenseList.jsx";
import AddExpenseForm from "../components/AddExpenseForm.jsx";
import DeleteAlert from "../components/DeleteAlert.jsx";
import Modal from "../components/Modal.jsx";
import { useUser } from "../hooks/useUser.jsx";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import { toast } from "react-hot-toast";

const Expense = () => {
  useUser();

  const [expenseData, setExpenseData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  // ================= FETCH =================
  const fetchExpenseDetails = async () => {
    try {
      const res = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);
      setExpenseData(res.data || []);
    } catch {
      toast.error("Failed to fetch expense details");
    }
  };

  const fetchExpenseCategories = async () => {
    try {
      const res = await axiosConfig.get(
        API_ENDPOINTS.CATEGORY_BY_TYPE("expense")
      );
      setCategories(res.data || []);
    } catch {
      toast.error("Failed to fetch expense categories");
    }
  };

  // ================= ADD =================
  const handleAddExpense = async (expense) => {
    try {
      await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
        ...expense,
        amount: Number(expense.amount),
        categoryId: Number(expense.categoryId),
      });
      toast.success("Expense added successfully");
      setOpenAddExpenseModal(false);
      fetchExpenseDetails();
    } catch {
      toast.error("Failed to add expense");
    }
  };

  // ================= DELETE =================
  const deleteExpense = async (id) => {
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));
      toast.success("Expense deleted successfully");
      setOpenDeleteAlert({ show: false, data: null });
      fetchExpenseDetails();
    } catch {
      toast.error("Failed to delete expense");
    }
  };

  // ================= DOWNLOAD =================
  const handleDownloadExpenses = () => {
    if (!expenseData.length) {
      toast.error("No expense data to download");
      return;
    }

    const headers = ["Name", "Amount", "Date"];
    const rows = expenseData.map((e) => [
      e.name,
      e.amount,
      e.date,
    ]);

    const csv =
      [headers, ...rows]
        .map((r) => r.join(","))
        .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "expenses.csv";
    a.click();

    window.URL.revokeObjectURL(url);
    toast.success("Expense file downloaded");
  };

  // ================= EMAIL =================
  const handleEmailExpenses = async () => {
  try {
    await axiosConfig.get("/expenses/email-excel");
    toast.success("Expense excel emailed successfully");
  } catch (e) {
    toast.error("Email service not available");
  }
};

  useEffect(() => {
    fetchExpenseDetails();
    fetchExpenseCategories();
  }, []);

  return (
    <Dashboard activeMenu="Expense">
      {/* ===== HEADER ===== */}
      <div className="page-header">
        <h1>Expense</h1>
        <button onClick={() => setOpenAddExpenseModal(true)}>
          + Add Expense
        </button>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="page-glass">
        <ExpenseOverview transactions={expenseData} />

        <ExpenseList
          transactions={expenseData}
          onDelete={(expense) =>
            setOpenDeleteAlert({ show: true, data: expense })
          }
          onDownload={handleDownloadExpenses}
          onEmail={handleEmailExpenses}
        />
      </div>

      {/* ===== ADD MODAL ===== */}
      <Modal
        isOpen={openAddExpenseModal}
        title="Add Expense"
        onClose={() => setOpenAddExpenseModal(false)}
      >
        <AddExpenseForm
          onAddExpense={handleAddExpense}
          categories={categories}
        />
      </Modal>

      {/* ===== DELETE MODAL ===== */}
      <Modal
        isOpen={openDeleteAlert.show}
        title="Delete Expense"
        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
      >
        <DeleteAlert
          content="Are you sure you want to delete this expense?"
          onDelete={() => deleteExpense(openDeleteAlert.data?.id)}
        />
      </Modal>

      {/* ===== STYLES (UNCHANGED) ===== */}
      <style>{`
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 28px;
          border-radius: 18px;
          background: linear-gradient(135deg, #0f172a, #1e1b4b);
          margin-bottom: 24px;
          box-shadow:
            inset 0 0 0 1px rgba(255,255,255,0.06),
            0 20px 60px rgba(0,0,0,0.55);
        }

        .page-header h1 {
          font-size: 32px;
          font-weight: 700;
          color: #ffffff;
        }

        .page-header button {
          padding: 12px 22px;
          border-radius: 14px;
          background: linear-gradient(135deg, #7c3aed, #4f46e5);
          color: white;
          font-weight: 600;
          border: none;
          cursor: pointer;
          box-shadow: 0 12px 35px rgba(124,58,237,0.45);
          transition: all 0.25s ease;
        }

        .page-header button:hover {
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 18px 55px rgba(124,58,237,0.65);
        }

        .page-glass {
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(18px);
          border-radius: 20px;
          padding: 26px;
          box-shadow:
            inset 0 0 0 1px rgba(255,255,255,0.06),
            0 20px 60px rgba(0,0,0,0.4);
        }
      `}</style>
    </Dashboard>
  );
};

export default Expense;
