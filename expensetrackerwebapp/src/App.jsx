import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import Category from "./pages/Category";
import Filter from "./pages/Filter";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Footer from "./components/Footer";

const App = () => {
  const location = useLocation();

  // ❌ Hide footer on public/auth pages
  const hideFooter =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <div className="bg-[#0f1117] min-h-screen">
      <Toaster />

      <Routes>
        {/* ✅ Welcome page */}
        <Route path="/" element={<Welcome />} />

        {/* ✅ Auth redirect */}
        <Route path="/root" element={<Root />} />

        {/* ✅ Protected App Pages */}
        <Route path="/dashboard" element={<Home />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/category" element={<Category />} />
        <Route path="/filter" element={<Filter />} />

        {/* ✅ Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      {!hideFooter && <Footer />}
    </div>
  );
};

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};

export default App;
