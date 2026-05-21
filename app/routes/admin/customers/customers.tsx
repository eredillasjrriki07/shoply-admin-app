import { NavLink } from "react-router";
import Table from "~/components/ui/table-component";
import { CustomersTableHeaders, type CustomerEntryProps } from "./customers.value";

const Customers = () => {
    return (
        <div className="space-y-5">
            <div className="flex justify-between items-center">
                <p className="text-2xl font-semibold">Customers</p>
                <span className="text-sm text-gray-500">5 Customers</span>
            </div>
            <Table>
                <Table.Header className="grid-cols-12">
                    {CustomersTableHeaders.map(header => <span key={header.label} className={`custom-table-header ${header.span}`}>{header.label}</span>)}
                </Table.Header>
                <Table.Body className="grid-cols-12">
                    <CustomerEntry customerId="CUST-001" name="Boss Riki" email="riki@test.com" dateJoined="4/28/2026" orderCount={0} spent={0} />
                </Table.Body>
            </Table>
        </div>
    );
};

const CustomerEntry = ({ customerId, name, email, dateJoined, orderCount, spent }: CustomerEntryProps) => {
    return (
        <>
            <NavLink
                to={'/admin/customers/1'}
                className="col-span-2 font-semibold hover:underline hover:text-blue-500"
            >
                {customerId}
            </NavLink>
            <span className="col-span-3">{name}</span>
            <span className="col-span-3">{email}</span>
            <span className="col-span-2">{dateJoined}</span>
            <span className="col-span-1">{orderCount}</span>
            <span className="col-span-1">₱{spent.toFixed(2)}</span>
        </>
    );
};

export default Customers;