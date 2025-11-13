import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ScoreData {
  day: string;
  score: number;
}

export default function StudentLineChart() {
  const scoreData: ScoreData[] = [
    { day: "Mon", score: 45 },
    { day: "Tue", score: 52 },
    { day: "Wed", score: 58 },
    { day: "Thu", score: 65 },
    { day: "Fri", score: 70 },
    { day: "Sat", score: 78 },
    { day: "Sun", score: 85 },
  ];

  return (
    <div className="">
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={scoreData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="day"
            tick={{ fill: "#5a5a5a", fontSize: 12 }}
            axisLine={{ stroke: "#e5e7eb" }}
          />
          <YAxis
            tick={{ fill: "#5a5a5a", fontSize: 12 }}
            axisLine={{ stroke: "#e5e7eb" }}
            label={{
              value: "Score",
              angle: -90,
              position: "insideLeft",
              style: { fill: "#5a5a5a", fontSize: 12 },
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "8px 12px",
            }}
            formatter={(value: number) => [`${value} points`, "Score"]}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#3b8e81"
            strokeWidth={3}
            dot={{ fill: "#3b8e81", r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}