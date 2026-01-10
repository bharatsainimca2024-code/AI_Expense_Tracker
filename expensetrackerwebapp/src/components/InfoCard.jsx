const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-6 bg-white p-6 rounded-2xl shadow-md border border-gray-200 items-center">
      
      {/* Icon */}
      <div
        className="w-12 h-12 flex items-center justify-center rounded-full text-white"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <p className="text-sm text-gray-500">{label}</p>
        <h3 className="text-xl font-semibold text-gray-800">{value}</h3>
      </div>

    </div>
  );
};

export default InfoCard;
