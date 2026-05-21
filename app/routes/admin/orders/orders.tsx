import { useState } from "react";
import { NavLink } from "react-router";
import Table from "~/components/ui/table-component";
import { OrdersTableHeaders, tabs, type OrderItemProps } from "./orders.values";

const Orders = () => {
    const [activeTab, setActiveTab] = useState("All");

    return (
        <div className="space-y-5">
            <div className="flex justify-between items-center">
                <p className="text-2xl font-semibold">Orders</p>
                <span className="text-sm text-gray-500">19 orders · ₱1895.04</span>
            </div>
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
                    <OrderItem orderId="SH-4G74SM" customer="Test User" status="To Receive" date="5/18/2026, 7:53:02 PM" itemCount={1} total={31.91} />
                </Table.Body>
            </Table>
        </div>
    );
};

const OrderItem = ({ orderId, customer, status, date, itemCount, total }: OrderItemProps) => {
    return (
        <>
            <NavLink
                to={'/admin/orders/1'}
                className="col-span-2 font-semibold hover:underline hover:text-blue-500"
            >
                {orderId}
            </NavLink>
            <span className="col-span-3">{customer}</span>
            <span className="col-span-2"> {status}</span>
            <span className="col-span-2">{date}</span>
            <span className="col-span-2">{itemCount}</span>
            <span className="col-span-1 font-semibold">₱{total}</span>
        </>
    );
};

export default Orders;