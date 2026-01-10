import { Pencil, Layers2 } from "lucide-react";

const CategoryList = ({ categories, onEditCategory }) => {
  return (
    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">

      <h4 className="text-xl font-semibold text-white mb-6">
        Category Sources
      </h4>

      {categories.length === 0 ? (
        <p className="text-gray-300 text-sm">
          No categories yet. Create one ✨
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="
              group relative p-6 rounded-2xl
              bg-gradient-to-br from-[#1e1b4b] to-[#020617]
              border border-white/10
              hover:-translate-y-2
              hover:shadow-[0_25px_80px_rgba(139,92,246,0.45)]
              transition-all duration-300"
            >
              {/* Glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
              bg-gradient-to-br from-purple-500/20 to-cyan-500/10 blur-xl transition" />

              <div className="relative flex items-center gap-4">
                <div className="
                w-14 h-14 rounded-xl flex items-center justify-center
                bg-gradient-to-br from-purple-600 to-indigo-600
                shadow-lg">
                  {category.icon ? (
                    <img src={category.icon} className="w-7 h-7" />
                  ) : (
                    <Layers2 className="text-white" size={26} />
                  )}
                </div>

                <div className="flex-1">
                  <p className="text-white font-semibold">
                    {category.name}
                  </p>
                  <p className="text-sm text-gray-400 capitalize">
                    {category.type}
                  </p>
                </div>

                <button
                  onClick={() => onEditCategory(category)}
                  className="
                  p-3 rounded-xl bg-white/10 text-cyan-300
                  hover:bg-cyan-400 hover:text-black
                  hover:scale-110 transition-all"
                >
                  <Pencil size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
