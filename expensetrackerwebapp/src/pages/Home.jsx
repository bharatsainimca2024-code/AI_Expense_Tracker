import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WalletCards, Coins } from "lucide-react";

import Dashboard from "../components/Dashboard.jsx";
import InfoCard from "../components/InfoCard.jsx";
import RecentTransactions from "../components/RecentTransactions.jsx";
import FinanceOverview from "../components/FinanceOverview.jsx";
import Transactions from "../components/Transactions.jsx";
import ChatBot from "../components/ChatBot.jsx";

import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import { addThousandsSeparator } from "../util/numberUtils.js";

const Home = () => {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    recentTransactions: [],
    recent5Expenses: [],
    recent5Incomes: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);
        if (res.status === 200) {
          setDashboardData(res.data);
        }
      } catch (error) {
        console.error("Dashboard API error", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Dashboard activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        {/* INFO CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<WalletCards />}
            label="Total Balance"
            value={addThousandsSeparator(
              dashboardData.totalIncome - dashboardData.totalExpense
            )}
            color="bg-purple-800"
          />

          <InfoCard
            icon={<WalletCards />}
            label="Total Income"
            value={addThousandsSeparator(dashboardData.totalIncome)}
            color="bg-green-800"
          />

          <InfoCard
            icon={<Coins />}
            label="Total Expense"
            value={addThousandsSeparator(dashboardData.totalExpense)}
            color="bg-red-800"
          />
        </div>

        {/* RECENT + OVERVIEW */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions
            transactions={dashboardData.recentTransactions}
            onMore={() => navigate("/expense")}
          />

          <FinanceOverview
            totalBalance={
              dashboardData.totalIncome - dashboardData.totalExpense
            }
            totalIncome={dashboardData.totalIncome}
            totalExpense={dashboardData.totalExpense}
          />
        </div>

        {/* EXPENSE TRANSACTIONS */}
        <div className="mt-6">
          <Transactions
            transactions={dashboardData.recent5Expenses}
            type="expense"
            onMore={() => navigate("/expense")}
          />
        </div>

        {/* INCOME TRANSACTIONS */}
        <div className="mt-6">
          <Transactions
            transactions={dashboardData.recent5Incomes}
            type="income"
            onMore={() => navigate("/income")}
          />
        </div>
      </div>

      {/* ✅ CHATBOT */}
      <ChatBot />
    </Dashboard>
  );
};

export default Home;
