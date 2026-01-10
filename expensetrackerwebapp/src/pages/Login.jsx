import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { validateEmail } from "../util/Validation";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateEmail(email)) {
      setError("Please enter valid email address");
      setIsLoading(false);
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password");
      setIsLoading(false);
      return;
    }

    setError("");

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        setUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <img src={assets.login_bg} alt="bg" className="login-bg" />
      <div className="overlay" />

      {/* WELCOME BACK */}
      <div className="welcome-box">
        <h1 className="welcome-title">WELCOME BACK!</h1>
        <p>Login to continue managing your finances</p>
      </div>

      {/* FORM */}
      <div className="login-right">
        <div className="login-card">
          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <Input
              label="Email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" disabled={isLoading} className="login-btn">
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="login-footer">
            Don’t have an account?
            <Link to="/signup"> Sign Up</Link>
          </p>
        </div>
      </div>

      <style>{`
        /* ================= EXISTING BASE ================= */
        * {
          box-sizing: border-box;
          font-family: Inter, system-ui, sans-serif;
        }

        .login-wrapper {
          position: relative;
          height: 100vh;
          overflow: hidden;
        }

        .login-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: rgba(2,6,23,0.85);
        }

        .welcome-box {
          position: absolute;
          left: 8%;
          top: 50%;
          transform: translateY(-50%);
          max-width: 380px;
          z-index: 2;
        }

        /* ================= ENHANCEMENT ONLY ================= */
        .welcome-title {
          font-size: 46px; /* 🔥 enhanced (bigger, not smaller) */
          font-weight: 900;
          letter-spacing: 1.6px;
          color: #ffffff;
          cursor: pointer;
          position: relative;

          /* layered glow (keeps your old glow + adds depth) */
          text-shadow:
            0 0 12px rgba(34,211,238,0.6),
            0 0 30px rgba(20,184,166,0.45);

          transition: transform 0.35s ease;
        }

        /* extra glow layer on hover */
        .welcome-title::after {
          content: "";
          position: absolute;
          inset: -10px;
          background: radial-gradient(
            circle,
            rgba(34,211,238,0.25),
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: -1;
        }

        .welcome-title:hover {
          transform: translateY(-2px) scale(1.06);
          text-shadow:
            0 0 18px rgba(34,211,238,1),
            0 0 50px rgba(20,184,166,0.9),
            0 0 90px rgba(34,211,238,0.85);
        }

        .welcome-title:hover::after {
          opacity: 1;
        }

        .welcome-box p {
          margin-top: 14px;
          color: #c7d2fe;
          font-size: 16px;
        }

        /* ================= FORM (UNCHANGED) ================= */
        .login-right {
          position: absolute;
          right: 6%;
          top: 50%;
          transform: translateY(-50%);
          z-index: 2;
        }

        .login-card {
          width: 420px;
          background: #ffffff;
          border-radius: 22px;
          padding: 42px;
          box-shadow: 0 30px 70px rgba(0,0,0,0.6);
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        /* ================= LOGIN BUTTON (ENHANCED ONLY) ================= */
        .login-btn {
          margin-top: 12px;
          padding: 14px;
          width: 100%;
          border-radius: 14px;
          border: none;
          font-size: 15px;
          font-weight: 700;
          color: #ffffff;
          cursor: pointer;
          position: relative;
          overflow: hidden;

          background: linear-gradient(
            135deg,
            #020617,
            #0f172a,
            #020617
          );

          box-shadow:
            0 10px 0 #020617,
            0 22px 40px rgba(2,6,23,0.55);

          /* subtle breathing glow (added) */
          animation: btnGlow 3.5s ease-in-out infinite;
        }

        @keyframes btnGlow {
          0%,100% {
            box-shadow:
              0 10px 0 #020617,
              0 22px 40px rgba(34,211,238,0.45);
          }
          50% {
            box-shadow:
              0 10px 0 #020617,
              0 32px 65px rgba(34,211,238,0.75);
          }
        }

        .login-btn:hover {
          transform: translateY(-4px);
        }

        .login-btn:active {
          transform: translateY(6px);
        }

        .login-error {
          background: #fee2e2;
          color: #b91c1c;
          padding: 10px;
          border-radius: 8px;
          font-size: 14px;
          text-align: center;
          margin-bottom: 16px;
        }

        .login-footer {
          margin-top: 20px;
          text-align: center;
          font-size: 14px;
          color: #475569;
        }

        .login-footer a {
          color: #14b8a6;
          font-weight: 700;
          margin-left: 4px;
        }

        @media (max-width: 900px) {
          .welcome-box {
            display: none;
          }
          .login-right {
            right: 50%;
            transform: translate(50%, -50%);
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
