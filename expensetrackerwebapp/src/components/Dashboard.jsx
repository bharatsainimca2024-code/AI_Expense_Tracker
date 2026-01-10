import Menubar from "./Menubar.jsx";
import Sidebar from "./Sidebar.jsx";
import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";

const Dashboard = ({ children, activeMenu }) => {
  const { user } = useContext(AppContext);

  return (
    <div className="bg-[#0f1117] text-slate-200">
      <Menubar activeMenu={activeMenu} />

      <div className="flex">
        {/* Sidebar */}
        <div className="max-[1080px]:hidden">
          <Sidebar activeMenu={activeMenu} />
        </div>

        {/* Main content */}
        <div className="grow px-6 py-6 animate-fadeIn">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
