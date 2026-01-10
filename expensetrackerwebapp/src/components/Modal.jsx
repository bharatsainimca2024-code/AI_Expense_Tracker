const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="
    fixed inset-0 z-50 flex items-center justify-center
    bg-black/70 backdrop-blur-sm animate-fadeIn">

      <div className="
      bg-gradient-to-br from-[#1e1b4b] to-[#020617]
      border border-white/10
      rounded-3xl shadow-[0_40px_120px_rgba(0,0,0,0.8)]
      w-full max-w-xl mx-4 scale-95 animate-scaleIn">

        <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
          <h3 className="text-lg font-semibold text-white">
            {title}
          </h3>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-red-500 text-white transition"
          >
            ✕
          </button>
        </div>

        <div className="p-6 text-white">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
