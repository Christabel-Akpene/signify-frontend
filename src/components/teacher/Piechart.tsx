import {
  PieChart,
  Tooltip,
  Pie,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";

interface ChartDataItem {
  name: string;
  color: string;
  value: number;
  label: string;
}

export default function Piechart() {
  const chartData: ChartDataItem[] = [
    { name: "Struggling", color: "#d97d3a", value: 10, label: "10%" },
    { name: "On Track", color: "#3b8e81", value: 60, label: "60%" },
    { name: "Not Started", color: "#5a5a5a", value: 30, label: "30%" },
  ];

  const totalStudents = chartData.reduce((sum, item) => sum + item.value, 0);

  // Custom legend with percentages
  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="flex justify-center gap-6 mt-4 flex-wrap">
        {payload.map((entry: any, index: number) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-textColor">
              {entry.value} <span className="text-secondarytext">({chartData[index].label})</span>
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="">
      <div className="relative">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={chartData as any}
              cx="50%"
              cy="50%"
              dataKey="value"
              outerRadius={90}
              innerRadius={65}
              paddingAngle={3}
              startAngle={90}
              endAngle={450}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string) => [
                `${value} students`,
                name,
              ]}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "8px 12px",
              }}
            />
            <Legend content={renderLegend} />
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none" style={{ marginTop: '-20px' }}>
          <div className="text-4xl font-bold text-textColor">{totalStudents}</div>
          <div className="text-sm text-secondarytext mt-1">Students</div>
        </div>
      </div>
    </div>
  );
}