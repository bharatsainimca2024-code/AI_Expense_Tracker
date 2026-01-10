import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomPieChart = ({ data = [], colors = [] }) => {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={95}
          paddingAngle={5}
          animationDuration={900}
        >
          {data.map((_, index) => (
            <Cell
              key={index}
              fill={colors[index % colors.length]}
              className="hover:opacity-80 transition-all"
            />
          ))}
        </Pie>

        <Tooltip
          contentStyle={{
            background: "rgba(15,17,23,0.95)",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff",
            boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
