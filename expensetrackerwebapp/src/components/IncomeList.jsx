import { Download, Mail, LoaderCircle } from "lucide-react";
import { useState } from "react";
import TransactionInfoCard from "./TransactionInfoCard.jsx";

const IncomeList = ({ transactions = [], onDelete, onDownload, onEmail }) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    await onDownload();
    setLoading(false);
  };

  const handleEmail = async () => {
    setLoading(true);
    await onEmail();
    setLoading(false);
  };

  return (
    <div className="income-card">
      <div className="income-card-header">
        <h5>Income Sources</h5>

        <div className="income-actions">
          <button onClick={handleEmail} disabled={loading}>
            {loading ? <LoaderCircle className="spin" /> : <Mail size={15} />}
            Email
          </button>

          <button onClick={handleDownload} disabled={loading}>
            {loading ? <LoaderCircle className="spin" /> : <Download size={15} />}
            Download
          </button>
        </div>
      </div>

      <div className="income-grid">
        {transactions.length === 0 && (
          <p className="empty-text">No income records found</p>
        )}

        {transactions.map((income) => (
          <TransactionInfoCard
            key={income.id}
            title={income.name}
            icon={income.icon}
            amount={income.amount}
            date={income.date}
            type="income"
            onDelete={() => onDelete(income)}
          />
        ))}
      </div>

      <style>{`
        .income-card {
          background: linear-gradient(145deg, #141232, #0a091e);
          border-radius: 18px;
          padding: 22px;
          margin-top: 24px;
          box-shadow:
            inset 0 0 0 1px rgba(255,255,255,0.05),
            0 15px 45px rgba(0,0,0,0.45);
          transition: all .25s ease;
        }

        .income-card:hover {
          transform: translateY(-3px);
          box-shadow:
            inset 0 0 0 1px rgba(255,255,255,0.08),
            0 25px 65px rgba(0,0,0,0.6);
        }

        .income-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .income-card-header h5 {
          color: white;
          font-size: 18px;
          font-weight: 600;
        }

        .income-actions {
          display: flex;
          gap: 10px;
        }

        .income-actions button {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 9px 14px;
          border-radius: 12px;
          background: rgba(124,58,237,0.12);
          color: #c4b5fd;
          border: none;
          cursor: pointer;
          transition: all .25s ease;
        }

        .income-actions button:hover {
          background: rgba(124,58,237,0.22);
          color: white;
          transform: translateY(-1px);
        }

        .income-actions button:disabled {
          opacity: .6;
          cursor: not-allowed;
        }

        .income-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
        }

        .empty-text {
          color: #9ca3af;
          font-size: 14px;
        }

        .spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default IncomeList;
