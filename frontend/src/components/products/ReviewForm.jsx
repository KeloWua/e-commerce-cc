import { useState, useEffect } from "react";
import { Star } from "lucide-react";

const ReviewForm = ({ user, productId, existingReview, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");

    // Pre-fill if we have an existing review (edit mode)
    useEffect(() => {
        if (existingReview) {
            setRating(existingReview.rating);
            setComment(existingReview.comment);
        }
    }, [existingReview]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!rating || !comment.trim()) return;

        onSubmit({ rating, comment, productId });

        // We don't clear here if we want to keep the "edit" state possible, 
        // but the parent will usually close the form.
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-5 animate-in fade-in slide-in-from-top-4 duration-300"
        >
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-gray-900">
                    {existingReview ? "Update your Review" : "Write a Review"}
                </h3>
                <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => {
                        const value = i + 1;
                        return (
                            <Star
                                key={i}
                                size={24}
                                onClick={() => setRating(value)}
                                onMouseEnter={() => setHover(value)}
                                onMouseLeave={() => setHover(0)}
                                fill={value <= (hover || rating) ? "#fbbf24" : "none"}
                                className={`cursor-pointer transition-all ${value <= (hover || rating) ? "text-yellow-400 scale-110" : "text-gray-300"
                                    }`}
                            />
                        );
                    })}
                </div>
            </div>

            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience with this product..."
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all text-sm resize-none"
                rows={4}
                required
            />

            <button
                type="submit"
                disabled={!user || !rating || !comment.trim()}
                className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all flex items-center justify-center shadow-lg disabled:opacity-50"
            >
                {existingReview ? "Save Changes" : "Submit Review"}
            </button>
        </form>
    );
};

export default ReviewForm;
