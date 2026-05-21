import Card from "~/components/ui/card-component";
import { ItemsTableHeaders, type ItemProps } from "./order-details.values";
import Table from "~/components/ui/table-component";
import { TextArea } from "~/components/ui/field-component";
import Button from "~/components/ui/button-component";
import { Link, NavLink } from "react-router";

const OrderDetails = () => {
    return (
        <div className="space-y-5">
            <div className="flex justify-between items-center">
                <div className="space-y-2">
                    <Link to="/admin/orders" className="text-xs hover:underline">← Orders</Link>
                    <div className="flex items-center gap-2">
                        <div>
                            <p className="text-2xl font-bold">SH-4G74SM</p>
                        </div>
                        <span className="custom-pill bg-blue-100 text-blue-800 text-xs uppercase py-0.5 font-semibold">To Receive</span>
                    </div>
                    <p className="text-sm text-gray-500">Placed 5/18/2026, 7:53:02 PM</p>
                </div>
                <Button.Submit className="px-4 py-2">
                    Mark Delivered
                </Button.Submit>
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
                        <Item name="Classic Tee" price={24} qty={1} />
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
                                <span>₱24.00</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Shipping</span>
                                <span>₱5.99</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Tax</span>
                                <span>₱1.92</span>
                            </div>
                        </div>
                        <hr className="border-gray-200" />
                        <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span>₱31.91</span>
                        </div>
                    </Card.Body>
                </Card>
                {/* Timeline */}
                <Card className="card col-span-3">
                    <Card.Header>
                        <span className="font-semibold">Timeline</span>
                    </Card.Header>
                    <Card.Body className="relative space-y-5">
                        <div className="flex items-center gap-3">
                            <div className="z-10 w-4 h-4 bg-green-700 rounded-full"></div>
                            <div className="flex flex-col items-start">
                                <span className="font-bold">Placed</span>
                                <span className="text-sm text-gray-500">5/18/2026, 7:53:02 PM</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="z-10 w-4 h-4 bg-green-700 rounded-full"></div>
                            <div className="flex flex-col items-start">
                                <span className="font-bold">To Ship</span>
                                <span className="text-sm text-gray-500">5/18/2026, 7:53:02 PM</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="z-10 relative">
                                <div className="absolute inset-0 -top-1 -left-1 w-6 h-6 bg-blue-100 rounded-full"></div>
                                <div className="relative z-10 w-4 h-4 bg-blue-500 rounded-full"></div>
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="font-bold text-blue-500">Shipped</span>
                                <span className="text-sm text-gray-500">5/18/2026, 7:53:02 PM</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="z-10 flex justify-center items-center bg-gray-200 w-4 h-4 rounded-full">
                                <div className="w-3 h-3 bg-white rounded-full"></div>
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="font-bold">Delivered</span>
                                <span className="text-sm text-gray-500">Est. 5/24/2026</span>
                            </div>
                        </div>
                        <div className="absolute inset-0 top-12 left-6.75 bg-gray-200 w-0.5 h-52"></div>
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
                                <span className="font-bold">Test User</span>
                                <span className="text-gray-500">test@shoply.com</span>
                                <span className="text-gray-500 text-sm">Member since 5/18/2026</span>
                            </div>
                        </div>
                        <hr className="border-gray-200" />
                        <div className="flex justify-between">
                            <span className="text-gray-500">Lifetime orders</span>
                            <span>6</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Lifetime spent</span>
                            <span>₱5.99</span>
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
                                <span className="font-bold">Test User</span>
                                <span>99 Birch Road, Unit 7</span>
                                <span>Boulder, CO 80302</span>
                                <span className="text-gray-500">United States</span>
                            </div>
                        </div>
                        <hr className="border-gray-200" />
                        <div className="flex justify-between">
                            <span className="text-gray-500">Tracking</span>
                            <code className="bg-gray-100 text-sm px-1 border border-gray-300 rounded-sm">1Z95203763US</code>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Estimated Arrival</span>
                            <span>5/24/2026</span>
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
                        <div className="flex justify-between">
                            <span className="text-gray-500">Amount</span>
                            <span>₱5.99</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Status</span>
                            <span>Captured</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Transaction</span>
                            <code className="bg-gray-100 text-sm px-1 border border-gray-300 rounded-sm">txn_1an5p2l</code>
                        </div>
                    </Card.Body>
                </Card>
                {/* Internal notes */}
                <Card className="card col-span-5">
                    <Card.Header>
                        <span className="font-semibold">Internal notes</span>
                    </Card.Header>
                    <Card.Body className="space-y-4">
                        <TextArea></TextArea>
                        <div className="flex justify-end gap-2">
                            <Button className="px-4 py-2">
                                Clear
                            </Button>
                            <Button.Submit className="px-4 py-2">
                                Save notes
                            </Button.Submit>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

const Item = ({ name, price, qty }: ItemProps) => {
    return (
        <>
            <div className="col-span-3 flex flex-col text-xs">
                <NavLink
                    to={'/admin/products/1'}
                    className="text-base font-semibold hover:underline hover:text-blue-500"
                >
                    {name}
                </NavLink>
                <span className="text-gray-500">SKU-63401</span>
                <span className="text-gray-500">Size S · Black</span>
            </div>
            <span className="col-span-3">{price}</span>
            <span className="col-span-3">× {qty}</span>
            <span className="col-span-3 font-semibold justify-self-end">₱{(price * qty).toFixed(2)}</span>
        </>
    );
};

export default OrderDetails;