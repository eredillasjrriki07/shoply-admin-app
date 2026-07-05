import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import Table from "~/components/ui/table-component";
import { OrdersTableHeaders, tabs, type OrderItemProps } from "./orders.values";
import { useAppSelector } from "~/store";
import { useDispatch } from "react-redux";
import { api } from "~/lib/api";
import { setOrders } from "./slice/orderViewSlice";
import { formatDate } from "~/lib/helpers/helpers";
import { InputField } from "~/components/ui/field-component";
import Button from "~/components/ui/button-component";
import type { OrdersViewFilter } from "./types";
import { UTC_DAY_END_SUFFIX, UTC_DAY_START_SUFFIX } from "~/lib/constants/constants";
import { PageComponent } from "~/components/ui/page-component";

const Orders = () => {
    const [activeTab, setActiveTab] = useState("All");
    const [qFrom, setqFrom] = useState<string>("");
    const [qTo, setqTo] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const orders = useAppSelector((state) => state.ordersView.orders);
    const orderCount = useAppSelector((state) => state.ordersView.count);
    const ordersTotal = useAppSelector((state) => state.ordersView.total);
    const dispatch = useDispatch();

    useEffect(() => {
        async function getOrders() {
            const queryParams: OrdersViewFilter = { page };

            // Construct filter
            if (qFrom) queryParams.fromDate = qFrom + UTC_DAY_START_SUFFIX;
            if (qTo) queryParams.toDate = qTo + UTC_DAY_END_SUFFIX;

            console.log(queryParams);

            const { data } = await api.get('/orders', {
                params: queryParams
            });

            dispatch(setOrders(data.data));
        }

        getOrders();
    }, [dispatch, qFrom, qTo, page]);

    return (
        <div className="space-y-5">
            <div className="flex justify-between items-center">
                <p className="text-2xl font-semibold">Orders</p>
                <span className="text-sm text-gray-500">{orderCount} orders · ₱{ordersTotal.toFixed(2)}</span>
            </div>
            {/* Filter section */}
            <div className="flex justify-end items-center gap-x-5">
                <InputField
                    label="From"
                    type="date"
                    className="w-60 bg-white ml-4"
                    value={qFrom}
                    onChange={setqFrom}
                />
                <InputField
                    label="To"
                    type="date"
                    className="w-50 bg-white ml-4"
                    value={qTo}
                    onChange={setqTo}
                />
                <Button
                    className="text-sm px-2 py-1"
                >
                    Clear dates
                </Button>
            </div>
            {/* Status tab selector */}
            <div className="overflow-x-auto hide-scrollbar border-b border-gray-200">
                <div className="flex min-w-max gap-1">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium cursor-pointer ${isActive
                                    ? "border-blue-600 text-blue-600"
                                    : "border-transparent text-gray-600 hover:text-gray-900"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>
            <Table>
                <Table.Header className="grid-cols-12">
                    {OrdersTableHeaders.map(header => <span key={header.label} className={`custom-table-header ${header.span}`}>{header.label}</span>)}
                </Table.Header>
                <Table.Body className="grid-cols-12">
                    {orders.filter((order) => order.status === activeTab || activeTab === 'All').map((filteredOrder, index, list) =>
                        <OrderItem
                            key={filteredOrder.id}
                            orderId={filteredOrder.id}
                            customer={filteredOrder.customerName}
                            status={filteredOrder.status}
                            date={formatDate(filteredOrder.date)}
                            itemCount={filteredOrder.items}
                            total={filteredOrder.total}
                            border={(index === list.length - 1) ? "" : "border-b border-gray-200"}
                        />
                    )}
                </Table.Body>
            </Table>
            <PageComponent count={orderCount} page={page} setPage={setPage} />
        </div>
    );
};

const OrderItem = (props: OrderItemProps) => {
    return (
        <div className={`col-span-12 grid grid-cols-12 p-3 ${props.border}`}>
            <NavLink
                to={'/admin/orders/1'}
                className="col-span-2 font-semibold hover:underline hover:text-blue-500"
            >
                {props.orderId}
            </NavLink>
            <span className="col-span-3">{props.customer}</span>
            <span className="col-span-2"> {props.status}</span>
            <span className="col-span-2">{props.date}</span>
            <span className="col-span-2">{props.itemCount}</span>
            <span className="col-span-1 font-semibold">₱{props.total.toFixed(2)}</span>
        </div>
    );
};

export default Orders;