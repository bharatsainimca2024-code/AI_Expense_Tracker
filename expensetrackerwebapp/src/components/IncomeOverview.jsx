import { useEffect, useState } from "react";
import CustomLineChart from "./CustomLineChart.jsx";
import { prepareIncomeLineChartData } from "../util/ChartUtils.js";

const IncomeOverview = ({ transactions = [] }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setChartData(prepareIncomeLineChartData(transactions));
  }, [transactions]);

  return (
    <div className="income-overview-card">
      <h5 className="income-title">Income Overview</h5>
      <p className="income-subtitle">Visualize income trends over time</p>

      <div className="income-chart">
        <CustomLineChart data={chartData} />
      </div>

      <style>{`
        .income-overview-card {
          background: linear-gradient(145deg, #141232, #0a091e);
          border-radius: 20px;
          padding: 26px;
          margin-bottom: 28px;
          box-shadow:
            inset 0 0 0 1px rgba(255,255,255,0.06),
            0 18px 60px rgba(0,0,0,0.55);
        }

        .income-title {
          font-size: 18px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 4px;
        }

        .income-subtitle {
          font-size: 13px;
          color: #9ca3af;
          margin-bottom: 18px;
        }

        .income-chart {
          background: rgba(255,255,255,0.02);
          border-radius: 14px;
          padding: 10px;
        }
      `}</style>
    </div>
  );
};

export default IncomeOverview;
