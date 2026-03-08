import api from "./api";

/**
 * Crea un review para un producto
 * @param {Object} params
 * @param {number} params.productId
 * @param {number} params.rating
 * @param {string} params.comment
 * @returns {Object} review creado
 */
export const createReview = async ({ productId, rating, comment }) => {
    try {
        const res = await api.post(`/products/${productId}/review`, {
            rating,
            comment
        });

        return res.data; // review creado
    } catch (err) {
        console.error("Error creando review:", err.response?.data || err.message);
        throw err;
    }
};
