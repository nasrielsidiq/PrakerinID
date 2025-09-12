import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [
  { name: "Bintang 1", value: 5 },
  { name: "Bintang 2", value: 3 },
  { name: "Bintang 3", value: 2 },
  { name: "Bintang 4", value: 10 },
  { name: "Bintang 5", value: 80 },
];

const COLORS = ["#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#1E40AF"];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  // Show all labels regardless of size
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize="12"
      fontWeight="600"
    >
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

interface PieChartCompenentProps {
  // color: string[];
  legend: string;
}

export default function PieChartComponent({
  // color,
  legend,
}: PieChartCompenentProps) {
  return (
    <div className="w-full h-full mx-auto bg-gray-50 rounded-lg p-4 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">
        {legend}
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${entry.name}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: COLORS[index] }}
            />
            <span className="text-sm text-gray-700 font-medium">
              {entry.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
