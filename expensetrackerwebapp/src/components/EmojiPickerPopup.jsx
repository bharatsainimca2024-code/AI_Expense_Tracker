import { useState } from "react";
import { Image, X } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmojiClick = (emoji) => {
    onSelect(emoji?.imageUrl || "");
    setIsOpen(false);
  };

  return (
    <div className="relative flex items-center gap-4 mb-6">
      {/* PICK ICON BUTTON */}
      <div
        onClick={() => setIsOpen(true)}
        className="
          group cursor-pointer
          flex items-center gap-4
          px-5 py-4 rounded-2xl
          bg-gradient-to-r from-sky-50 via-indigo-50 to-purple-50
          hover:shadow-lg hover:scale-[1.02]
          transition-all duration-300
        "
      >
        {/* ICON PREVIEW */}
        <div
          className="
            relative w-11 h-11
            flex items-center justify-center
            rounded-xl bg-white
            shadow-md
            group-hover:scale-110
            transition-all duration-300
          "
        >
          {/* SOFT GLOW */}
          <span
            className="
              absolute inset-0 rounded-xl
              bg-gradient-to-br from-indigo-300 to-cyan-300
              blur-md opacity-30
            "
          />

          {icon ? (
            <img src={icon} className="w-6 h-6 relative z-10" />
          ) : (
            <Image className="relative z-10 text-indigo-500" size={20} />
          )}
        </div>

        <p className="text-sm font-medium text-gray-600 group-hover:text-indigo-600 transition">
          {icon ? "Change Icon" : "Pick Icon"}
        </p>
      </div>

      {/* EMOJI PICKER POPUP */}
      {isOpen && (
        <div
          className="
            absolute top-full left-0 mt-3
            z-50
            bg-white rounded-2xl
            shadow-2xl
            animate-scaleIn
          "
        >
          {/* HEADER WITH CLOSE BUTTON */}
          <div
            className="
              flex items-center justify-between
              px-4 py-2
              border-b border-gray-200
            "
          >
            <p className="text-sm font-medium text-gray-700">
              Select Emoji
            </p>

            <button
              onClick={() => setIsOpen(false)}
              className="
                w-7 h-7 flex items-center justify-center
                rounded-full
                bg-gray-100 text-gray-600
                hover:bg-rose-500 hover:text-white
                transition-all duration-200
              "
            >
              <X size={14} />
            </button>
          </div>

          {/* EMOJI PICKER (SCALED DOWN) */}
          <div className="emoji-wrapper">
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              lazyLoadEmojis
              height={320}
              width={300}
            />
          </div>
        </div>
      )}

      {/* LOCAL STYLES */}
      <style>{`
        .emoji-wrapper {
          transform: scale(0.9);
          transform-origin: top left;
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-5px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default EmojiPickerPopup;
