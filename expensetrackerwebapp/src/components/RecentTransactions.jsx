import moment from "moment";
import TransactionInfoCard from "./TransactionInfoCard.jsx";

const RecentTransactions = ({ transactions = [], onMore }) => {
  return (
    <div className="recent-card">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-white">
          Recent Transactions
        </h4>

        <button onClick={onMore} className="view-btn">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {transactions.slice(0, 5).map((item) => (
          <div key={item.id} className="animate-slide">
            <TransactionInfoCard
              title={item.name}
              icon={item.icon}
              date={moment(item.date).format("Do MMM YYYY")}
              amount={item.amount}
              type={item.type}
              hideDeleteBtn
            />
          </div>
        ))}

        {transactions.length === 0 && (
          <p className="text-sm text-gray-400">No recent transactions</p>
        )}
      </div>

      <style>{`
        .recent-card {
          background: linear-gradient(145deg, #0b1020, #141a33);
          border-radius: 24px;
          padding: 22px;
          box-shadow:
            0 30px 70px rgba(0,0,0,.8),
            inset 0 1px 0 rgba(255,255,255,.06);
        }

        .view-btn {
          padding: 8px 16px;
          border-radius: 999px;
          background: linear-gradient(145deg, #7c5cff, #5a3df5);
          color: #fff;
          font-size: 14px;
          box-shadow:
            0 6px 0 #3b2bbd,
            0 12px 25px rgba(0,0,0,.6);
          transition: all .25s ease;
        }

        .view-btn:hover {
          transform: translateY(-3px);
          box-shadow:
            0 3px 0 #3b2bbd,
            0 18px 40px rgba(0,0,0,.8);
        }

        .view-btn:active {
          transform: translateY(2px);
          box-shadow: 0 1px 0 #3b2bbd;
        }

        .animate-slide {
          animation: slideUp .45s ease both;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default RecentTransactions;
