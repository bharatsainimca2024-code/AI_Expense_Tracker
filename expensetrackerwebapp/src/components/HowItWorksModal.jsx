const HowItWorksModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="how-overlay">
      <div className="how-modal">
        <h2>How Expense Tracker Works</h2>

        <ul>
          <li><b>Dashboard:</b> View total balance, income, expenses & charts.</li>
          <li><b>Add Income:</b> Record salary, freelancing, or other income.</li>
          <li><b>Add Expense:</b> Track daily spending and bills.</li>
          <li><b>Categories:</b> Organize income & expenses efficiently.</li>
          <li><b>Filter:</b> Filter transactions by date & category.</li>
        </ul>

        <button onClick={onClose}>Got it 👍</button>
      </div>

      <style>{`
        .how-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .how-modal {
          background: linear-gradient(145deg, #0b1020, #050814);
          color: #e0e6ff;
          padding: 30px;
          border-radius: 18px;
          width: 90%;
          max-width: 500px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          animation: scaleIn 0.3s ease;
        }

        .how-modal h2 {
          margin-bottom: 16px;
          color: #6ea8ff;
        }

        .how-modal ul {
          list-style: none;
          padding: 0;
        }

        .how-modal li {
          margin-bottom: 12px;
          font-size: 14px;
          line-height: 1.6;
        }

        .how-modal button {
          margin-top: 20px;
          background: #6ea8ff;
          border: none;
          padding: 10px 18px;
          border-radius: 10px;
          color: #000;
          cursor: pointer;
          font-weight: 600;
        }

        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default HowItWorksModal;
