import moment from "moment";
import { ArrowRight } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard.jsx";

const Transactions = ({ transactions = [], onMore, type, title }) => {
  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold">{title}</h5>

        <button className="card-btn flex items-center gap-1" onClick={onMore}>
          More
          <ArrowRight className="text-base" size={15} />
        </button>
      </div>

      {/* Transactions List */}
      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item.id}
            title={item.name}
            icon={item.icon}
            date={moment(item.date).format("Do MMM YYYY")}
            amount={item.amount}
            type={type}
            hideDeleteBtn
          />
        ))}

        {transactions?.length === 0 && (
          <p className="text-sm text-gray-400">No transactions found</p>
        )}
      </div>
    </div>
  );
};

export default Transactions;
