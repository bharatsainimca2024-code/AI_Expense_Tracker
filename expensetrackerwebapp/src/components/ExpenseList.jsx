import { Download, Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard.jsx";

const ExpenseList = ({
  transactions = [],
  onDelete,
  onDownload,
  onEmail,
}) => {
  return (
    <div className="list-card">
      <div className="list-header">
        <h5>Expense Sources</h5>

        <div className="actions">
          <button onClick={onEmail}>
            <Mail size={15} /> Email
          </button>

          <button onClick={onDownload}>
            <Download size={15} /> Download
          </button>
        </div>
      </div>

      <div className="grid">
        {transactions.map((expense) => (
          <TransactionInfoCard
            key={expense.id}
            title={expense.name}
            icon={expense.icon}
            amount={expense.amount}
            date={expense.date}
            type="expense"
            onDelete={() => onDelete(expense)}
          />
        ))}
      </div>

      {/* 🔥 YOUR STYLING — UNCHANGED 🔥 */}
      <style>{`
        .list-card {
          background: linear-gradient(145deg, #1e1b4b, #0f172a);
          border-radius: 18px;
          padding: 22px;
          margin-top: 24px;
          box-shadow:
            inset 0 0 0 1px rgba(255,255,255,0.05),
            0 15px 45px rgba(0,0,0,0.45);
        }

        .list-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .list-header h5 {
          color: white;
          font-weight: 600;
        }

        .actions button {
          background: rgba(139,92,246,0.18);
          border-radius: 12px;
          padding: 8px 14px;
          border: none;
          color: #ddd6fe;
          cursor: pointer;
          margin-left: 8px;
          transition: all 0.2s ease;
        }

        .actions button:hover {
          transform: translateY(-1px);
          background: rgba(139,92,246,0.3);
        }
      `}</style>
    </div>
  );
};

export default ExpenseList;
