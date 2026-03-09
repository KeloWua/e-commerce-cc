import { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useReviews } from "../../hooks/useReviews";
import RatingStars from "../ui/RatingStars";
import ReviewForm from "./ReviewForm";
import { AuthContext } from "../../context/AuthContext";
import { useCart } from "../../hooks/useCart";
import { createReview } from "../../services/review.service";
import { ProductsContext } from "../../context/ProductsContext";
import RelatedProductsCarousel from "./RelatedProductCarousel";
import { ShoppingBag, ChevronRight, Star, Clock, User as UserIcon } from "lucide-react";

const ProductDetail = ({ product, reviews: initialReviews }) => {
    const { user } = useContext(AuthContext);
    const { getItemQuantity, isInCart, addToCart } = useCart();
    const { products } = useContext(ProductsContext);

    const [quantity, setQuantity] = useState(1);
    const [reviews, setReviews] = useState(initialReviews || []);
    const [postReview, setPostReview] = useState(false);
    const { averageRating, totalReviews } = useReviews(reviews);

    // Find if current user already reviewed this
    const userReview = user ? reviews.find(r => r.user_id === user.id) : null;

    const handleSubmitReview = async ({ rating, comment }) => {
        try {
            const newReview = await createReview({
                productId: product.id,
                rating,
                comment
            });

            // Update local reviews list
            setReviews(prev => {
                const filtered = prev.filter(r => r.user_id !== user.id);
                // Backend returns the review object, but we need to ensure it has the user name for display
                return [{ ...newReview, user_name: user.name }, ...filtered];
            });

            setPostReview(false);
        } catch (err) {
            console.error(err);
        }
    };

    const prevProductId = useRef(product.id);

    useEffect(() => {
        if (prevProductId.current !== product.id) {
            window.scrollTo({ top: 0, behavior: "instant" });
            setReviews(initialReviews || []);
            setQuantity(1);
            setPostReview(false);
            prevProductId.current = product.id;
        }
    }, [product.id, initialReviews]);

    return (
        <div className="min-h-screen bg-gray-50/30 dark:bg-gray-950 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-8">
                    <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</Link>
                    <ChevronRight size={12} />
                    <Link to="/products" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Shop</Link>
                    <ChevronRight size={12} />
                    <span className="text-gray-900 dark:text-gray-100">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                    {/* Product Image */}
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-[2rem] blur-2xl group-hover:bg-indigo-500/10 dark:group-hover:bg-indigo-500/20 transition-all duration-500"></div>
                        <div className="relative bg-white dark:bg-gray-900 p-4 rounded-[2rem] shadow-2xl border border-white/40 dark:border-gray-800 overflow-hidden">
                            <img
                                src={product.image_url || "https://picsum.photos/seed/default/800/800"}
                                alt={product.name}
                                className="w-full aspect-square object-cover rounded-2xl transform hover:scale-105 transition-transform duration-700 dark-force"
                            />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <div className="mb-6">
                            <span className="inline-block px-3 py-1 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-full mb-3">
                                {product.category_name || "Premium Collection"}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-4">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-4">
                                <RatingStars rating={averageRating} total={totalReviews} showTotal={true} />
                            </div>
                        </div>

                        <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-8 font-medium">
                            {product.description}
                        </p>

                        <div className="flex items-baseline gap-4 mb-8">
                            <span className="text-4xl font-black text-gray-900 dark:text-white">${product.price}</span>
                            {product.stock > 0 ? (
                                <span className="text-sm font-bold text-green-500 flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                    {product.stock} units available
                                </span>
                            ) : (
                                <span className="text-sm font-bold text-red-500 italic">Currently sold out</span>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                            <div className="flex items-center gap-3 bg-white dark:bg-gray-900 p-3 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                                <div className="flex bg-gray-50 dark:bg-gray-800 rounded-xl">
                                    <button
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                        className="w-10 h-10 flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold"
                                    >-</button>
                                    <span className="w-10 flex items-center justify-center font-black text-gray-900 dark:text-gray-100">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                                        className="w-10 h-10 flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold"
                                    >+</button>
                                </div>
                                <div className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-tighter">Quantity</div>
                            </div>

                            <button
                                onClick={() => addToCart(product.id, quantity)}
                                disabled={!user || product.stock === 0}
                                className={`flex-1 py-4 font-black rounded-2xl flex items-center justify-center gap-3 shadow-xl transition-all active:scale-95 ${isInCart(product.id)
                                    ? "bg-green-600 hover:bg-green-700 text-white"
                                    : "bg-gray-900 hover:bg-black text-white"
                                    } disabled:opacity-50`}
                            >
                                <ShoppingBag size={20} />
                                {isInCart(product.id) ? "Add more" : "Add to Cart"}
                                {!user && <span className="text-[10px] opacity-70">(Login required)</span>}
                            </button>
                        </div>

                        {/* Review Action */}
                        <div className="border-t border-gray-100 pt-8 mt-4">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-black text-gray-900">Community Reviews</h3>
                                {user ? (
                                    <button
                                        onClick={() => setPostReview(!postReview)}
                                        className="text-sm font-black text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-widest underline decoration-2 underline-offset-4"
                                    >
                                        {userReview ? "Edit your review" : "Write a review"}
                                    </button>
                                ) : (
                                    <Link to="/login" className="text-sm font-black text-gray-400 hover:text-indigo-600 transition-colors uppercase tracking-widest underline decoration-2 underline-offset-4">
                                        Login to review
                                    </Link>
                                )}
                            </div>

                            {postReview && user && (
                                <div className="mb-10">
                                    <ReviewForm
                                        user={user}
                                        productId={product.id}
                                        existingReview={userReview}
                                        onSubmit={handleSubmitReview}
                                    />
                                </div>
                            )}

                            <div className="space-y-4">
                                {reviews.length === 0 ? (
                                    <div className="text-center py-10 bg-white rounded-[2rem] border border-dashed border-gray-200">
                                        <Star className="mx-auto text-gray-200 mb-2" size={32} />
                                        <p className="text-gray-400 font-bold">No reviews yet. Be the first!</p>
                                    </div>
                                ) : (
                                    reviews.map((review) => (
                                        <div key={review.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-indigo-100 transition-all group">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                                                        <UserIcon size={14} />
                                                    </div>
                                                    <span className="font-bold text-gray-900 text-sm">{review.user_name}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                                                    <Clock size={12} />
                                                    {new Date(review.created_at || Date.now()).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <RatingStars rating={review.rating} size={14} />
                                            <p className="text-gray-500 text-sm mt-3 leading-relaxed font-medium">
                                                {review.comment}
                                            </p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products Section */}
                <div className="mt-24">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-3xl font-black text-gray-900">You might also like</h2>
                        <Link to="/products" className="text-sm font-black text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-2">
                            View All <ChevronRight size={16} />
                        </Link>
                    </div>
                    <RelatedProductsCarousel products={products} />
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
