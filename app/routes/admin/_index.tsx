import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import OrderByStatusChart from "~/components/charts/order-by-status-chart";
import RevenueChart from "~/components/charts/revenue-chart";
import TopProductsChart from "~/components/charts/top-products";
import Card from "~/components/ui/card-component";
import DateRange from "~/components/ui/date-range";
import Table from "~/components/ui/table-component";
import { api } from "~/lib/api";
import type { Dashboard } from "./dashboard/types";
import { AxiosError } from "axios";
import { errorToast } from "~/lib/util/shoply-toast";
import { formatDate } from "~/lib/helpers/date-helper";

interface RecentOrdersTableItemProps {
    order: string;
    customer: string;
    status: string;
    date: string;
    total: number;
    border: string;
};

const RecentOrdersTableHeaders = [
    { label: 'order', span: 'col-span-2' },
    { label: 'customer', span: 'col-span-4' },
    { label: 'status', span: 'col-span-2' },
    { label: 'date', span: 'col-span-2' },
    { label: 'total', span: 'col-span-2' },
];

const Dashboard = () => {
    const [range, setRange] = useState<string>('7d');
    const [loading, setLoading] = useState<boolean>(false);
    const [dashboard, setDashboard] = useState<Dashboard>();

    useEffect(() => {
        async function getDashboard() {
            try {
                setLoading(true);

                const { data } = await api.get('/dashboard', {
                    params: { range },
                });

                setDashboard(data.data);

            } catch (error) {

                if (error instanceof AxiosError) {
                    errorToast(error.response?.data.message)
                } else if (error instanceof Error) {
                    errorToast(error.message);
                }

            } finally {
                setLoading(false);
            }
        }

        getDashboard();
    }, [range]);

    return loading ?
        (<div className="w-full h-full flex items-center justify-center">Loading order...</div>)
        : (
            <div className="space-y-5">
                <div className="flex justify-between">
                    <p className="text-2xl font-semibold">Dashboard</p>
                    <DateRange range={range} setRange={setRange} />
                </div>
                <div className="grid grid-cols-4 gap-4">
                    <Card className="p-5 space-y-3">
                        <p className="text-sm text-gray-500 uppercase">Products</p>
                        <p className="text-3xl font-bold">{dashboard?.products}</p>
                    </Card>
                    <Card className="p-5 space-y-3">
                        <p className="text-sm text-gray-500 uppercase">Orders (7d)</p>
                        <p className="text-3xl font-bold">{dashboard?.orders}</p>
                    </Card>
                    <Card className="p-5 space-y-3">
                        <p className="text-sm text-gray-500 uppercase">Customers</p>
                        <p className="text-3xl font-bold">{dashboard?.customers}</p>
                    </Card>
                    <Card className="p-5 space-y-3">
                        <p className="text-sm text-gray-500 uppercase">Revenue (7d)</p>
                        <p className="text-3xl font-bold">₱{dashboard?.revenue.revenue}</p>
                    </Card>
                </div>
                <div className="grid grid-cols-6 gap-4">
                    <RevenueChart revenue={dashboard?.revenue.revenue!} range={'90'} data={dashboard?.revenue.revenueDataPoints!} />
                    <OrderByStatusChart statusCounts={dashboard?.statusCounts!} />
                </div>
                <div className="flex gap-4">
                    <TopProductsChart data={dashboard?.topProducts!} />
                    <Card className="col-span-2 w-full">
                        <Card.Header>
                            <span className="font-semibold">Recent orders</span>
                        </Card.Header>
                        <div className="p-5">
                            <Table>
                                <Table.Header className="grid-cols-12">
                                    {RecentOrdersTableHeaders.map(header => <span key={header.label} className={`custom-table-header ${header.span}`}>{header.label}</span>)}
                                </Table.Header>
                                <Table.Body className="grid grid-cols-12">
                                    {dashboard?.recentOrders.map((recentOrder, index, list) =>
                                        <RecentOrdersTableItem
                                            key={recentOrder.id}
                                            order={recentOrder.orderNumber}
                                            customer={recentOrder.customerName}
                                            status={recentOrder.status}
                                            date={formatDate(recentOrder.date)}
                                            total={recentOrder.total}
                                            border={(index === list.length - 1) ? "" : "border-b border-gray-200"}
                                        />
                                    )}

                                </Table.Body>
                            </Table>
                        </div>
                    </Card>
                </div>
            </div>
        );
};

const RecentOrdersTableItem = (props: RecentOrdersTableItemProps) => {
    return (
        <div className={`col-span-12 grid grid-cols-12 p-3 ${props.border}`}>
            <NavLink
                to={`/admin/orders/${props.order}`}
                className="col-span-2 font-semibold hover:underline hover:text-blue-500"
            >
                {props.order}
            </NavLink>
            <span className="col-span-4">{props.customer}</span>
            <span className="col-span-2">{props.status}</span>
            <span className="col-span-2">{props.date}</span>
            <span className="col-span-2">₱{props.total.toFixed(2)}</span>
        </div>
    );
};

export default Dashboard;