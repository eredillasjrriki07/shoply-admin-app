import { NavLink } from "react-router";
import OrderByStatusChart from "~/components/charts/order-by-status-chart";
import RevenueChart from "~/components/charts/revenue-chart";
import TopProductsChart from "~/components/charts/top-products";
import Card from "~/components/ui/card-component";
import DateRange from "~/components/ui/date-range";
import Table from "~/components/ui/table-component";

interface RecentOrdersTableItemProps {
    order: string;
    customer: string;
    status: string;
    date: string;
    total: number;
};

const RecentOrdersTableHeaders = [
    { label: 'order', span: 'col-span-2' },
    { label: 'customer', span: 'col-span-4' },
    { label: 'status', span: 'col-span-2' },
    { label: 'date', span: 'col-span-2' },
    { label: 'total', span: 'col-span-2' },
];


const Dashboard = () => {
    return (
        <div className="space-y-5">
            <div className="flex justify-between">
                <p className="text-2xl font-semibold">Dashboard</p>
                <DateRange />
            </div>
            <div className="grid grid-cols-4 gap-4">
                <Card className="p-5 space-y-3">
                    <p className="text-sm text-gray-500 uppercase">Products</p>
                    <p className="text-3xl font-bold">16</p>
                </Card>
                <Card className="p-5 space-y-3">
                    <p className="text-sm text-gray-500 uppercase">Orders (7d)</p>
                    <p className="text-3xl font-bold">10</p>
                </Card>
                <Card className="p-5 space-y-3">
                    <p className="text-sm text-gray-500 uppercase">Customers</p>
                    <p className="text-3xl font-bold">5</p>
                </Card>
                <Card className="p-5 space-y-3">
                    <p className="text-sm text-gray-500 uppercase">Revenue (7d)</p>
                    <p className="text-3xl font-bold">₱1070.59</p>
                </Card>
            </div>
            <div className="grid grid-cols-6 gap-4">
                <RevenueChart />
                <OrderByStatusChart />
            </div>
            <div className="flex gap-4">
                <TopProductsChart />
                <Card className="col-span-2 w-full">
                    <Card.Header>
                        <span className="font-semibold">Recent orders</span>
                    </Card.Header>
                    <div className="p-5">
                        <Table>
                            <Table.Header className="grid-cols-12">
                                {RecentOrdersTableHeaders.map(header => <span key={header.label} className={`custom-table-header ${header.span}`}>{header.label}</span>)}
                            </Table.Header>
                            <Table.Body className="grid grid-cols-12 p-3">
                                <RecentOrdersTableItem order="SH-4G74SM" customer="Test YUser" status="To Receive" date="05/28/2026" total={42} />
                            </Table.Body>
                        </Table>
                    </div>
                </Card>
            </div>
        </div>
    );
};

const RecentOrdersTableItem = ({ order, customer, status, date, total }: RecentOrdersTableItemProps) => {
    return (
        <>
            <NavLink
                to={'/admin/orders/1'}
                className="col-span-2 font-semibold hover:underline hover:text-blue-500"
            >
                {order}
            </NavLink>
            <span className="col-span-4">{customer}</span>
            <span className="col-span-2">{status}</span>
            <span className="col-span-2">{date}</span>
            <span className="col-span-2">₱{total.toFixed(2)}</span>
        </>
    );
};

export default Dashboard;