import CustomPieChart from "./CustomPieChart.jsx";

const FinanceOverview = ({
  totalBalance = 0,
  totalIncome = 0,
  totalExpense = 0,
}) => {
  const balanceData = [
    { name: "Balance", amount: totalBalance },
    { name: "Expense", amount: totalExpense },
    { name: "Income", amount: totalIncome },
  ];

  const COLORS = ["#7c5cff", "#ef4444", "#22c55e"];

  return (
    <div className="finance-card">
      <h5 className="text-lg font-semibold text-white mb-4">
        Financial Overview
      </h5>

      <CustomPieChart data={balanceData} colors={COLORS} />

      <style>{`
        .finance-card {
          background: linear-gradient(145deg, #0b1020, #1a1f3c);
          border-radius: 24px;
          padding: 24px;
          box-shadow:
            0 35px 80px rgba(0,0,0,0.85),
            inset 0 1px 0 rgba(255,255,255,0.08);
          transition: transform .4s ease, box-shadow .4s ease;
          position: relative;
        }

        .finance-card::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 24px;
          background: radial-gradient(circle at top,
            rgba(124,92,255,.18),
            transparent 65%);
          opacity: 0;
          transition: opacity .4s ease;
        }

        .finance-card:hover {
          transform: translateY(-6px) scale(1.01);
          box-shadow: 0 45px 90px rgba(0,0,0,0.9);
        }

        .finance-card:hover::after {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default FinanceOverview;
