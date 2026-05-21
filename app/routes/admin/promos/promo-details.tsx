import Card from "~/components/ui/card-component";
import Table from "~/components/ui/table-component";
import { Link, NavLink } from "react-router";
import { PromoCodeUsageTableHeaders, type PromoCodesUsageTableProps as PromoCodesUsageTableItemProps } from "./promo-details.values";

const PromoDetails = () => {
    return (
        <div className="space-y-5">
            <div className="space-y-2">
                <Link to="/admin/promos" className="text-xs hover:underline">← Promo Codes</Link>
                <p className="text-2xl font-bold">SAVE10</p>
                <p className="text-sm text-gray-500">10% off</p>
            </div>
            <div className="grid grid-cols-5 gap-4">
                {/* Details */}
                <Card className="col-span-3">
                    <Card.Header>
                        <span className="font-semibold">Details</span>
                    </Card.Header>
                    <Card.Body className="space-y-4">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Code</span>
                            <code className="bg-gray-100 text-sm px-1 border border-gray-300 rounded-sm">SAVE10</code>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Type</span>
                            <span>Percent off subtotal</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Value</span>
                            <span>10%</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Customer label</span>
                            <span>10% off</span>
                        </div>
                    </Card.Body>
                </Card>
                {/* Usage */}
                <Card className="col-span-2">
                    <Card.Header>
                        <span className="font-semibold">Usage</span>
                    </Card.Header>
                    <Card.Body className="space-y-4">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Times used</span>
                            <span>2</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Total discount given</span>
                            <span>₱500.00</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Avg. order value</span>
                            <span>₱50.00</span>
                        </div>
                        <hr className="border-gray-200" />
                        <div className="flex justify-between">
                            <span className="text-gray-500">First used </span>
                            <span>4/23/2026</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Last used</span>
                            <span>5/18/2026</span>
                        </div>
                    </Card.Body>
                </Card>
                {/* Orders */}
                <Card className="col-span-5 overflow-auto">
                    <Card.Header>
                        <span className="font-semibold">Applied orders</span>
                    </Card.Header>
                    <Table.Header className="grid-cols-12">
                        {PromoCodeUsageTableHeaders.map(header => <span key={header.label} className={`custom-table-header ${header.span}`}>{header.label}</span>)}
                    </Table.Header>
                    <Table.Body className="grid-cols-12">
                        <PromoCodesUsageTableItem order="SH-4G74SM" status="To Receive" customer="Riki riki" date="05/18/2026" discount={10} total={41} />
                    </Table.Body>
                </Card>
            </div>
        </div>
    );
};

const PromoCodesUsageTableItem = ({ order, status, customer, date, discount, total }: PromoCodesUsageTableItemProps) => {
    return (
        <>
            <NavLink
                to={'/admin/orders/1'}
                className="col-span-2 font-semibold hover:underline hover:text-blue-500"
            >
                {order}
            </NavLink>
            <span className="col-span-2">{status}</span>
            <span className="col-span-3">{customer}</span>
            <span className="col-span-2">{date}</span>
            <span className="col-span-2">₱{discount.toFixed(2)}</span>
            <span className="col-span-1 font-semibold">₱{total.toFixed(2)}</span>
        </>
    );
};


export default PromoDetails;