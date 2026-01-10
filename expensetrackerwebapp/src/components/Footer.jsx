import { Link } from "react-router-dom";
import { useState } from "react";

const Footer = () => {
  const [openModal, setOpenModal] = useState(null);

  return (
    <>
      <footer className="footer-3d">
        <div className="footer-grid">

          {/* BRAND */}
          <div className="footer-card">
            <h2 className="footer-logo">EXPENSE TRACKER</h2>
            <p className="footer-text">
              Track your income, expenses, and savings in one place.
              Smart insights to control your money better.
            </p>
          </div>

          {/* EXPLORE */}
          <div className="footer-card">
            <h3 className="footer-heading">Explore</h3>
            <ul>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/income">Income</Link></li>
              <li><Link to="/expense">Expense</Link></li>
              <li><Link to="/category">Categories</Link></li>
              <li><Link to="/filter">Filter</Link></li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div className="footer-card">
            <h3 className="footer-heading">Support</h3>
            <ul>
              <li className="clickable" onClick={() => setOpenModal("help")}>
                Help Center
              </li>
              <li className="clickable" onClick={() => setOpenModal("how")}>
                How It Works
              </li>
              <li className="clickable" onClick={() => setOpenModal("faq")}>
                FAQs
              </li>
              <li className="clickable" onClick={() => setOpenModal("issue")}>
                Report an Issue
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="footer-card">
            <h3 className="footer-heading">Contact</h3>
            <p className="footer-mail">📧 support@expensetracker.com</p>
            <p className="footer-copy">
              © 2026 Expense Tracker. All rights reserved.
            </p>
          </div>

        </div>

        <div className="footer-bottom">
          Designed with ❤️ for better money management
        </div>
      </footer>

      {/* ================= MODAL ================= */}
      {openModal && (
        <div
          className="footer-modal-overlay"
          onClick={() => setOpenModal(null)}
        >
          <div
            className="footer-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {openModal === "help" && (
              <>
                <h2>Help Center</h2>
                <p>
                  Need help? Email us at <b>support@expensetracker.com</b>.
                </p>
              </>
            )}

            {openModal === "how" && (
              <>
                <h2>How Expense Tracker Works</h2>
                <ul>
                  <li><b>Dashboard:</b> Overview of finances</li>
                  <li><b>Income:</b> Track all earnings</li>
                  <li><b>Expense:</b> Monitor spending</li>
                  <li><b>Categories:</b> Organize data</li>
                  <li><b>Filter:</b> Quick insights</li>
                </ul>
              </>
            )}

            {openModal === "faq" && (
              <>
                <h2>FAQs</h2>
                <ul>
                  <li><b>Is data safe?</b> Yes</li>
                  <li><b>Is it free?</b> 100% free</li>
                  <li><b>Edit/delete?</b> Anytime</li>
                </ul>
              </>
            )}

            {openModal === "issue" && (
              <>
                <h2>Report an Issue</h2>
                <p>
                  Please email details to <b>support@expensetracker.com</b>.
                </p>
              </>
            )}

            <button
              className="modal-close-btn"
              onClick={() => setOpenModal(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ================= CSS ================= */}
      <style>{`
        .footer-3d {
          background: radial-gradient(circle at top, #101633, #050814);
          color: #cbd5f5;
          padding: 70px 70px 30px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 45px;
        }

        .footer-card {
          border-radius: 20px;
          padding: 28px;
          background: linear-gradient(
            145deg,
            rgba(255,255,255,0.06),
            rgba(255,255,255,0.02)
          );
          box-shadow: 0 15px 40px rgba(0,0,0,0.6);
          transition: all 0.35s ease;
        }

        .footer-card:hover {
          transform: translateY(-10px);
          box-shadow:
            0 0 28px rgba(110,168,255,0.45),
            0 22px 60px rgba(0,0,0,0.75);
        }

        /* BRAND */
        .footer-logo {
          font-size: 24px;
          font-weight: 800;
          color: #6ea8ff;
          margin-bottom: 12px;
        }

        .footer-text {
          font-size: 14px;
          line-height: 1.6;
          color: #b8c1ff;
        }

        /* HEADINGS */
        .footer-heading {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 16px;
          color: #ffffff;
        }

        /* LIST ITEMS */
        .footer ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer ul li {
          font-size: 14px;
          margin-bottom: 12px;
          color: #9aa4d6;
          transition: all 0.25s ease;
        }

        .footer ul li a {
          color: inherit;
          text-decoration: none;
        }

        /* EXPLORE HOVER */
        .footer-grid > .footer-card:nth-child(2) ul li:hover,
        .clickable:hover {
          color: #6ea8ff;
          text-shadow: 0 0 12px rgba(110,168,255,0.9);
          transform: translateX(6px);
          cursor: pointer;
        }

        .footer-mail {
          font-size: 14px;
          color: #9aa4d6;
        }

        .footer-copy {
          font-size: 13px;
          margin-top: 10px;
          color: #7c86c4;
        }

        .footer-bottom {
          text-align: center;
          margin-top: 55px;
          font-size: 13px;
          color: #7c86c4;
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 18px;
        }

        /* MODAL */
        .footer-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.65);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999;
        }

        .footer-modal {
          background: linear-gradient(145deg, #0b1020, #050814);
          padding: 32px;
          border-radius: 18px;
          width: 90%;
          max-width: 520px;
          color: #e0e6ff;
        }

        .modal-close-btn {
          margin-top: 22px;
          background: #6ea8ff;
          border: none;
          padding: 10px 22px;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
        }
      `}</style>
    </>
  );
};

export default Footer;
