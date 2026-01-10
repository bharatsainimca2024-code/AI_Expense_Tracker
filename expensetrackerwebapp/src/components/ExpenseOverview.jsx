import { useEffect, useState } from "react";
import CustomExpenseLineChart from "./CustomExpenseLineChart.jsx";
import { prepareIncomeLineChartData } from "../util/ChartUtils.js";

const ExpenseOverview = ({ transactions = [] }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setChartData(prepareIncomeLineChartData(transactions));
  }, [transactions]);

  return (
    <div className="overview-card">
      <h5 className="overview-title">Expense Overview</h5>
      <p className="overview-subtitle">
        Visualize expense trends over time
      </p>

      <div className="overview-chart">
        <CustomExpenseLineChart data={chartData} />
      </div>

      <style>{`
        .overview-card {
          background: linear-gradient(145deg, #1e1b4b, #0f172a);
          border-radius: 20px;
          padding: 26px;
          margin-bottom: 28px;
          box-shadow:
            inset 0 0 0 1px rgba(255,255,255,0.06),
            0 18px 60px rgba(0,0,0,0.55);
          transition: all 0.25s ease;
        }

        .overview-card:hover {
          transform: translateY(-2px);
          box-shadow:
            inset 0 0 0 1px rgba(255,255,255,0.08),
            0 28px 75px rgba(0,0,0,0.65);
        }

        .overview-title {
          font-size: 18px;
          font-weight: 600;
          color: #ffffff;
        }

        .overview-subtitle {
          font-size: 13px;
          color: #9ca3af;
          margin-bottom: 18px;
        }

        .overview-chart {
          background: rgba(255,255,255,0.03);
          border-radius: 14px;
          padding: 12px;
        }
      `}</style>
    </div>
  );
};

export default ExpenseOverview;
