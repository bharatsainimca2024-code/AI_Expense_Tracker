/*import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  isSelect = false,
  options = []
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-4">
      <label className="text-[13px] text-slate-800 block mb-1">
        {label}
      </label>

      <div className="relative">
        {isSelect ? (
          <select
            className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 text-gray-700"
            value={value}
            onChange={onChange}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 pr-10 text-gray-700"
            type={
              type === "password"
                ? showPassword
                  ? "text"
                  : "password"
                : type
            }
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        )}

        {type === "password" && !isSelect && (
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <Eye size={18} className="text-primary" />
            ) : (
              <EyeOff size={18} className="text-slate-400" />
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;*/

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  isSelect = false,
  options = []
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-4">
      <label className="text-[13px] text-slate-800 block mb-1">
        {label}
      </label>

      <div className="relative">
        {isSelect ? (
          <select
            className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 text-gray-700"
            value={value}
            onChange={onChange}
          >
            <option value="" disabled>
              Select category
            </option>

            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 pr-10 text-gray-700"
            type={
              type === "password"
                ? showPassword
                  ? "text"
                  : "password"
                : type
            }
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        )}

        {type === "password" && !isSelect && (
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <Eye size={18} className="text-primary" />
            ) : (
              <EyeOff size={18} className="text-slate-400" />
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;

