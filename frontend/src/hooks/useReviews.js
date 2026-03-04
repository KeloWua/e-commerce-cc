// hooks/useReviews.js
import { useMemo } from "react";

export const useReviews = (reviews = []) => {

  const averageRating = useMemo(() => {
    if (!reviews.length) return 0;

    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return total / reviews.length;
  }, [reviews]);

  return {
    averageRating,
    totalReviews: reviews.length
  };
};