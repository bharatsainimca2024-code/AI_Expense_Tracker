import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard.jsx";
import IncomeOverview from "../components/IncomeOverview.jsx";
import IncomeList from "../components/IncomeList.jsx";
import AddIncomeForm from "../components/AddIncomeForm.jsx";
import DeleteAlert from "../components/DeleteAlert.jsx";
import Modal from "../components/Modal.jsx";
import { useUser } from "../hooks/useUser.jsx";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import { toast } from "react-hot-toast";

const Income = () => {
  useUser();

  const [incomeData, setIncomeData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const fetchIncomeDetails = async () => {
    try {
      const res = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
      setIncomeData(res.data || []);
    } catch {
      toast.error("Failed to fetch income details");
    }
  };

  const fetchIncomeCategories = async () => {
    try {
      const res = await axiosConfig.get(
        API_ENDPOINTS.CATEGORY_BY_TYPE("income")
      );
      setCategories(res.data || []);
    } catch {
      toast.error("Failed to fetch income categories");
    }
  };

  const handleAddIncome = async (income) => {
    try {
      await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
        ...income,
        amount: Number(income.amount),
        categoryId: Number(income.categoryId),
      });
      toast.success("Income added successfully");
      setOpenAddIncomeModal(false);
      fetchIncomeDetails();
    } catch {
      toast.error("Failed to add income");
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
      toast.success("Income deleted successfully");
      setOpenDeleteAlert({ show: false, data: null });
      fetchIncomeDetails();
    } catch {
      toast.error("Failed to delete income");
    }
  };

  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Income details downloaded successfully");
    } catch {
      toast.error("Failed to download income details");
    }
  };

  const handleEmailIncomeDetails = async () => {
    try {
      const res = await axiosConfig.get(API_ENDPOINTS.EMAIL_INCOME);
      if (res.status === 200) toast.success("Income emailed successfully");
    } catch {
      toast.error("Failed to email income details");
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
    fetchIncomeCategories();
  }, []);

  return (
    <Dashboard activeMenu="Income">
      <div className="income-header">
        <h1>Income</h1>
        <button className="income-add-btn" onClick={() => setOpenAddIncomeModal(true)}>
          + Add Income
        </button>
      </div>

      <div className="income-glass">
        <IncomeOverview transactions={incomeData} />

        <IncomeList
          transactions={incomeData}
          onDelete={(income) =>
            setOpenDeleteAlert({ show: true, data: income })
          }
          onDownload={handleDownloadIncomeDetails}
          onEmail={handleEmailIncomeDetails}
        />
      </div>

      <Modal
        isOpen={openAddIncomeModal}
        title="Add Income"
        onClose={() => setOpenAddIncomeModal(false)}
      >
        <AddIncomeForm onAddIncome={handleAddIncome} categories={categories} />
      </Modal>

      <Modal
        isOpen={openDeleteAlert.show}
        title="Delete Income"
        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
      >
        <DeleteAlert
          content="Are you sure you want to delete this income?"
          onDelete={() => deleteIncome(openDeleteAlert.data?.id)}
        />
      </Modal>

      {/* COMPONENT SCOPED STYLES */}
      <style>{`
        .income-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 28px;
          border-radius: 18px;
          background: linear-gradient(135deg, #1b1740, #0c0b1f);
          margin-bottom: 24px;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06);
        }

        .income-header h1 {
          font-size: 32px;
          font-weight: 700;
          color: white;
        }

        .income-add-btn {
          padding: 12px 22px;
          border-radius: 14px;
          background: linear-gradient(135deg, #7c3aed, #9333ea);
          color: white;
          font-weight: 600;
          border: none;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(124,58,237,0.35);
          transition: all .25s ease;
        }

        .income-add-btn:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 14px 45px rgba(124,58,237,0.55);
        }

        .income-glass {
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

export default Income;
