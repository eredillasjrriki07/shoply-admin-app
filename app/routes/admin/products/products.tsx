import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import Button from "~/components/ui/button-component";
import { InputField, SelectField, TextArea } from "~/components/ui/field-component";
import Modal from "~/components/ui/modal";
import Table from "~/components/ui/table-component";
import { ProductTableHeaders, type ProductTableItemProps } from "./product.values";

const Products = () => {

    const [isAddProductOpen, setIsAddProductOpen] = useState(false);
    const navigate = useNavigate();

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
            <Table>
                <Table.Header className="grid-cols-12">
                    {ProductTableHeaders.map(header => <span key={header.label} className={`custom-table-header ${header.span}`}>{header.label}</span>)}
                </Table.Header>
                <Table.Body className="grid-cols-12">
                    <ProductTableItem name="Classic Tee" category="Apparel" price={24} stock={20} rating={4.5} />
                </Table.Body>
            </Table>
            <Modal
                open={isAddProductOpen}
                onClose={() => setIsAddProductOpen(false)}
                title="Add product"
            >
                <AddProductForm />
            </Modal>
        </div>
    );
};

const AddProductForm = () => {
    return (
        <form className="space-y-3">
            <InputField label="Name" />
            <div className="grid grid-cols-2 gap-3 ">
                <SelectField label="Category" id="shippingMethod" name="shippingMethod">
                    <option value="1">Apparel</option>
                    <option value="2">Home</option>
                    <option value="3">Tech</option>
                </SelectField>
                <InputField label="Stock" type="number" />
            </div>
            <div className="grid grid-cols-2 gap-3 ">
                <InputField label="Price" type="number" />
                <InputField label="Old Price" type="number" />
            </div>
            <TextArea label="Description" className=""></TextArea>
            <div className="grid grid-cols-2 gap-3">
                <InputField label="Sizes (comma separated)" placeholder="S, M, L" />
                <InputField label="Colors (comma separated)" placeholder="Black, White" />
            </div>
            <div className="flex justify-end gap-3 mt-4">
                <Button className="px-4 py-2">
                    Cancel
                </Button>
                <Button.Submit className="px-4 py-2">
                    Save Product
                </Button.Submit>
            </div>
        </form>
    );
};

const ProductTableItem = ({ name, category, price, stock, rating }: ProductTableItemProps) => {
    return (
        <>
            <div className="flex items-center gap-3 col-span-4">
                <NavLink
                    to={'/admin/products/1'}
                    className="font-semibold hover:underline hover:text-blue-500"
                >
                    {name}
                </NavLink>
                <span className="custom-pill bg-red-200 text-red-800">Sale</span>
            </div>
            <span className="col-span-2">{category}</span>
            <span className="col-span-2">₱{price.toFixed(2)} <span className="text-sm line-through text-gray-500">₱30.00</span></span>
            <span className="col-span-2">{stock}</span>
            <span className="col-span-2">{rating}</span>
        </>
    );
};

export default Products;