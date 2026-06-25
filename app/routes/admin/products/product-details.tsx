import { useEffect, useState } from "react";
import Button from "~/components/ui/button-component";
import Card from "~/components/ui/card-component";
import { InputField, SelectField, TextArea } from "~/components/ui/field-component";
import type { ProductDetailsProps, RatingBarProps, ReviewItemProps } from "./product-details.values";
import { Link, useParams } from "react-router";
import { api } from "~/lib/api";
import { useDispatch } from "react-redux";
import { setLoading, setSelectedProduct, updateSelectedProduct } from "./slice/productSlice";
import { useAppSelector } from "~/store";
import type { ReviewSummary, ReviewList } from "./types";
import { AxiosError } from "axios";
import { errorToast, successToast } from "~/lib/util/shoply-toast";
import { formatDate, getSalePercentage, getStars } from "~/lib/helpers/helpers";
import { PAGE_LIMIT, productCategories } from "~/lib/constants/constants";
import { PageComponent } from "~/components/ui/page-component";

const ProductDetails = () => {
    const [isViewing, setIsViewing] = useState(false);
    const product = useAppSelector((state) => state.product.selectedProduct);
    const loading = useAppSelector((state) => state.product.loading);
    const dispatch = useDispatch();
    const [reviewSummary, setReviewSummary] = useState<ReviewSummary>();
    const [reviewList, setReviewList] = useState<ReviewList>();
    const [page, setPage] = useState<number>(1);

    const { id } = useParams();

    const reviewCount = reviewList?.count!;

    const maxPage = Math.max(1, Math.ceil(reviewCount / PAGE_LIMIT));

    useEffect(() => {
        async function getProductDetailsAndReviews() {
            try {
                dispatch(setLoading(true));

                const product = await api.get(`/products/${id}`);

                dispatch(setSelectedProduct(product.data.data));

                const reviewSummary = await api.get(`/reviews/product/summary/${id}`);

                setReviewSummary(reviewSummary.data.data);

            } catch (error) {

                if (error instanceof AxiosError) {
                    errorToast(error.response?.data.message)
                } else if (error instanceof Error) {
                    errorToast(error.message);
                }

            } finally {
                dispatch(setLoading(false));
            }
        }

        getProductDetailsAndReviews();

    }, []);

    useEffect(() => {
        async function getProductReviews() {
            try {

                const allReviews = await api.get('/reviews/product', {
                    params: { page, productId: id }
                });

                setReviewList(allReviews.data.data);

            } catch (error) {

                if (error instanceof AxiosError) {
                    errorToast(error.response?.data.message)
                } else if (error instanceof Error) {
                    errorToast(error.message);
                }
            }
        }

        getProductReviews();
    }, [page])

    return loading ?
        (<div className="w-full h-full flex items-center justify-center">Loading product...</div>)
        : (
            <div className="space-y-5">
                <div className="flex justify-between items-center">
                    <div className="space-y-2">
                        <Link to="/admin/products" className="text-xs hover:underline">← Products</Link >
                        <p className="text-2xl font-semibold">{product?.name}</p>
                    </div >
                    <div className="flex gap-2">
                        <Button className="px-4 py-2">
                            View on store
                        </Button>
                        {!isViewing &&
                            <Button.Submit
                                className="px-4 py-2"
                                onClick={() => setIsViewing(!isViewing)}
                            >
                                Edit
                            </Button.Submit>
                        }

                    </div>
                </div >
                <div className="flex gap-4">
                    <Card className="flex-1">
                        {isViewing ? <EditProductForm product={product!} setIsViewing={setIsViewing} /> : <ProductDetailsForm product={product} />}
                    </Card>
                    <Card className="flex-1">
                        <Card.Header>
                            <span className="font-semibold">Review summary</span>
                        </Card.Header>
                        <Card.Body className="space-y-4">
                            <div className="flex items-center gap-5">
                                <div className="flex flex-col items-center">
                                    <span className="text-4xl font-bold">{reviewSummary?.summary.averageRating.toFixed(1)}</span>
                                    <span className="text-amber-600">{getStars(reviewSummary?.summary.averageRating!)}</span>
                                    <span className="text-gray-500">{reviewSummary?.summary.totalReviews} reviews</span>
                                </div>
                                <div className="flex-1 space-y-2">
                                    {(["fiveStar", "fourStar", "threeStar", "twoStar", "oneStar"] as const).map((star, index, array) =>
                                        <div key={star + index} className="flex items-center gap-5 text-sm text-gray-500">
                                            <span>{array.length - index}★</span>
                                            <RatingBar key={star} ratingCount={reviewSummary?.summary[star]!} reviewTotal={reviewSummary?.summary.totalReviews!} />
                                            <span>{reviewSummary?.summary[star]}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <hr className="border-gray-200" />
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col bg-gray-100 p-2 rounded-lg">
                                    <span className="text-xl font-bold">{reviewSummary?.summary.positivePercent}%</span>
                                    <span className="text-xs text-gray-500">Positive (4-5★)</span>
                                </div>
                                <div className="flex flex-col bg-gray-100 p-2 rounded-lg">
                                    <span className="text-xl font-bold">{reviewSummary?.summary.negativePercent}%</span>
                                    <span className="text-xs text-gray-500">Negative (1-2★)</span>
                                </div>
                            </div>
                            {reviewSummary?.latestReview &&
                                <>
                                    <div className="flex justify-between text-gray-500">
                                        <p className="uppercase text-sm">Latest Review</p>
                                        <p>{formatDate(reviewSummary?.latestReview.createdAt!)}</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold">{reviewSummary?.latestReview.user.firstName} {reviewSummary?.latestReview.user.lastName}</span>
                                            <span className="text-amber-600">{getStars(reviewSummary?.latestReview.rating!)}</span>
                                        </div>
                                        <p className="text-gray-500">{reviewSummary?.latestReview.comment}</p>
                                    </div>
                                </>
                            }
                        </Card.Body>
                    </Card>
                </div>
                <Card className="card">
                    <Card.Header>
                        <span className="font-semibold">All reviews</span>
                    </Card.Header>
                    <Card.Body className="space-y-5">
                        {reviewList?.reviews.map(review =>
                            <ReviewItem
                                key={review.id}
                                name={`${review.user.firstName} ${review.user.lastName}`}
                                date={formatDate(review.createdAt!)}
                                rating={review.rating}
                                review={review.comment}
                            />
                        )}
                    </Card.Body>
                </Card>
                <PageComponent count={reviewCount} page={page} setPage={setPage} />
            </div >
        );
};

const RatingBar = ({ ratingCount, reviewTotal }: RatingBarProps) => {
    const percent = reviewTotal > 0 ? (ratingCount / reviewTotal) * 100 : 0;

    return (
        <div className="flex-1 h-2 rounded-full bg-gray-100">
            <div
                className="h-2 rounded-full bg-blue-500"
                style={{ width: `${percent}%` }}
            />
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

const ProductDetailsForm = ({ product }: ProductDetailsProps) => {

    const units = product?.productVariants.reduce((acc, curr) => acc + curr.stocks, 0) || 0;

    return (
        <>
            <Card.Header>
                <span className="font-semibold">Overview</span>
            </Card.Header>
            <Card.Body className="space-y-5">
                <div className="flex items-center gap-4">
                    <div className="relative flex justify-center items-center bg-gray-100 w-40 aspect-square rounded-2xl">
                        <span className="text-6xl">🖼️</span>
                        {product?.oldPrice ? (
                            product?.price < product.oldPrice &&
                            <span className="absolute top-3 left-3 text-sm bg-red-700 text-white font-semibold px-2 py-0.5 rounded">{getSalePercentage(product.price, product.oldPrice)}%</span>
                        ) : null}
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-xs uppercase text-gray-500 font-semibold">{product?.category}</span>
                        <div className="flex gap-2 text-gray-500 text-lg font-semibold">
                            <span>₱</span>
                            <span className="text-4xl text-black">{product?.price}</span>
                            <span>.00</span>
                            {product?.oldPrice ? (<span className="self-end font-light line-through text-sm">₱{product.oldPrice}</span>) : null}

                        </div>
                        <StockStatusComponent units={units} />
                        <span className="text-sm"><span className="text-amber-600">★★★★☆</span> <span className="font-semibold">4.5</span> · <span className="text-gray-500">128 listed reviews</span></span>
                    </div>
                </div>
                <hr className="border-gray-200" />
                <div>
                    <span className="text-sm font-semibold uppercase text-gray-500">description</span>
                    <p>{product?.description}</p>
                </div>
                <hr className="border-gray-200" />
                <div className="grid grid-cols-2">
                    {product?.sizes?.length ? (
                        < div >
                            <span className="text-sm font-semibold uppercase text-gray-500">Sizes</span>
                            <div className="mt-3 space-x-2">
                                {product.sizes.map(size => <span key={size.id} className="variant-pill">{size.value}</span>)}
                            </div>
                        </div>
                    ) : null}
                    {product?.colors?.length ? (
                        <div>
                            <span className="text-sm font-semibold uppercase text-gray-500">Colors</span>
                            <div className="mt-3 space-x-2">
                                {product.colors.map(color => <span key={color.id} className="variant-pill">{color.value}</span>)}
                            </div>
                        </div>
                    ) : null}
                </div>
            </Card.Body >
        </>
    );
};

const StockStatusComponent = ({ units }: { units: number }) => {
    const styles =
        units === 0
            ? { text: 'text-red-700', ring: 'bg-red-200', dot: 'bg-red-700', label: 'Out of stock' }
            : units < 5
                ? { text: 'text-orange-700', ring: 'bg-orange-200', dot: 'bg-orange-700', label: 'Low stock' }
                : { text: 'text-green-700', ring: 'bg-green-200', dot: 'bg-green-700', label: 'In stock' };

    return (
        <div className={`flex items-center gap-1 text-sm font-semibold ${styles.text}`}>
            <div className={`flex justify-center items-center w-4 h-4 rounded-full ${styles.ring}`}>
                <div className={`w-2 h-2 rounded-full ${styles.dot}`} />
            </div>
            <span>{styles.label} — {units}</span>
        </div>
    );
};

const EditProductForm = ({ product, setIsViewing }: ProductDetailsProps) => {

    const [name, setName] = useState<string>(product?.name!);
    const [category, setCategory] = useState<string>(product?.category!);
    const [image, setImage] = useState<string>(product?.imageUrl!);
    const [description, setDescription] = useState<string>(product?.description!);
    const [price, setPrice] = useState<number>(product?.price!);
    const [oldPrice, setOldPrice] = useState<number>(product?.oldPrice!);
    const [active, setActive] = useState<boolean>(product?.isActive!);
    const dispatch = useDispatch();
    const loading = useAppSelector((state) => state.product.loading);

    async function handleSaveChanges() {
        try {

            dispatch(setLoading(true));

            const productUpdate = {
                name,
                category,
                imageUrl: image,
                description,
                price,
                oldPrice,
                isActive: active,
            };

            const response = await api.patch(`/products/update/${product?.id}`, productUpdate);

            dispatch(updateSelectedProduct(response.data.data));

            setIsViewing?.(false);

            successToast('Updated product successfully!');
        } catch (error) {

            if (error instanceof AxiosError) {
                errorToast(error.response?.data.message)
            } else if (error instanceof Error) {
                errorToast(error.message);
            }

        } finally {
            dispatch(setLoading(false));
        }
    }

    return (
        <>
            <Card.Header>
                <span className="font-semibold">Edit</span>
            </Card.Header>
            <Card.Body className="space-y-4">
                <InputField
                    label="Name"
                    value={name}
                    onChange={setName}
                />
                <div className="grid grid-cols-2 gap-3 mb-2">
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
                <div className="grid grid-cols-2 gap-3 mb-2">
                    <InputField
                        label="Price"
                        type="number"
                        value={price}
                        onChange={setPrice}
                    />
                    <InputField
                        label="Old Price"
                        type="number"
                        value={oldPrice}
                        onChange={setOldPrice}
                    />
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                    {product?.sizes.length ? (
                        <InputField
                            label="Sizes (comma separated)"
                            readonly={true}
                            value={product?.sizes.map(size => size.value).join(',')}
                        />
                    ) : null}
                    <div>
                        {product?.colors.length ? (
                            <InputField
                                label="Colors (comma separated)"
                                readonly={true}
                                value={product?.colors.map(color => color.value).join(', ')}
                            />
                        ) : null}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                className="mr-1"
                                checked={!active} // Negation since the label is 'Inactive'
                                onChange={() => setActive(!active)}
                            />
                            <span className="text-sm text-gray-500">Inactive</span>
                        </div>
                    </div>
                </div>
                <TextArea
                    label="Description"
                    value={description}
                    onChange={setDescription}
                />
                <div className="flex items-center justify-end gap-x-4 text-sm">
                    <Button
                        className="px-2 py-1"
                        onClick={() => setIsViewing?.(false)}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button.Submit
                        className="px-2 py-1"
                        onClick={handleSaveChanges}
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Apply'}
                    </Button.Submit>
                </div>
            </Card.Body>
        </>
    );
};

export default ProductDetails;