import { useState } from "react";
import { Search } from "lucide-react";
import Dashboard from "../components/Dashboard.jsx";
import { useUser } from "../hooks/useUser.jsx";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import { toast } from "react-hot-toast";
import TransactionInfoCard from "../components/TransactionInfoCard.jsx";
import moment from "moment";

const Filter = () => {
  useUser();

  const [type, setType] = useState("expense");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosConfig.post(
        API_ENDPOINTS.APPLY_FILTERS,
        {
          type,
          startDate,
          endDate,
          keyword,
          sortField,
          sortOrder,
        }
      );
      setTransactions(res.data || []);
    } catch (error) {
      toast.error("Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dashboard activeMenu="Filter">
      <div className="my-6 mx-auto px-2">

        {/* PAGE HEADER */}
        <div className="expense-header mb-6">
          <h2 className="text-3xl font-semibold text-white">
            Filter Transactions
          </h2>
        </div>

        {/* FILTER CARD */}
        <div className="glass-card mb-6">
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4"
          >
            <div>
              <label className="label">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="input"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <div>
              <label className="label">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="input"
              />
            </div>

            <div>
              <label className="label">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="input"
              />
            </div>

            <div>
              <label className="label">Sort By</label>
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
                className="input"
              >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
              </select>
            </div>

            <div>
              <label className="label">Order</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="input"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            <div className="flex items-end gap-2">
              <div className="w-full">
                <label className="label">Search</label>
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Search..."
                  className="input"
                />
              </div>

              <button type="submit" className="btn-3d">
                <Search size={20} />
              </button>
            </div>
          </form>
        </div>

        {/* RESULT CARD */}
        <div className="glass-card">
          <h3 className="text-xl font-semibold text-white mb-4">
            Results
          </h3>

          {loading && (
            <p className="text-gray-400">Loading...</p>
          )}

          {!loading && transactions.length === 0 && (
            <p className="text-gray-500">
              Apply filters to see transactions
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {transactions.map((tx) => (
              <TransactionInfoCard
                key={tx.id}
                title={tx.name}
                icon={tx.icon}
                date={moment(tx.date).format("DD MMM YYYY")}
                amount={tx.amount}
                type={type}
                hideDelete
              />
            ))}
          </div>
        </div>

        {/* ===== STYLES ===== */}
        <style>{`
          .expense-header {
            background: linear-gradient(
              135deg,
              #0b1020,
              #1b1f3b
            );
            border-radius: 18px;
            padding: 20px 24px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.6);
          }

          .glass-card {
            background: linear-gradient(
              145deg,
              #0b1020,
              #1b1f3b
            );
            border-radius: 22px;
            padding: 22px;
            box-shadow:
              0 30px 80px rgba(0,0,0,0.75),
              inset 0 1px 0 rgba(255,255,255,0.08);
            transition: all 0.35s ease;
          }

          .glass-card:hover {
            transform: translateY(-4px);
            box-shadow:
              0 40px 90px rgba(0,0,0,0.85);
          }

          .label {
            font-size: 0.85rem;
            font-weight: 500;
            color: #c7d2fe;
            margin-bottom: 6px;
            display: block;
          }

          .input {
            width: 100%;
            background: rgba(255,255,255,0.08);
            border: 1px solid rgba(99,102,241,0.35);
            border-radius: 12px;
            padding: 10px 12px;
            color: #fff;
            outline: none;
            transition: all 0.25s ease;
          }

          .input:focus {
            border-color: #7c5cff;
            box-shadow: 0 0 0 2px rgba(124,92,255,0.35);
            background: rgba(255,255,255,0.12);
          }

          .btn-3d {
            height: 44px;
            width: 50px;
            background: linear-gradient(
              145deg,
              #7c5cff,
              #5b3df5
            );
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            box-shadow:
              0 8px 0 #3b2cb5,
              0 18px 35px rgba(0,0,0,0.6);
            transition: all 0.15s ease;
          }

          .btn-3d:hover {
            transform: translateY(-2px);
          }

          .btn-3d:active {
            transform: translateY(6px);
            box-shadow:
              0 2px 0 #3b2cb5,
              0 6px 15px rgba(0,0,0,0.5);
          }
        `}</style>

      </div>
    </Dashboard>
  );
};

export default Filter;
