import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import Button from "~/components/ui/button-component";
import Table from "~/components/ui/table-component";
import { ProductTableHeaders, type ProductTableItemProps } from "./product.values";
import { useDispatch } from 'react-redux';
import { api } from "~/lib/api";
import { type ApiResponse } from "~/lib/types/types";
import type { InventoryStats, ProductFilter } from "./types";
import { useAppSelector } from "~/store";
import Card from "~/components/ui/card-component";
import { InputField, SelectField } from "~/components/ui/field-component";
import { useDebounce } from "use-debounce";
import { PAGE_LIMIT, productCategories, productStatus } from "~/lib/constants/constants";
import { setProducts } from "./slice/productsViewSlice";

const Products = () => {
    const [inventoryStats, setInventoryStats] = useState<InventoryStats>();
    const [qName, setqName] = useState<string>("");
    const [debouncedqName] = useDebounce(qName, 400);
    const [qCategory, setqCategory] = useState<string>("");
    const [qStatus, setqStatus] = useState<string>("");
    const [page, setPage] = useState<number>(1);

    const navigate = useNavigate();
    const products = useAppSelector((state) => state.productsView.products);
    const productCount = useAppSelector((state) => state.productsView.count);
    const dispatch = useDispatch();

    const maxPage = Math.max(1, Math.ceil(productCount / PAGE_LIMIT));

    useEffect(() => {
        async function getProducts() {
            const queryParams: ProductFilter = { page };

            // Construct filter
            if (debouncedqName) queryParams.name = debouncedqName;
            if (qCategory) queryParams.category = qCategory;
            if (qStatus) queryParams.status = qStatus;

            const { data } = await api.get('/products', {
                params: queryParams
            });

            dispatch(setProducts(data.data));
        }

        getProducts();

    }, [dispatch, debouncedqName, qCategory, qStatus, page]);

    useEffect(() => {
        async function getInventoryStats() {
            const { data } = await api.get<ApiResponse<InventoryStats>>('/products/statistics');
            setInventoryStats(data.data);
        }
        getInventoryStats();
    }, []);

    return (
        <div className="space-y-5">
            <div className="flex justify-between items-center">
                <p className="text-2xl font-semibold">Products</p>
                <Button.Submit
                    className="px-4 py-2"
                    onClick={() => navigate('/admin/products/add')}
                >
                    + Add Product
                </Button.Submit>
            </div>
            <div className="grid grid-cols-4 gap-4">
                <Card className="p-5 space-y-3">
                    <p className="text-sm text-gray-500 uppercase">Products</p>
                    <p className="text-3xl font-bold">{inventoryStats?.products}</p>
                </Card>
                <Card className="p-5 space-y-3">
                    <p className="text-sm text-gray-500 uppercase">Total Units</p>
                    <p className="text-3xl font-bold">{inventoryStats?.totalUnits}</p>
                </Card>
                <Card className="p-5 space-y-3">
                    <p className="text-sm text-gray-500 uppercase">Low Stock</p>
                    <p className="text-3xl font-bold">{inventoryStats?.lowStock}</p>
                </Card>
                <Card className="p-5 space-y-3">
                    <p className="text-sm text-gray-500 uppercase">Out of Stock</p>
                    <p className="text-3xl font-bold">{inventoryStats?.outOfStock}</p>
                </Card>
            </div>
            <div className="flex justify-end items-center gap-x-5">
                <InputField
                    type="text"
                    placeholder="Search by name"
                    className="w-72 bg-white"
                    value={qName}
                    onChange={setqName}
                />
                <SelectField
                    id="category"
                    name="category"
                    className="bg-white text-sm"
                    value={qCategory}
                    onChange={setqCategory}
                >
                    <option value="">All categories</option>
                    {productCategories.map((category) => <option key={category} value={category}>{category}</option>)}
                </SelectField>
                <SelectField
                    id="status"
                    name="status"
                    className="bg-white text-sm"
                    value={qStatus}
                    onChange={setqStatus}
                >
                    <option value="">All stock</option>
                    {productStatus.map((status) => <option key={status} value={status}>{status}</option>)}
                </SelectField>
            </div>
            <Table>
                <Table.Header className="grid-cols-12">
                    {ProductTableHeaders.map(header => <span key={header.label} className={`custom-table-header ${header.span}`}>{header.label}</span>)}
                </Table.Header>
                <Table.Body className="grid-cols-12">
                    {products.map((product, index) =>
                        <ProductTableItem
                            key={product.productId}
                            id={product.productId}
                            name={product.name}
                            category={product.category}
                            price={product.price}
                            oldPrice={product.oldPrice}
                            stock={product.totalStock}
                            rating={product.rating}
                            border={(index === products.length - 1) ? "" : "border-b border-gray-200"}
                        />)}
                </Table.Body>
            </Table>
            <Card className="p-3">
                <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                        {`Showing ${(page - 1) * PAGE_LIMIT + 1}–${Math.min(page * PAGE_LIMIT, productCount)} of ${productCount}`}
                    </p>
                    <div className="flex items-center gap-x-5 text-sm">
                        <Button
                            className="px-2 py-1"
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                        >
                            ← Prev
                        </Button>
                        <p className="font-semibold">Page {page} of {maxPage}</p>
                        <Button
                            className="px-2 py-1"
                            disabled={page === maxPage}
                            onClick={() => setPage(page + 1)}
                        >
                            Next →
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

const ProductTableItem = (props: ProductTableItemProps) => {
    return (
        <>
            <div className={`flex items-center gap-3 col-span-4 ${props.border} p-3`}>
                <NavLink
                    to={`/admin/products/${props.id}`}
                    className="font-semibold hover:underline hover:text-blue-500"
                >
                    {props.name}
                </NavLink>
                {props.oldPrice > 0 && <span className="custom-pill bg-red-200 text-red-800">Sale</span>}

            </div>
            <span className={`col-span-2 ${props.border} p-3`}>{props.category}</span>
            <span className={`col-span-2 ${props.border} p-3`}>
                ₱{props.price.toFixed(2)}&nbsp;
                {props.oldPrice > 0 && <span className="text-sm line-through text-gray-500">₱{props.oldPrice.toFixed(2)}</span>}
            </span>
            <span className={`col-span-2 ${props.border} p-3`}>{props.stock}</span>
            <span className={`col-span-2 ${props.border} p-3`}>{props.rating.toFixed(2)}</span>
        </>
    );
};

export default Products;