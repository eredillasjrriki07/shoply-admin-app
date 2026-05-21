import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import Card from "../ui/card-component";

type Slice = { name: string; value: number; color: string };

const data: Slice[] = [
    { name: "Pending", value: 5, color: "#3b82f6" }, // blue
    { name: "Shipped", value: 2, color: "#f59e0b" }, // amber
    { name: "Delivered", value: 3, color: "#10b981" }, // green
];

const StatusCount = [
    { status: 'To Ship', count: 2, color: 'bg-amber-600' },
    { status: 'Cancelled', count: 0, color: 'bg-gray-400' },
    { status: 'To Receive', count: 6, color: 'bg-blue-600' },
    { status: 'Return/Refund', count: 0, color: 'bg-red-600' },
    { status: 'Completed', count: 2, color: 'bg-green-600' },
];

const OrderByStatusChart = () => {
    const total = data.reduce((sum, d) => sum + d.value, 0);

    return (
        <Card className="col-span-2 w-full">
            <Card.Header>
                <span className="font-semibold">Orders by status</span>
            </Card.Header>
            <Card.Body className="relative h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius="65%"
                            outerRadius="90%"
                            paddingAngle={0}
                            startAngle={90}
                            endAngle={-270}
                            stroke="none"
                        >
                            {data.map((slice) => (
                                <Cell key={slice.name} fill={slice.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                borderRadius: 8,
                                border: "1px solid #e5e7eb",
                                fontSize: 13,
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>

                {/* Center label */}
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-3xl font-bold text-gray-900">{total}</p>
                </div>
            </Card.Body>
            <div className="grid grid-cols-2 px-5 pb-5 gap-x-4">
                {StatusCount.map(status =>
                    <div className="flex" key={status.status}>
                        <div className="flex items-center flex-1 gap-2">
                            <div className={`w-3 h-3 ${status.color}`}></div>
                            <span className="text-sm">{status.status}</span>
                        </div>
                        <span className="text-gray-500 font-semibold">{status.count}</span>
                    </div>
                )}
            </div>
        </Card>
    );
}

export default OrderByStatusChart;