// app/components/charts/RevenueChart.tsx
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card from "../ui/card-component";

type DataPoint = { date: string; revenue: number };

const data: DataPoint[] = [
  { date: "May 13", revenue: 215 },
  { date: "May 14", revenue: 140 },
  { date: "May 15", revenue: 0 },
  { date: "May 16", revenue: 235 },
  { date: "May 17", revenue: 285 },
  { date: "May 18", revenue: 170 },
  { date: "May 19", revenue: 0 },
];

const RevenueChart = () => {
  return (
    <Card className="col-span-4 w-full">
      <Card.Header className="flex justify-between items-center">
        <span className="font-semibold">Revenue — last 7 days</span>
        <span className="text-gray-500 font-semibold">₱1070.59 <span className="text-green-700 text-xs">▲ 94.5%</span></span>
      </Card.Header>
      <Card.Body className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />

            <XAxis
              dataKey="date"
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `₱${v}`}
            />

            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                fontSize: 13,
              }}
              formatter={(v) => [`₱${v}`, "Revenue"]}
            />

            <Area
              type="linear"
              dataKey="revenue"
              stroke="#2563eb"
              strokeWidth={2.5}
              fill="url(#revenueFill)"
              dot={{ r: 4, fill: "#2563eb", strokeWidth: 0 }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
};

export default RevenueChart;