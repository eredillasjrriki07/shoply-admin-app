import { useState } from "react";
import Button from "~/components/ui/button-component";
import Card from "~/components/ui/card-component";
import { InputField, SelectField, TextArea } from "~/components/ui/field-component";
import type { ReviewItemProps } from "./product-details.values";
import { Link } from "react-router";

const ProductDetails = () => {
    const [isEditing, setIsEditing] = useState(false);
    return (
        <div className="space-y-5">
            <div className="flex justify-between items-center">
                <div className="space-y-2">
                    <Link to="/admin/products" className="text-xs hover:underline">← Products</Link>
                    <p className="text-2xl font-semibold">Classic Tee</p>
                </div>
                <div className="flex gap-2">
                    <Button className="px-4 py-2">
                        View on store
                    </Button>
                    <Button.Submit
                        className="px-4 py-2"
                        onClick={() => setIsEditing(!isEditing)}
                    >
                        {isEditing ? 'Save Changes' : 'Edit'}
                    </Button.Submit>
                </div>
            </div>
            <div className="flex gap-4">
                <Card className="flex-1">
                    {isEditing ? <EditProductForm /> : <ProductDetailsForm />}
                </Card>
                <Card className="flex-1">
                    <Card.Header>
                        <span className="font-semibold">Review summary</span>
                    </Card.Header>
                    <Card.Body className="space-y-4">
                        <div className="flex items-center gap-5">
                            <div className="flex flex-col items-center">
                                <span className="text-4xl font-bold">4.0</span>
                                <span className="text-amber-600">★★★★☆</span>
                                <span className="text-gray-500">3 reviews</span>
                            </div>
                            <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-5 text-sm text-gray-500">
                                    <span>5★</span>
                                    <div className="flex-1 bg-blue-500 h-2 rounded-full"></div>
                                    <span>1</span>
                                </div>
                                <div className="flex items-center gap-5 text-sm text-gray-500">
                                    <span>4★</span>
                                    <div className="flex-1 bg-blue-500 h-2 rounded-full"></div>
                                    <span>1</span>
                                </div>
                                <div className="flex items-center gap-5 text-sm text-gray-500">
                                    <span>3★</span>
                                    <div className="flex-1 bg-blue-500 h-2 rounded-full"></div>
                                    <span>1</span>
                                </div>
                                <div className="flex items-center gap-5 text-sm text-gray-500">
                                    <span>2★</span>
                                    <div className="flex-1 bg-gray-100 h-2 rounded-full"></div>
                                    <span>0</span>
                                </div>
                                <div className="flex items-center gap-5 text-sm text-gray-500">
                                    <span>1★</span>
                                    <div className="flex-1 bg-gray-100 h-2 rounded-full"></div>
                                    <span>0</span>
                                </div>
                            </div>
                        </div>
                        <hr className="border-gray-200" />
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col bg-gray-100 p-2 rounded-lg">
                                <span className="text-xl font-bold">67%</span>
                                <span className="text-xs text-gray-500">Positive (4-5★)</span>
                            </div>
                            <div className="flex flex-col bg-gray-100 p-2 rounded-lg">
                                <span className="text-xl font-bold">0%</span>
                                <span className="text-xs text-gray-500">Negative (1-2★)</span>
                            </div>
                            <div className="flex flex-col bg-gray-100 p-2 rounded-lg">
                                <span className="text-xl font-bold">3</span>
                                <span className="text-xs text-gray-500">Last 30 days</span>
                            </div>
                            <div className="flex flex-col bg-gray-100 p-2 rounded-lg">
                                <span className="text-xl font-bold">0</span>
                                <span className="text-xs text-gray-500">From Customers</span>
                            </div>
                        </div>
                        <div className="flex justify-between text-gray-500">
                            <p className="uppercase text-sm">Latest Review</p>
                            <p>5/12/2026</p>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold">Riley K.</span>
                                <span className="text-amber-600">★★★★☆</span>
                            </div>
                            <p className="text-gray-500">Works well, looks great. Happy with the purchase.</p>
                        </div>
                    </Card.Body>
                </Card>
            </div>
            <Card className="card">
                <Card.Header>
                    <span className="font-semibold">All reviews</span>
                </Card.Header>
                <Card.Body className="space-y-5">
                    <ReviewItem name="Riley K." date="5/12/2026" rating={4} review="Works well, looks great. Happy with the purchase." />
                    <ReviewItem name="Riley K." date="5/12/2026" rating={3} review="Works well, looks great. Happy with the purchase." />
                </Card.Body>
            </Card>
        </div>
    );
};

