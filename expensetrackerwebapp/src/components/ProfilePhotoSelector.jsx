import { useRef, useState, useEffect } from "react";
import { User, ArrowUp, Trash } from "lucide-react";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file?.type.startsWith("image/")) return;
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  useEffect(() => {
    return () => previewUrl && URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />

      <div className="relative group">
        {/* PHOTO */}
        <div className="
          w-24 h-24 rounded-full
          bg-gradient-to-br from-indigo-600 to-blue-600
          flex items-center justify-center
          ring-2 ring-indigo-500
          group-hover:ring-cyan-400
          group-hover:shadow-[0_0_30px_rgba(34,211,238,0.6)]
          transition-all">
          {previewUrl ? (
            <img
              src={previewUrl}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User className="text-white" size={36} />
          )}
        </div>

        {/* UPLOAD */}
        <button
          onClick={() => inputRef.current.click()}
          className="
            absolute -bottom-2 -right-2
            w-9 h-9 rounded-full
            bg-[#161a2b] text-cyan-400
            hover:scale-110 hover:bg-cyan-400 hover:text-black
            shadow-lg transition"
        >
          <ArrowUp size={16} />
        </button>

        {/* REMOVE */}
        {previewUrl && (
          <button
            onClick={() => setPreviewUrl(null)}
            className="
              absolute -bottom-2 -left-2
              w-9 h-9 rounded-full
              bg-red-600 text-white
              hover:scale-110 transition"
          >
            <Trash size={15} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePhotoSelector;
