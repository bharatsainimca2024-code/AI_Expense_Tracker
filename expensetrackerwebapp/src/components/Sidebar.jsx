import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { User } from "lucide-react";
import { SIDE_BAR_DATA } from "../assets/assets.js";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside
      className="
        w-64 h-[calc(100vh-70px)]
        bg-[#12162a]
        border-r border-white/5
        p-6 sticky top-[70px]
      "
    >
      {/* USER */}
      <div className="flex flex-col items-center gap-3 mb-8">
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            className="
              w-20 h-20 rounded-full object-cover
              ring-2 ring-teal-500/70
              shadow-[0_0_25px_rgba(20,184,166,0.6)]
              transition-all duration-300
              hover:ring-cyan-400
              hover:shadow-[0_0_40px_rgba(34,211,238,0.8)]
            "
          />
        ) : (
          <User className="w-20 h-20 text-slate-400" />
        )}

        <p className="text-white font-medium">
          {user?.fullName}
        </p>
      </div>

      {/* MENU */}
      {SIDE_BAR_DATA.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`
              group relative
              w-full flex items-center gap-4
              px-6 py-3 mb-2 rounded-xl
              font-medium
              transition-all duration-300
              ${
                isActive
                  ? `
                    bg-teal-500/15 text-cyan-300
                    shadow-[0_0_35px_rgba(34,211,238,0.6)]
                  `
                  : `
                    text-slate-300
                    hover:bg-teal-500/10
                    hover:text-cyan-300
                    hover:translate-x-1
                    hover:shadow-[0_0_25px_rgba(20,184,166,0.5)]
                  `
              }
            `}
          >
            {/* glow layer */}
            <span
              className="
                pointer-events-none
                absolute inset-0 rounded-xl
                bg-gradient-to-r from-teal-400 to-cyan-400
                opacity-0 blur-xl
                group-hover:opacity-30
                transition-all duration-300
              "
            />

            {/* icon */}
            <item.icon
              className={`
                relative z-10
                transition-all duration-300
                ${
                  isActive
                    ? "text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                    : "text-slate-400 group-hover:text-cyan-300"
                }
              `}
            />

            {/* label */}
            <span className="relative z-10">
              {item.label}
            </span>
          </button>
        );
      })}
    </aside>
  );
};

export default Sidebar;