const ReviewItem = ({ name, date, rating, review }: ReviewItemProps) => {
    return (
        <div className="border border-gray-200 p-3 rounded-lg">
            <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                    <span className="font-semibold">{name}</span>
                    <span className="text-gray-500">{date}</span>
                </div>
                <span className="text-amber-600">{"★★★★★".slice(0, Math.floor(rating))} <span className="text-gray-500 text-xs">{rating}/5</span></span>
                <p className="text-gray-500">{review}</p>
            </div>
        </div>
    );
};

const ProductDetailsForm = () => {
    return (
        <>
            <Card.Header>
                <span className="font-semibold">Overview</span>
            </Card.Header>
            <Card.Body className="space-y-5">
                <div className="flex items-center gap-4">
                    <div className="relative flex justify-center items-center bg-gray-100 w-40 aspect-square rounded-2xl">
                        <span className="text-6xl">🐳</span>
                        <span className="absolute top-3 left-3 text-sm bg-red-700 text-white font-semibold px-2 py-0.5 rounded">-20%</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-xs uppercase text-gray-500 font-semibold">apparel</span>
                        <div className="flex gap-2 text-gray-500 text-lg font-semibold">
                            <span>₱</span>
                            <span className="text-4xl text-black">24</span>
                            <span>.00</span>
                            <span className="self-end font-light line-through text-sm">₱30.00</span>
                        </div>
                        <div className="flex items-center gap-1 text-green-700 text-sm font-semibold">
                            <div className="flex justify-center items-center w-4 h-4 bg-green-200 rounded-full">
                                <div className="w-2 h-2 bg-green-700 rounded-full" />
                            </div>
                            <span>In stock — 20 units</span>
                        </div>
                        <span className="text-sm"><span className="text-amber-600">★★★★☆</span> <span className="font-semibold">4.5</span> · <span className="text-gray-500">128 listed reviews</span></span>
                    </div>
                </div>
                <hr className="border-gray-200" />
                <div>
                    <span className="text-sm font-semibold uppercase text-gray-500">description</span>
                    <p>Soft cotton tee, mid-weight, pre-shrunk. Cut for everyday wear.</p>
                </div>
                <hr className="border-gray-200" />
                <div className="grid grid-cols-2">
                    <div>
                        <span className="text-sm font-semibold uppercase text-gray-500">Sizes</span>
                        <div className="mt-3 space-x-2">
                            <span className="variant-pill">S</span>
                            <span className="variant-pill">M</span>
                            <span className="variant-pill">L</span>
                            <span className="variant-pill">XL</span>
                        </div>
                    </div>
                    <div>
                        <span className="text-sm font-semibold uppercase text-gray-500">Colors</span>
                        <div className="mt-3 space-x-2">
                            <span className="variant-pill">Black</span>
                            <span className="variant-pill">White</span>
                            <span className="variant-pill">Navy</span>
                        </div>
                    </div>
                </div>
            </Card.Body>
        </>
    );
};

const EditProductForm = () => {
    return (
        <>
            <form>
                <Card.Header>
                    <span className="font-semibold">Edit</span>
                </Card.Header>
                <Card.Body className="space-y-4">
                    <InputField label="Name" />
                    <div className="grid grid-cols-2 gap-3 mb-2">
                        <SelectField label="Category" id="shippingMethod" name="shippingMethod">
                            <option value="1">Apparel</option>
                            <option value="2">Home</option>
                            <option value="3">Tech</option>
                        </SelectField>
                        <InputField label="Stock" type="number" />
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-2">
                        <InputField label="Price" type="number" />
                        <InputField label="Old Price" type="number" />
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <InputField label="Sizes (comma separated)" placeholder="S, M, L" />
                        <div>
                            <InputField label="Colors (comma separated)" placeholder="Black, White" />
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    placeholder="Black, White"
                                    className="mr-1"

                                />
                                <span className="text-sm text-gray-500">Inactive</span>
                            </div>
                        </div>
                    </div>
                    <TextArea label="Description" className="mb-2"></TextArea>
                </Card.Body>
            </form>
        </>
    );
};

export default ProductDetails;