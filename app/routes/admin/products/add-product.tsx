import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Button from "~/components/ui/button-component";
import Card from "~/components/ui/card-component";
import { InputField, SelectField, TextArea } from "~/components/ui/field-component";
import { StockCountDefault, StockGridView, StockListView } from "~/components/ui/stock-component";
import TagInput from "~/components/ui/tag-input";
import { productCategories } from "~/lib/constants/constants";
import type { CreateProduct, ProductVariant } from "./types";
import { generateSku } from "~/lib/helpers/helpers";
import { api } from "~/lib/api";
import { useDispatch } from "react-redux";
import { AxiosError } from "axios";
import { errorToast, successToast } from "~/lib/util/shoply-toast";
import { addProduct } from "./slice/productsViewSlice";


const AddProduct = () => {
    const navigate = useNavigate();
    const [name, setName] = useState<string>("");
    const [category, setCategory] = useState<string>("Apparel");
    const [image, setImage] = useState<string>("/img/sample-img.jpg");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [oldPrice, setOldPrice] = useState<number>(0);
    const [sizes, setSizes] = useState<Array<string>>([]);
    const [colors, setColors] = useState<Array<string>>([]);
    const [units, setUnits] = useState<number>(0);
    const [listStocks, setListStocks] = useState<Record<string, number>>({});
    const [gridStocks, setGridStocks] = useState<Record<string, Record<string, number>>>({});
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const dispatch = useDispatch();

    async function handleProductSave() {
        setSubmitting(true);

        try {

            if (!name) throw new Error('Name is required.');
            if (!description) throw new Error('Description is required.');
            if (price < 0) throw new Error('Price must be a non-negative number.');
            if (oldPrice < 0) throw new Error('Old price must be a non-negative number.');

            const newProduct: CreateProduct = {
                name,
                category,
                price,
                oldPrice,
                imageUrl: "/img/sample-img.jpg",
                description,
                sizes: sizes.map(size => ({ value: size })),
                colors: colors.map(color => ({ value: color })),
            };

            const variants: ProductVariant[] = [];

            if (sizes.length === 0 && colors.length === 0) {

                variants.push({
                    sku: generateSku(name),
                    stocks: units,
                });

            } else if (sizes.length > 0 && colors.length > 0) {

                Object.entries(gridStocks).map(([stockColor, stockSizes]) => {
                    Object.entries(stockSizes).map(([stockSize, stockCount]) => variants.push({
                        sku: generateSku(name, stockSize, stockColor),
                        size: stockSize,
                        color: stockColor,
                        stocks: stockCount
                    }));
                });

            } else {

                Object.entries(listStocks).map(([variant, value]) => variants.push({
                    sku: generateSku(name, variant),
                    [sizes.length > 0 && colors.length === 0 ? 'size' : 'color']: variant,
                    stocks: value,
                }));

            }

            newProduct.variants = variants;

            const { data } = await api.post('/products/create', newProduct);

            dispatch(addProduct(data.data));

            successToast('Successfully created product!');

            navigate(`/admin/products/${data.data.productId}`, { replace: true });

        } catch (error) {
            if (error instanceof AxiosError) {
                errorToast(error.response?.data.message);
            } else if (error instanceof Error) {
                setError(error.message)
            }
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="max-w-200 mx-auto space-y-5">
            <div className="flex justify-between items-center ">
                <div className="space-y-2">
                    <Link to="/admin/products" className="text-xs hover:underline">← Products</Link>
                    <p className="text-2xl font-bold">Add Product</p>
                </div>
            </div>
            {
                error && <div className="bg-red-50 rounded-md py-2 px-3 border border-red-300">
                    <span className="text-red-600 text-sm">{error}</span>
                </div>
            }
            {/* Basics */}
            <Card>
                <Card.Header className="flex justify-between items-center">
                    <span className="font-semibold">Basics</span>
                    <span className="text-sm text-gray-500 font-semibold">How the product shows up in the catalog</span>
                </Card.Header>
                <Card.Body className="space-y-4">
                    <InputField
                        label="Name"
                        type="text"
                        value={name}
                        onChange={setName}
                    />
                    <div className="grid grid-cols-2 gap-3 ">
                        <SelectField
                            label="Category"
                            id="category"
                            name="category"
                            className="bg-white text-sm"
                            value={category}
                            onChange={setCategory}
                        >
                            {productCategories.map((category) => <option key={category} value={category}>{category}</option>)}
                        </SelectField>
                        <InputField
                            label="Image"
                            type="text"
                            value={image}
                            onChange={setImage}
                        />
                    </div>
                    <TextArea
                        label="Description"
                        className=""
                        value={description}
                        onChange={setDescription}
                    />
                </Card.Body>
            </Card>
            {/* Pricing */}
            <Card>
                <Card.Header>
                    <span className="font-semibold">Pricing</span>
                </Card.Header>
                <Card.Body>
                    <div className="grid grid-cols-2 gap-3 ">
                        <InputField
                            label="Price"
                            type="number"
                            value={price}
                            onChange={setPrice}
                        />
                        <InputField
                            label="Old Price (Optional)"
                            type="number"
                            value={oldPrice}
                            onChange={setOldPrice}
                        />
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
                    {sizes.length === 0 && colors.length === 0
                        ? <StockCountDefault units={units} onUnitsChange={setUnits} />
                        : sizes.length > 0 && colors.length === 0
                            ? <StockListView
                                variants={sizes}
                                onUnitsChange={setUnits}
                                stocks={listStocks}
                                onStocksChange={setListStocks}
                            />
                            : sizes.length === 0 && colors.length > 0
                                ? <StockListView
                                    variants={colors}
                                    onUnitsChange={setUnits}
                                    stocks={listStocks}
                                    onStocksChange={setListStocks}
                                />
                                : <StockGridView
                                    sizes={sizes}
                                    colors={colors}
                                    onUnitsChange={setUnits}
                                    stocks={gridStocks}
                                    onStocksChange={setGridStocks}
                                />
                    }
                </Card.Body>
            </Card>
            <div className="flex justify-end gap-x-2">
                <Button
                    className="px-3 py-2 font-semibold text-sm"
                    disabled={submitting}
                    onClick={() => navigate(-1)}
                >
                    Cancel
                </Button>
                <Button.Submit
                    className="px-3 py-2 font-semibold text-sm"
                    disabled={submitting}
                    onClick={handleProductSave}
                >
                    {submitting ? 'Saving...' : 'Save product'}
                </Button.Submit>
            </div>
        </div>
    );
};



export default AddProduct;