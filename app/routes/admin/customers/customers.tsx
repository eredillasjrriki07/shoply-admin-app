import { NavLink } from "react-router";
import Table from "~/components/ui/table-component";
import { CustomersTableHeaders, type CustomerEntryProps } from "./customers.value";
import { useAppSelector } from "~/store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { errorToast } from "~/lib/util/shoply-toast";
import { api } from "~/lib/api";
import { setCustomers } from "./slice/customersViewSlice";
import { formatDate } from "~/lib/helpers/date-helper";
import { PageComponent } from "~/components/ui/page-component";
import type { CustomersViewFilter } from "./types";
import { InputField } from "~/components/ui/field-component";
import { useDebounce } from "use-debounce";
import { DEBOUNCE_TIME } from "~/lib/constants/constants";

const Customers = () => {
    const customers = useAppSelector((state) => state.customersView.customers);
    const customerCount = useAppSelector((state) => state.customersView.count);
    const dispatch = useDispatch();
    const [page, setPage] = useState<number>(1);
    const [qEmail, setqEmail] = useState<string>("");
    const [debouncedqEmail] = useDebounce(qEmail, DEBOUNCE_TIME);


    useEffect(() => {
        async function getCustomers() {
            try {
                const queryParams: CustomersViewFilter = { page };

                // Construct filter
                if (debouncedqEmail) queryParams.email = debouncedqEmail;

                const { data } = await api.get('/users', {
                    params: queryParams,
                });

                dispatch(setCustomers(data.data));
            } catch (error) {
                if (error instanceof AxiosError) {
                    errorToast(error.response?.data.message)
                } else if (error instanceof Error) {
                    errorToast(error.message);
                }
            }
        }

        getCustomers();
    }, [dispatch, debouncedqEmail, page]);

    return (
        <div className="space-y-5">
            <div className="flex justify-between items-center">
                <p className="text-2xl font-semibold">Customers</p>
                <span className="text-sm text-gray-500">{customerCount} Customers</span>
            </div>
            <div className="flex justify-start items-center gap-x-5">
                <InputField
                    label="Search by email"
                    type="email"
                    className="w-72 bg-white ml-4"
                    value={qEmail}
                    onChange={setqEmail}
                />
            </div>
            <Table>
                <Table.Header className="grid-cols-12">
                    {CustomersTableHeaders.map(header => <span key={header.label} className={`custom-table-header ${header.span}`}>{header.label}</span>)}
                </Table.Header>
                <Table.Body className="grid-cols-12">
                    {customers.map((customer, index, list) =>
                        <CustomerEntry
                            key={customer.id}
                            id={customer.id}
                            name={customer.name}
                            email={customer.email}
                            dateJoined={formatDate(customer.joined)}
                            orderCount={customer.orders}
                            spent={customer.spent}
                            border={(index === list.length - 1) ? "" : "border-b border-gray-200"}
                        />
                    )}
                </Table.Body>
            </Table>
            <PageComponent count={customerCount} page={page} setPage={setPage} />
        </div>
    );
};

const CustomerEntry = (props: CustomerEntryProps) => {
    return (
        <div className="col-span-12 grid grid-cols-12 p-3 border-b border-gray-200">
            <NavLink
                to={`/admin/customers/${props.id}`}
                className="col-span-4 font-semibold hover:underline hover:text-blue-500"
            >
                {props.name}
            </NavLink>
            <span className="col-span-4">{props.email}</span>
            <span className="col-span-2">{props.dateJoined}</span>
            <span className="col-span-1">{props.orderCount}</span>
            <span className="col-span-1">₱{props.spent.toFixed(2)}</span>
        </div>
    );
};

export default Customers;