import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import welcomeVideo from "../assets/welcome.mp4";
import logo from "../assets/logo.png";

const Welcome = () => {
  return (
    <>
      <div className="root">
        {/* BACKGROUND VIDEO */}
        <video
          className="video-bg"
          src={welcomeVideo}
          autoPlay
          loop
          muted
          playsInline
        />

        <div className="overlay" />

        {/* NAVBAR */}
        <nav className="nav">
          <div className="brand">
            <img src={logo} alt="ExpenseTracker Logo" />
            <span className="brand-text">ExpenseTracker</span>
          </div>

          <div className="nav-actions">
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-cta">Sign Up</Link>
          </div>
        </nav>

        {/* HERO */}
        <section className="hero">
          <h1 className="hero-title">
            Control Your <br />
            <span>Money Smarter</span>
          </h1>

          <p className="hero-tagline">
            Track every expense, understand your spending habits,
            and build smarter financial decisions with confidence.
          </p>

          <div className="cta">
            <Link to="/signup" className="btn expense-btn">
              Get Started
              <ArrowRight size={20} />
            </Link>

            <Link to="/login" className="btn outline expense-outline">
              Login
            </Link>
          </div>
        </section>

        {/* GLOWS */}
        <div className="orb teal" />
        <div className="orb cyan" />
      </div>

      {/* ================= STYLES ================= */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Inter", sans-serif;
        }

        body {
          background: #020617;
        }

        .root {
          position: relative;
          height: 100vh;
          overflow: hidden;
        }

        /* VIDEO */
        .video-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.6);
          z-index: 0;
        }

        /* OVERLAY */
        .overlay {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 20% 20%, rgba(20,184,166,0.25), transparent 40%),
            radial-gradient(circle at 80% 80%, rgba(34,211,238,0.25), transparent 40%),
            linear-gradient(to right, rgba(2,6,23,0.95), rgba(2,6,23,0.8));
          z-index: 1;
        }

        /* NAV */
        .nav {
          position: relative;
          z-index: 10;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 22px 70px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 14px;
          cursor: pointer;
        }

        .brand img {
          height: 42px;
        }

        .brand-text {
          font-size: 1.9rem;
          font-weight: 900;
          color: #14b8a6;
          transition: all 0.4s ease;
        }

        .brand:hover .brand-text {
          color: #22d3ee;
          text-shadow:
            0 0 12px rgba(20,184,166,0.9),
            0 0 36px rgba(34,211,238,0.8);
        }

        .nav-actions {
          display: flex;
          gap: 26px;
          align-items: center;
        }

        .nav-link {
          color: #e5e7eb;
          text-decoration: none;
          font-weight: 600;
        }

        .nav-link:hover {
          color: #14b8a6;
          text-shadow: 0 0 10px rgba(20,184,166,0.8);
        }

        .nav-cta {
          padding: 10px 22px;
          border-radius: 14px;
          background: linear-gradient(145deg, #14b8a6, #22d3ee);
          color: #020617;
          font-weight: 800;
          text-decoration: none;
          transition: all 0.35s ease;
        }

        .nav-cta:hover {
          transform: translateY(-3px);
          box-shadow:
            0 0 18px rgba(34,211,238,0.9),
            0 0 45px rgba(20,184,166,0.7);
        }

        /* HERO */
        .hero {
          position: relative;
          z-index: 10;
          max-width: 720px;
          padding-left: 90px;
          margin-top: 140px;
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 900;
          line-height: 1.1;
          color: white;
          transition: all 0.5s ease;
        }

        .hero-title span {
          background: linear-gradient(90deg, #14b8a6, #22d3ee);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-title:hover {
          transform: translateY(-6px);
          text-shadow:
            0 0 20px rgba(20,184,166,0.9),
            0 0 50px rgba(34,211,238,0.8);
        }

        .hero-tagline {
          margin-top: 26px;
          font-size: 1.2rem;
          line-height: 1.7;
          color: #d1d5db;
        }

        /* BUTTONS */
        .cta {
          margin-top: 52px;
          display: flex;
          gap: 28px;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 20px 46px;
          border-radius: 22px;
          font-weight: 800;
          text-decoration: none;
          transition: all 0.35s ease;
        }

        .expense-btn {
          background: linear-gradient(145deg, #14b8a6, #0ea5e9);
          color: #020617;
          box-shadow:
            0 20px 50px rgba(20,184,166,0.45),
            inset 0 -5px 0 rgba(0,0,0,0.35);
        }

        .expense-btn:hover {
          background: linear-gradient(145deg, #22d3ee, #14b8a6);
          transform: translateY(-8px) scale(1.05);
          box-shadow:
            0 0 25px rgba(34,211,238,0.9),
            0 0 60px rgba(20,184,166,0.7);
        }

        .expense-outline {
          border: 2px solid rgba(20,184,166,0.7);
          color: #14b8a6;
        }

        .expense-outline:hover {
          background: rgba(20,184,166,0.12);
          color: #22d3ee;
          box-shadow: 0 0 18px rgba(34,211,238,0.6);
        }

        /* GLOWS */
        .orb {
          position: absolute;
          width: 520px;
          height: 520px;
          border-radius: 50%;
          filter: blur(160px);
          opacity: 0.45;
          z-index: 2;
        }

        .orb.teal {
          background: #14b8a6;
          top: 10%;
          left: -220px;
        }

        .orb.cyan {
          background: #22d3ee;
          bottom: -220px;
          right: -220px;
        }

        @media (max-width: 900px) {
          .hero {
            padding-left: 32px;
            margin-top: 100px;
          }

          .hero-title {
            font-size: 2.8rem;
          }
        }
      `}</style>
    </>
  );
};

export default Welcome;
