// app/components/charts/TopProductsChart.tsx
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    LabelList,
    ResponsiveContainer,
} from "recharts";
import Card from "../ui/card-component";
import type { TopProductsChartProps } from "~/routes/admin/dashboard/dashboard.values";


const TopProductsChart = ({ data }: TopProductsChartProps) => {
    return (
        <Card className="w-full">
            <Card.Header>
                <span className="font-semibold">Top Products</span>
            </Card.Header>
            <Card.Body className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 24, right: 20, left: 0, bottom: 8 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                        <XAxis
                            dataKey="name"
                            tick={{ fill: "#6b7280", fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                            interval={0}
                        />
                        <YAxis
                            tick={{ fill: "#9ca3af", fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                            allowDecimals={false}
                        />
                        <Bar dataKey="sold" fill="#2563eb" radius={[6, 6, 0, 0]} barSize={65}>
                            <LabelList
                                dataKey="sold"
                                position="top"
                                fill="#2563eb"
                                fontSize={12}
                                fontWeight={500}
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Card.Body>
        </Card>
    );
}

export default TopProductsChart;