import { useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");

    try {
      const res = await axiosConfig.post(API_ENDPOINTS.CHAT, {
        message: userMsg,
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: res.data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Sorry, something went wrong. Try again.",
        },
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* FLOATING BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="
          w-14 h-14 rounded-full
          bg-gradient-to-br from-teal-500 to-cyan-500
          text-[#020617] text-2xl
          shadow-[0_0_25px_rgba(20,184,166,0.8),0_0_55px_rgba(34,211,238,0.7)]
          scale-105
          transition-all duration-300
          animate-robotGlow
        "
      >
        🤖
      </button>

      {/* CHAT WINDOW */}
      {open && (
        <div className="mt-4 w-96 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(34,211,238,0.35)] animate-chatOpen">
          {/* HEADER */}
          <div
            className="
              bg-gradient-to-r from-teal-500 to-cyan-500
              px-4 py-3
              text-[#020617] font-bold tracking-wide
              shadow-[0_4px_20px_rgba(34,211,238,0.6)]
            "
          >
            🤖 AI Expense Assistant
          </div>

          {/* MESSAGES */}
          <div className="h-64 bg-[#0b1020] p-3 space-y-3 overflow-y-auto">
            {messages.length === 0 && (
              <p className="text-sm text-slate-400 text-center">
                Ask about income, expenses or balance
              </p>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[80%] px-3 py-2 rounded-xl text-sm shadow-md ${
                  m.role === "user"
                    ? "ml-auto bg-gradient-to-r from-teal-500 to-cyan-500 text-[#020617] shadow-[0_0_20px_rgba(20,184,166,0.6)]"
                    : "mr-auto bg-[#020617] text-slate-200 border border-teal-500/20 shadow-[0_0_20px_rgba(34,211,238,0.25)]"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          {/* INPUT */}
          <div className="bg-[#0f172a] p-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              className="
                flex-1 px-3 py-2 rounded-lg
                bg-[#020617] text-white
                placeholder-slate-400
                outline-none
                border border-teal-500/30
                focus:border-cyan-400
                focus:shadow-[0_0_15px_rgba(34,211,238,0.6)]
                transition
              "
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button
              onClick={sendMessage}
              className="
                px-4 rounded-lg
                bg-gradient-to-br from-teal-500 to-cyan-500
                text-[#020617] font-bold
                shadow-[0_0_20px_rgba(20,184,166,0.7)]
                hover:shadow-[0_0_35px_rgba(34,211,238,0.9)]
                active:scale-95
                transition
              "
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* ANIMATIONS */}
      <style>{`
        /* permanent glow pulse */
        @keyframes robotGlow {
          0%, 100% {
            box-shadow:
              0 0 25px rgba(20,184,166,0.8),
              0 0 55px rgba(34,211,238,0.6);
          }
          50% {
            box-shadow:
              0 0 40px rgba(20,184,166,1),
              0 0 90px rgba(34,211,238,0.9);
          }
        }

        .animate-robotGlow {
          animation: robotGlow 3s ease-in-out infinite;
        }

        @keyframes chatOpen {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-chatOpen {
          animation: chatOpen 0.25s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ChatBot;
