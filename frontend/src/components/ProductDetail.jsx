import { useContext, useState } from "react";
import { useReviews } from "../hooks/useReviews";
import RatingStars from "../components/RatingStars";
import ReviewForm from "./ReviewForm";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../hooks/useCart";
import { createReview } from "../services/reviews";

const ProductDetail = ({ product, reviews: initialReviews }) => {
  const { user } = useContext(AuthContext);
  const { getItemQuantity, isInCart, addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState(initialReviews || []);
  const [postReview, setPostReview] = useState(false);

  const { averageRating, totalReviews } = useReviews(reviews);

  // Detects if user already reviewed
  const userReview = user ? reviews.find(r => r.user_id === user.id) : null;

  const handleSubmitReview = async ({ rating, comment }) => {
    if (!rating || !comment.trim()) return;

    try {
      const payload = {
        productId: product.id,
        rating,
        comment
      };

      const newReview = await createReview(payload);

      setReviews(prev => [newReview, ...prev]);
      setPostReview(false);
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-8">

        {/* Image */}
        <div className="flex-1 flex justify-center items-start">
          <img
            src={product.image_url || "https://picsum.photos/seed/default/500/500"}
            alt={product.name}
            className="rounded-xl shadow-lg max-h-[500px] object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col justify-start gap-4">
          <h1 className="text-4xl font-extrabold text-gray-900">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>

          {/* Price & Stock */}
          <div className="flex items-center gap-4 mt-2">
            <span className="text-2xl font-bold text-indigo-600">${product.price}</span>
            {product.stock > 0 ? (
              <span className="text-sm text-green-600 font-medium">{product.stock} in stock</span>
            ) : (
              <span className="text-sm text-red-600 font-medium">Out of stock</span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-4 mt-2">
            <RatingStars rating={averageRating} total={totalReviews} showTotal={true} />
            <button
              onClick={() => setPostReview(!postReview)}
              disabled={!user}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50 hover:bg-indigo-700 transition"
            >
              {!user ? "Login to review" : userReview ? "Edit your review" : "Write a review"}
            </button>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex items-center gap-4 mt-4">
            <input
              type="number"
              min={1}
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {isInCart(product.id) ? (
              <button
                onClick={() => addToCart(product.id, quantity)}
                disabled={!user || product.stock === 0}
                className="w-full py-3 bg-green-900 text-white font-bold rounded-lg flex items-center justify-center space-x-2 shadow-lg"
              >
                <span className="text-xs">Add more</span>
                <span className="text-xs opacity-60">Qty: {getItemQuantity(product.id) ?? 0}</span>
              </button>
            ) : (
              <button
                onClick={() => addToCart(product.id, quantity)}
                disabled={!user || product.stock === 0}
                className="w-full py-3 bg-gray-900 text-white font-bold rounded-lg flex items-center justify-center space-x-2 shadow-lg"
              >
                <span className="text-xs">Add to Cart</span>
              </button>
            )}
          </div>

          {/* Review Form */}
          {postReview && (
            <div className="mt-6">
              <ReviewForm
                user={user}
                productId={product.id}
                existingReview={userReview}
                onSubmit={handleSubmitReview}
              />
            </div>
          )}

          {/* Reviews List */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Reviews</h2>
            {reviews.length === 0 ? (
              <p className="text-gray-500">No reviews yet. Be the first to review!</p>
            ) : (
              <div className="flex flex-col gap-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border p-4 rounded-lg shadow-sm">
                    <RatingStars rating={review.rating} />
                    <p className="text-gray-700 mt-2">{review.comment}</p>
                    <p className="text-gray-400 text-xs mt-1">By {review.user_name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;