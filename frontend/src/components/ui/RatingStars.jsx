import { Star } from "lucide-react";

const RatingStars = ({ rating = 0, total = 0, size = "h-4 w-4", showTotal = false }) => {

    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    className={`${size} ${i < Math.round(rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                        }`}
                />
            ))}
            {showTotal && (
                <span className="text-gray-500 text-sm">
                    ({total} reviews)
                </span>
            )}
        </div>
    );
};

export default RatingStars;
