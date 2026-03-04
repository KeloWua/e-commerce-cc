import { useState } from "react";
import { Star } from "lucide-react";

const ReviewForm = ({ user, productId, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!rating || !comment.trim()) return;

    onSubmit({ rating, comment, productId });

    setRating(0);
    setComment("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 p-6 rounded-xl shadow-sm flex flex-col gap-4"
    >
      <h3 className="text-lg font-semibold text-gray-800">
        Write a Review
      </h3>

      {/* Rating selector */}
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => {
          const value = i + 1;

          return (
            <Star
              key={i}
              onClick={() => setRating(value)}
              onMouseEnter={() => setHover(value)}
              onMouseLeave={() => setHover(0)}
              className={`h-6 w-6 cursor-pointer transition-colors ${
                value <= (hover || rating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          );
        })}
      </div>

      {/* Comment */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your thoughts about this product..."
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        rows={4}
      />

      {/* Submit */}
      <button
        type="submit"
        disabled={!user || !rating || !comment.trim()}
        className="self-start px-5 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {!user ? "Login to review" : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;