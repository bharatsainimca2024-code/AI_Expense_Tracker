import {
  UtensilsCrossed,
  Trash2,
  TrendingUp,
  TrendingDown
} from "lucide-react";

import { addThousandsSeparator } from "../util/Validation";

const TransactionInfoCard = ({
  icon,
  title,
  date,
  amount,
  type,
  hideDeleteBtn = false,
  onDelete
}) => {
  const isIncome = type === "income";

  return (
    <div className="txn-card group">
      <div className="txn-icon">
        {icon ? (
          <img src={icon} alt={title} />
        ) : (
          <UtensilsCrossed size={20} />
        )}
      </div>

      <div className="txn-info">
        <p className="txn-title">{title}</p>
        <p className="txn-date">{date}</p>
      </div>

      {!hideDeleteBtn && (
        <button className="txn-delete" onClick={onDelete}>
          <Trash2 size={16} />
        </button>
      )}

      <div className={`txn-amount ${isIncome ? "income" : "expense"}`}>
        <span>
          {isIncome ? "+" : "-"}₹{addThousandsSeparator(amount)}
        </span>
        {isIncome ? <TrendingUp size={15} /> : <TrendingDown size={15} />}
      </div>

      <style>{`
        .txn-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px;
          border-radius: 16px;
          background: linear-gradient(145deg, #141232, #0a091e);
          box-shadow:
            inset 0 0 0 1px rgba(255,255,255,0.05),
            0 10px 30px rgba(0,0,0,0.45);
          transition: all .25s ease;
        }

        .txn-card:hover {
          transform: translateY(-2px);
          box-shadow:
            inset 0 0 0 1px rgba(255,255,255,0.08),
            0 18px 45px rgba(0,0,0,0.6);
        }

        .txn-icon {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          background: linear-gradient(135deg, #7c3aed, #9333ea);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .txn-icon img {
          width: 22px;
          height: 22px;
        }

        .txn-info {
          flex: 1;
        }

        .txn-title {
          font-size: 14px;
          font-weight: 600;
          color: white;
        }

        .txn-date {
          font-size: 12px;
          color: #9ca3af;
          margin-top: 2px;
        }

        .txn-delete {
          background: none;
          border: none;
          color: #9ca3af;
          cursor: pointer;
          opacity: 0;
          transition: all .2s ease;
        }

        .group:hover .txn-delete {
          opacity: 1;
        }

        .txn-delete:hover {
          color: #ef4444;
        }

        .txn-amount {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
        }

        .txn-amount.income {
          background: rgba(34,197,94,0.15);
          color: #22c55e;
        }

        .txn-amount.expense {
          background: rgba(239,68,68,0.15);
          color: #ef4444;
        }
      `}</style>
    </div>
  );
};

export default TransactionInfoCard;
