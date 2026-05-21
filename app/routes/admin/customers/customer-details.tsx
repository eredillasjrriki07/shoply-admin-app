import Card from "~/components/ui/card-component";
import Table from "~/components/ui/table-component";
import { CustomerOrdersTableHeaders, type CustomerOrdersTableItemProps } from "./customer-details.values";
import { Link, NavLink } from "react-router";

const CustomerDetails = () => {
    return (
        <div className="space-y-5">
            <div className="space-y-2">
                <Link to="/admin/orders" className="text-xs hover:underline">← Customers</Link>
                <p className="text-2xl font-bold">Ricky Eredillas Jr.</p>
                <p className="text-sm text-gray-500">riki@test.com</p>
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
                            <code className="bg-gray-100 text-sm px-1 border border-gray-300 rounded-sm">CUST-001</code>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Name</span>
                            <span>Ricky Eredillas Jr.</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Email</span>
                            <span>eredillasjrricky@gmail.com</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Joined</span>
                            <span>4/29/2026, 7:09:19 PM</span>
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
                            <span>6</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Total spent</span>
                            <span>₱500.00</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Avg. order value</span>
                            <span>₱50.00</span>
                        </div>
                        <hr className="border-gray-200" />
                        <div className="flex justify-between">
                            <span className="text-gray-500">First order </span>
                            <span>4/23/2026</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Last Order</span>
                            <span>5/18/2026</span>
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
                        <CustomerOrdersTableItem order="SH-4G74SM" status="To Receive" date="05/18/2026" itemCount={1} total={41} />
                    </Table.Body>
                </Card>
            </div>
        </div>
    );
};

const CustomerOrdersTableItem = ({ order, status, date, itemCount, total }: CustomerOrdersTableItemProps) => {
    return (
        <>
            <NavLink
                to={'/admin/orders/1'}
                className="col-span-2 font-semibold hover:underline hover:text-blue-500"
            >
                {order}
            </NavLink>
            <span className="col-span-1">{status}</span>
            <span className="col-span-1">{date}</span>
            <span className="col-span-1">{itemCount}</span>
            <span className="col-span-1 font-semibold">₱{total.toFixed(2)}</span>
        </>
    );
};


export default CustomerDetails;