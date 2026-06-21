import { useEffect, useState } from "react";
import { Link } from "react-router";
import Card from "~/components/ui/card-component";
import { InputField, SelectField, TextArea } from "~/components/ui/field-component";
import { StockCountDefault, StockGridView, StockListView } from "~/components/ui/stock-component";
import TagInput from "~/components/ui/tag-input";


const AddProduct = () => {
    const [sizes, setSizes] = useState<Array<string>>([]);
    const [colors, setColors] = useState<Array<string>>([]);
    const [units, setUnits] = useState<number>(0);

    return (
        <div className="max-w-200 mx-auto space-y-5">
            <div className="flex justify-between items-center">
                <div className="space-y-2">
                    <Link to="/admin/products" className="text-xs hover:underline">← Products</Link>
                    <p className="text-2xl font-bold">Add Product</p>
                </div>
            </div>
            {/* Basics */}
            <Card>
                <Card.Header className="flex justify-between items-center">
                    <span className="font-semibold">Basics</span>
                    <span className="text-sm text-gray-500 font-semibold">How the product shows up in the catalog</span>
                </Card.Header>
                <Card.Body className="space-y-4">
                    <InputField label="Name" />
                    <div className="grid grid-cols-2 gap-3 ">
                        <SelectField label="Category" id="shippingMethod" name="shippingMethod">
                            <option value="1">Apparel</option>
                            <option value="2">Home</option>
                            <option value="3">Tech</option>
                        </SelectField>
                        <InputField label="Stock" type="number" />
                    </div>
                    <TextArea label="Description" className=""></TextArea>
                </Card.Body>
            </Card>
            {/* Pricing */}
            <Card>
                <Card.Header>
                    <span className="font-semibold">Pricing</span>
                </Card.Header>
                <Card.Body>
                    <div className="grid grid-cols-2 gap-3 ">
                        <InputField label="Price" type="number" />
                        <InputField label="Old Price (Optional)" type="number" />
                    </div>
                </Card.Body>
            </Card>
            {/* Variants */}
            <Card>
                <Card.Header className="flex justify-between">
                    <span className="font-semibold">Variants</span>
                    <span className="text-sm text-gray-500 font-semibold">Optional — leave empty for a single-SKU product</span>
                </Card.Header>
                <Card.Body>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm uppercase text-gray-500 font-semibold">sizes</span>
                            <span className="text-xs text-gray-500 ">Press enter or comma to add</span>
                        </div>
                        <TagInput values={sizes} onChange={setSizes} />
                        <hr className="border-gray-200 my-4" />
                        <div className="flex justify-between items-center">
                            <span className="text-sm uppercase text-gray-500 font-semibold">colors</span>
                            <span className="text-xs text-gray-500 ">Press enter or comma to add</span>
                        </div>
                        <TagInput values={colors} onChange={setColors} />
                    </div>
                </Card.Body>
            </Card>
            {/* Stock */}
            <Card>
                <Card.Header className="flex justify-between">
                    <span className="font-semibold">Stock</span>
                    <div className={`flex items-center gap-1 bg-${units ? 'green' : 'gray'}-100 rounded-full px-2 py-1`}>
                        <div className={`flex justify-center items-center bg-${units ? 'green' : 'gray'}-300 rounded-full p-0.75`}>
                            <div className={`w-2 h-2 bg-${units ? 'green' : 'gray'}-500 rounded-full`} />
                        </div>
                        <span className={`text-sm font-semibold text-${units ? 'green' : 'gray'}-700`}>{units || 0} units</span>
                    </div>
                </Card.Header>
                <Card.Body>
                    {/* <StockCountDefault units={units} onChange={setUnits} /> */}
                    <StockGridView sizes={sizes} colors={colors} onUnitsChange={setUnits} />
                </Card.Body>
            </Card>
        </div>
    );
};



export default AddProduct;