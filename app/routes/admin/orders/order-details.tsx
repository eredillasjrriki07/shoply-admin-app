import Card from "~/components/ui/card-component";
import { ItemsTableHeaders, type HistoricalEventProps, type ItemProps } from "./order-details.values";
import Table from "~/components/ui/table-component";
import Button from "~/components/ui/button-component";
import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useAppSelector } from "~/store";
import { useDispatch } from "react-redux";
import { AxiosError } from "axios";
import { errorToast, successToast } from "~/lib/util/shoply-toast";
import { setLoading, setSelectedOrder } from "./slice/orderSlice";
import { api } from "~/lib/api";
import { formatDate, formatDateTime } from "~/lib/helpers/date-helper";
import { OrderStatus, PaymentStatus } from "~/lib/types/types";

const OrderDetails = () => {
    const order = useAppSelector((state) => state.order.selectedOrder);
    const loading = useAppSelector((state) => state.order.loading);
    const dispatch = useDispatch();

    const [submitting, setSubmitting] = useState<boolean>(false);

    const { id } = useParams();

    useEffect(() => {
        async function getOrder() {
            try {
                dispatch(setLoading(true));

                const order = await api.get(`/orders/${id}`);

                dispatch(setSelectedOrder(order.data.data));

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

        getOrder();
    }, []);

    async function moveOrder() {
        try {
            setSubmitting(true);

            if (!order) {
                return;
            }

            const endpointMap: Partial<Record<OrderStatus, string>> = {
                [OrderStatus.PLACED]: 'to-ship',
                [OrderStatus.TO_SHIP]: 'shipped',
                [OrderStatus.TO_RECEIVE]: 'delivered',
                [OrderStatus.COMPLETED]: 'return',
            };

            const orderStatus = order.status;

            const updateEndpoint = endpointMap[orderStatus];

            await api.post(`orders/${order?.id}/${updateEndpoint}`);

            window.location.reload();

        } catch (error) {

            if (error instanceof AxiosError) {
                errorToast(error.response?.data.message)
            } else if (error instanceof Error) {
                errorToast(error.message);
            }

        } finally {

            setSubmitting(false);

        }

    }

    const movementLabel = getOrderMovementLabel(order?.status!);

    return loading ?
        (<div className="w-full h-full flex items-center justify-center">Loading order...</div>)
        : (
            <div className="space-y-5">
                <div className="flex justify-between items-center">
                    <div className="space-y-2">
                        <Link to="/admin/orders" className="text-xs hover:underline">← Orders</Link>
                        <div className="flex items-center gap-2">
                            <div>
                                <p className="text-2xl font-bold">{order?.orderNumber}</p>
                            </div>
                            <span className="custom-pill bg-blue-100 text-blue-800 text-xs uppercase py-0.5 font-semibold">{order?.status}</span>
                        </div>
                        <p className="text-sm text-gray-500">Placed {formatDateTime(new Date(order?.createdAt!))}</p>
                    </div>
                    {movementLabel === 'Refund / Return'
                        ?
                        <Button
                            className="text-red-500 text-sm p-3"
                            onClick={moveOrder}
                        >
                            Refund / Return
                        </Button>
                        :
                        <Button.Submit
                            className="px-4 py-2"
                            disabled={submitting}
                            onClick={moveOrder}
                        >
                            {movementLabel}
                        </Button.Submit>
                    }

                </div>
                <div className="grid grid-cols-5 gap-4">
                    {/* Items */}
                    <Card className="col-span-3">
                        <Card.Header>
                            <span className="font-semibold">Items</span>
                        </Card.Header>
                        <Table.Header className="grid-cols-12">
                            {ItemsTableHeaders.map(header => <span key={header.label} className={`custom-table-header ${header.span}`}>{header.label}</span>)}
                        </Table.Header>
                        <Table.Body className="grid-cols-12 items-center">
                            {order?.orderItems.map((item, index, list) =>
                                <Item
                                    key={item.id}
                                    itemId={item.id!}
                                    name={item.productName}
                                    price={item.unitPrice}
                                    qty={item.quantity}
                                    border={(index === list.length - 1) ? "" : "border-b border-gray-200"}
                                />
                            )}
                        </Table.Body>
                    </Card>
                    {/* Summary */}
                    <Card className="col-span-2">
                        <Card.Header>
                            <span className="font-semibold">Summary</span>
                        </Card.Header>
                        <Card.Body className="space-y-4">
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Subtotal</span>
                                    <span>₱{order?.subtotal}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Shipping</span>
                                    <span>₱{order?.shippingFee}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Tax</span>
                                    <span>₱{order?.tax}</span>
                                </div>
                            </div>
                            <hr className="border-gray-200" />
                            <div className="flex justify-between font-bold">
                                <span>Total</span>
                                <span>₱{order?.total}</span>
                            </div>
                        </Card.Body>
                    </Card>
                    {/* Timeline */}
                    <Card className="card col-span-3">
                        <Card.Header>
                            <span className="font-semibold">Timeline</span>
                        </Card.Header>
                        <Card.Body className="relative space-y-5">
                            {order?.orderTimelineEvents.map((timelineEvent, index, events) =>
                                <HistoricalEvent
                                    key={timelineEvent.id}
                                    eventType={timelineEvent.eventType}
                                    date={formatDateTime(new Date(timelineEvent.occurredAt))}
                                    isCurrent={index === events.length - 1}
                                />
                            )}
                            <div className={`absolute inset-0 top-12 left-6.75 bg-gray-200 w-0.5 h-${(order?.orderTimelineEvents.length! - 1) * 15}`}></div>
                        </Card.Body>
                    </Card>
                    {/* Customer */}
                    <Card className="col-span-2">
                        <Card.Header>
                            <span className="font-semibold">Customer</span>
                        </Card.Header>
                        <Card.Body className="space-y-4">
                            <div className="space-y-3">
                                <div className="flex flex-col">
                                    <span className="font-bold">{order?.user.firstName} {order?.user.lastName}</span>
                                    <span className="text-gray-500">{order?.user.email}</span>
                                    <span className="text-gray-500 text-sm">Member since {formatDate(order?.user.createdAt!)}</span>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                    {/* Shipping Address */}
                    <Card className="col-span-3">
                        <Card.Header className="flex justify-between items-center">
                            <span className="font-semibold">Shipping Address</span>
                            <span className="text-sm font-semibold text-gray-500">UPS Ground</span>
                        </Card.Header>
                        <Card.Body className="space-y-4">
                            <div className="space-y-3">
                                <div className="flex flex-col">
                                    <span className="font-bold">{order?.orderShippingAddress.recipientName}</span>
                                    <span>{order?.orderShippingAddress.line1}</span>
                                    <span>{order?.orderShippingAddress.line2}</span>
                                    <span className="text-gray-500">{order?.orderShippingAddress.city}, {order?.orderShippingAddress.country}</span>
                                </div>
                            </div>
                            <hr className="border-gray-200" />
                            <div className="flex justify-between">
                                <span className="text-gray-500">Contact</span>
                                <span>{order?.orderShippingAddress.phone}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Tracking</span>
                                <code className="bg-gray-100 text-sm px-1 border border-gray-300 rounded-sm">{order?.orderShippingAddress.id}</code>
                            </div>
                        </Card.Body>
                    </Card>
                    {/* Payment */}
                    <Card className="card col-span-2">
                        <Card.Header>
                            <span className="font-semibold">Payment</span>
                        </Card.Header>
                        <Card.Body className="space-y-4">
                            <div className="space-y-3">
                                <div className="flex flex-col">
                                    <span className="font-bold">Visa <span className="text-gray-500 font-normal">ending in</span> 0027</span>
                                    <span className="text-sm text-gray-500">Charged 5/18/2026</span>
                                </div>
                            </div>
                            <hr className="border-gray-200" />
                            {order?.orderPayment.status !== PaymentStatus.PENDING &&
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Amount</span>
                                    <span>₱{order?.orderPayment.amount}</span>
                                </div>
                            }
                            <div className="flex justify-between">
                                <span className="text-gray-500">Status</span>
                                <span>{order?.orderPayment.status}</span>
                            </div>
                            {order?.orderPayment.status !== PaymentStatus.PENDING &&
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Transaction</span>
                                    <code className="bg-gray-100 text-sm px-1 border border-gray-300 rounded-sm">{order?.orderPayment.providerRef}</code>
                                </div>
                            }
                        </Card.Body>
                    </Card>
                    {/* Internal notes */}
                </div>
            </div>
        );
};

function getOrderMovementLabel(status: OrderStatus) {
    const labelMap: Partial<Record<OrderStatus, string>> = {
        [OrderStatus.PLACED]: 'Ship',
        [OrderStatus.TO_SHIP]: 'Mark shipped',
        [OrderStatus.TO_RECEIVE]: 'Mark delivered',
        [OrderStatus.COMPLETED]: 'Refund / Return',
        [OrderStatus.RETURN_OR_REFUND]: 'Mark completed',
    };
    return labelMap[status];
}

const Item = (props: ItemProps) => {
    return (
        <div className={`col-span-12 grid grid-cols-12 p-3 ${props.border}`}>
            <span className="col-span-3 text-base font-semibold">{props.name}</span>
            <span className="col-span-3">{props.price}</span>
            <span className="col-span-3">× {props.qty}</span>
            <span className="col-span-3 font-semibold">₱{(props.price * props.qty).toFixed(2)}</span>
        </div>
    );
};

const HistoricalEvent = ({ eventType, date, isCurrent }: HistoricalEventProps) => {
    return isCurrent ?
        (
            <div className="flex items-center gap-3">
                <div className="z-10 relative">
                    <div className="absolute inset-0 -top-1 -left-1 w-6 h-6 bg-blue-100 rounded-full"></div>
                    <div className="relative z-10 w-4 h-4 bg-blue-500 rounded-full"></div>
                </div>
                <div className="flex flex-col items-start">
                    <span className="font-bold text-blue-500">{eventType}</span>
                    <span className="text-sm text-gray-500">{date}</span>
                </div>
            </div>
        )
        :
        (
            <div className="flex items-center gap-3">
                <div className="z-10 w-4 h-4 bg-green-700 rounded-full"></div>
                <div className="flex flex-col items-start">
                    <span className="font-bold">{eventType}</span>
                    <span className="text-sm text-gray-500">{date}</span>
                </div>
            </div>
        );
};

export default OrderDetails;