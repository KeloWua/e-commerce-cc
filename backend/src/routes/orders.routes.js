import express from 'express';
import asyncHandler from '../middleware/asyncHandler.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import * as ordersController from '../controllers/orders.controller.js';

const router = express.Router();

/**
 * All order routes require authentication
 */
router.use(authMiddleware);

// Get all orders for the current user
router.get('/', asyncHandler(ordersController.getOrders));

// Get the current pending (cart) order
router.get('/pending', asyncHandler(ordersController.getPendingOrder));

// Get specific order details by ID
router.get('/:orderId', asyncHandler(ordersController.getOrderDetails));

// Add item to the user's cart
router.post('/items', asyncHandler(ordersController.addItemToCart));

// Update the quantity of an item in the user's cart
router.patch('/items/:productId', asyncHandler(ordersController.updateCartItem));

export default router;