import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import ProfilePhotoSelector from "../components/ProfilePhotoSelector";
import { validateEmail } from "../util/Validation";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import uploadProfileImage from "../util/uploadProfileImage";
import toast from "react-hot-toast";
import bgImage from "../assets/login-bg.jpg";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!fullName.trim()) return setError("Enter full name"), setIsLoading(false);
    if (!validateEmail(email)) return setError("Enter valid email"), setIsLoading(false);
    if (!password.trim()) return setError("Enter password"), setIsLoading(false);

    try {
      let profileImageUrl = "";
      if (profilePhoto) profileImageUrl = await uploadProfileImage(profilePhoto);

      const res = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });

      if (res.status === 201) {
        toast.success("Account created successfully");
        navigate("/login");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <img src={bgImage} className="bg" alt="bg" />
      <div className="overlay" />

      <div className="signup-card">
        {/* LEFT */}
        <div className="left">
          <h2 className="brand">ExpenseTracker</h2>
          <p>
            A smarter way to track income, manage expenses,
            and gain clarity over your finances.
          </p>
        </div>

        {/* RIGHT */}
        <div className="right">
          <h3>Create Account</h3>

          <form onSubmit={handleSubmit}>
            <ProfilePhotoSelector
              image={profilePhoto}
              setImage={setProfilePhoto}
            />

            <div className="row">
              <Input
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
              />
              <Input
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
              />
            </div>

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />

            {error && <div className="error">{error}</div>}

            {/* 🔥 PREMIUM BUTTON */}
            <button
              className="create-btn"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Account"}
            </button>

            <p className="login-link">
              Already have an account?
              <Link to="/login"> Login</Link>
            </p>
          </form>
        </div>
      </div>

      {/* ================= STYLES ================= */}
      <style>{`
        * {
          box-sizing: border-box;
          font-family: Inter, system-ui, sans-serif;
        }

        .signup-page {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #020617;
          position: relative;
        }

        .bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(2,6,23,0.75),
            rgba(2,6,23,0.9)
          );
        }

        .signup-card {
          position: relative;
          z-index: 2;
          width: 920px;
          display: grid;
          grid-template-columns: 1fr 1.25fr;
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow:
            0 40px 90px rgba(0,0,0,0.55),
            inset 0 1px 0 rgba(255,255,255,0.65);
        }

        /* BRAND */
        .brand {
          font-size: 34px;
          font-weight: 900;
          letter-spacing: 0.8px;
          cursor: pointer;
          background: linear-gradient(120deg,#22d3ee,#14b8a6,#22d3ee);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          transition: transform 0.3s ease;
        }

        .brand:hover {
          transform: scale(1.05);
          text-shadow:
            0 0 10px rgba(34,211,238,0.9),
            0 0 30px rgba(20,184,166,0.6);
          animation: glowMove 2.5s ease infinite;
        }

        @keyframes glowMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .left {
          padding: 44px;
          background: linear-gradient(145deg, #020617, #0b1220);
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .left p {
          margin-top: 14px;
          color: #c7d2fe;
          font-size: 15px;
          line-height: 1.6;
        }

        .right {
          padding: 32px 42px;
        }

        .right h3 {
          text-align: center;
          font-size: 23px;
          font-weight: 700;
          color: #020617;
          margin-bottom: 14px;
        }

        .row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        /* 🔥 PREMIUM CREATE BUTTON */
        .create-btn {
          margin-top: 14px;
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
            0 18px 40px rgba(0,0,0,0.45);

          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            filter 0.2s ease;
        }

        /* LIGHT SWEEP */
        .create-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(34,211,238,0.35),
            transparent
          );
          transform: translateX(-120%);
          transition: transform 0.6s ease;
        }

        .create-btn:hover::before {
          transform: translateX(120%);
        }

        .create-btn:hover {
          transform: translateY(-3px);
          filter: brightness(1.2);
          box-shadow:
            0 14px 0 #020617,
            0 26px 60px rgba(34,211,238,0.45);
        }

        .create-btn:active {
          transform: translateY(6px);
          box-shadow:
            0 4px 0 #020617,
            0 10px 25px rgba(34,211,238,0.55);
        }

        .create-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .error {
          background: #fee2e2;
          color: #b91c1c;
          padding: 8px;
          border-radius: 8px;
          font-size: 13px;
          text-align: center;
        }

        .login-link {
          margin-top: 10px;
          text-align: center;
          font-size: 14px;
          color: #475569;
        }

        .login-link a {
          color: #14b8a6;
          font-weight: 600;
          margin-left: 4px;
        }

        @media (max-width: 900px) {
          .signup-card {
            grid-template-columns: 1fr;
            width: 92%;
          }
          .left {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Signup;
