import Table from "~/components/ui/table-component";
import { PromoCodesTableHeaders, type PromoCodeEntryProps } from "./promos.values";
import { NavLink } from "react-router";
import Button from "~/components/ui/button-component";

const Promos = () => {
    return (
        <div className="space-y-5">
            <div className="flex justify-between items-center">
                <p className="text-2xl font-semibold">Promo Codes</p>
                <Button.Submit className="px-4 py-2">
                    + Add Promo
                </Button.Submit>
            </div>
            <Table>
                <Table.Header className="grid-cols-12">
                    {PromoCodesTableHeaders.map(header => <span key={header.label} className={`custom-table-header ${header.span}`}>{header.label}</span>)}
                </Table.Header>
                <Table.Body className="grid-cols-12">
                    <CustomerEntry code="SAVE10" type="Percent" value="10%" label="10% off" />
                </Table.Body>
            </Table>
        </div>
    );
};

const CustomerEntry = ({ code, type, value, label }: PromoCodeEntryProps) => {
    return (
        <>
            <NavLink
                to={'/admin/promos/1'}
                className="col-span-3 font-semibold hover:underline hover:text-blue-500"
            >
                {code}
            </NavLink>
            <span className="col-span-3">{type}</span>
            <span className="col-span-3">{value}</span>
            <span className="col-span-3">{label}</span>
        </>
    );
};

export default Promos;