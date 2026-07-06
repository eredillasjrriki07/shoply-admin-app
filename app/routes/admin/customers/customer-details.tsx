import Card from "~/components/ui/card-component";
import Table from "~/components/ui/table-component";
import { CustomerOrdersTableHeaders, type CustomerOrdersTableItemProps } from "./customer-details.values";
import { Link, NavLink, useParams } from "react-router";
import { useAppSelector } from "~/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setLoading, setSelectedCustomer } from "./slice/customerSlice";
import { api } from "~/lib/api";
import { AxiosError } from "axios";
import { errorToast } from "~/lib/util/shoply-toast";
import { formatDate, formatDateTime } from "~/lib/helpers/date-helper";
import { getTotalSpent } from "~/lib/helpers/helpers";
import type { ReviewItemProps } from "../products/product-details.values";

const CustomerDetails = () => {
    const customer = useAppSelector((state) => state.customer.customer);
    const loading = useAppSelector((state) => state.customer.loading);
    const dispatch = useDispatch();

    const { id } = useParams();

    useEffect(() => {
        async function getCustomer() {
            try {
                dispatch(setLoading(true));

                const { data } = await api.get(`/users/${id}`);

                dispatch(setSelectedCustomer(data.data));

            } catch (error) {

                if (error instanceof AxiosError) {
                    errorToast(error.response?.data.message)
                } else if (error instanceof Error) {
                    errorToast(error.message);
                }

            } finally {
                dispatch(setLoading(false));
            }
        }

        getCustomer();
    }, []);

    return loading ?
        (<div className="w-full h-full flex items-center justify-center">Loading order...</div>)
        : (<div className="space-y-5">
            <div className="space-y-2">
                <Link to="/admin/orders" className="text-xs hover:underline">← Customers</Link>
                <p className="text-2xl font-bold">{customer?.firstName} {customer?.lastName}</p>
                <p className="text-sm text-gray-500">{customer?.email}</p>
            </div>
            <div className="grid grid-cols-5 gap-4">
                {/* Profile */}
                <Card className="col-span-3">
                    <Card.Header>
                        <span className="font-semibold">Profile</span>
                    </Card.Header>
                    <Card.Body className="space-y-4">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Customer ID</span>
                            <code className="bg-gray-100 text-sm px-1 border border-gray-300 rounded-sm">{customer?.id}</code>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Name</span>
                            <span>{customer?.firstName} {customer?.lastName}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Email</span>
                            <span>{customer?.email}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Joined</span>
                            <span>{formatDateTime(new Date(customer?.createdAt!))}</span>
                        </div>
                    </Card.Body>
                </Card>
                {/* Lifetime stats */}
                <Card className="col-span-2">
                    <Card.Header>
                        <span className="font-semibold">Lifetime Stats</span>
                    </Card.Header>
                    <Card.Body className="space-y-4">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Total orders</span>
                            <span>{customer?.orderCount}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Total spent</span>
                            <span>{customer?.totalSpent}</span>
                        </div>
                    </Card.Body>
                </Card>
                {/* Orders */}
                <Card className="col-span-5 overflow-auto">
                    <Card.Header>
                        <span className="font-semibold">Orders</span>
                    </Card.Header>
                    <Table.Header className="grid-cols-6">
                        {CustomerOrdersTableHeaders.map(header => <span key={header.label} className={`custom-table-header ${header.span}`}>{header.label}</span>)}
                    </Table.Header>
                    <Table.Body className="grid-cols-6">
                        {customer?.orders.map((order, index, list) =>
                            <CustomerOrdersTableItem
                                orderNumber={order.orderNumber}
                                status={order.status}
                                date={formatDate(order.createdAt!)}
                                total={order.total}
                                border={(index === list.length - 1) ? "" : "border-b border-gray-200"}
                            />
                        )}

                    </Table.Body>
                </Card>
            </div>
        </div>
        );
};

const CustomerOrdersTableItem = (props: CustomerOrdersTableItemProps) => {
    return (
        <div className={`col-span-6 grid grid-cols-6 p-3 ${props.border}`}>
            <NavLink
                to={`/admin/orders/${props.orderNumber}`}
                className="col-span-2 font-semibold hover:underline hover:text-blue-500"
            >
                {props.orderNumber}
            </NavLink>
            <span className="col-span-2">{props.status}</span>
            <span className="col-span-1">{props.date}</span>
            <span className="col-span-1 font-semibold">₱{props.total.toFixed(2)}</span>
        </div>
    );
};


export default CustomerDetails;