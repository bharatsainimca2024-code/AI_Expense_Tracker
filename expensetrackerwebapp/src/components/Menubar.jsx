import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import { AppContext } from "../context/AppContext";
import Sidebar from "./Sidebar";
import logo from "../assets/logo.png";

const Menubar = () => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const { user, clearUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  useEffect(() => {
    const close = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <header
      className="
        sticky top-0 z-40
        flex items-center justify-between
        px-6 py-4
        bg-[#0b0f1f]/90 backdrop-blur-2xl
        border-b border-white/10
        shadow-[0_10px_40px_rgba(0,0,0,0.4)]
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-5">
        {/* MENU BUTTON */}
        <button
          onClick={() => setOpenSideMenu(!openSideMenu)}
          className="
            lg:hidden p-2 rounded-xl
            text-teal-300
            hover:bg-teal-500/10
            hover:text-cyan-300
            hover:shadow-[0_0_18px_rgba(34,211,238,0.6)]
            active:scale-95
            transition-all duration-300
          "
        >
          {openSideMenu ? <X /> : <Menu />}
        </button>

        {/* LOGO + NAME */}
        <div className="flex items-center gap-4 group cursor-pointer select-none">
          {/* LOGO */}
          <div
            className="
              relative w-11 h-11 rounded-2xl
              bg-gradient-to-br from-teal-500 via-cyan-400 to-sky-500
              flex items-center justify-center
              shadow-[0_0_25px_rgba(20,184,166,0.45)]
              group-hover:shadow-[0_0_45px_rgba(34,211,238,0.75)]
              group-hover:scale-110
              group-hover:rotate-6
              transition-all duration-500
            "
          >
            <img
              src={logo}
              alt="logo"
              className="w-6 h-6 object-contain drop-shadow-lg"
            />

            {/* glow */}
            <span
              className="
                absolute inset-0 rounded-2xl
                bg-gradient-to-br from-teal-400 to-cyan-400
                opacity-30 blur-xl
                group-hover:opacity-60
                transition-all duration-500
              "
            />
          </div>

          {/* APP NAME */}
          <div className="flex flex-col leading-none">
            <h1
              className="
                text-xl font-extrabold
                bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-400
                bg-clip-text text-transparent
                tracking-wide
                group-hover:tracking-widest
                drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]
                transition-all duration-500
              "
            >
              Expense Tracker
            </h1>

            <span className="text-xs text-slate-400 tracking-wide">
              Smart Money Control
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="relative" ref={dropdownRef}>
        {/* USER BUTTON */}
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="
            w-11 h-11 rounded-full
            flex items-center justify-center
            bg-gradient-to-br from-teal-500 to-cyan-500
            shadow-[0_0_25px_rgba(20,184,166,0.6)]
            hover:shadow-[0_0_40px_rgba(34,211,238,0.9)]
            hover:scale-110
            active:scale-95
            transition-all duration-300
          "
        >
          <User className="text-[#020617]" />
        </button>

        {showDropdown && (
          <div
            className="
              absolute right-0 mt-4 w-56
              rounded-xl bg-[#161a2b]
              border border-white/10
              shadow-[0_0_40px_rgba(34,211,238,0.25)]
              animate-scaleIn
            "
          >
            <div className="px-4 py-3 border-b border-white/10">
              <p className="text-white font-medium truncate">
                {user?.fullName}
              </p>
              <p className="text-xs text-slate-400 truncate">
                {user?.email}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="
                w-full px-4 py-3 flex items-center gap-2
                text-red-400
                hover:bg-red-500/10
                hover:shadow-[inset_0_0_20px_rgba(239,68,68,0.25)]
                transition-all
              "
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>

      {/* MOBILE SIDEBAR */}
      {openSideMenu && (
        <div className="fixed inset-0 bg-black/60 z-50 lg:hidden">
          <div className="fixed left-0 top-[70px]">
            <Sidebar />
          </div>
        </div>
      )}
    </header>
  );
};

export default Menubar;
