import express from 'express';
import asyncHandler from "../middleware/asyncHandler.js";
import { authMiddleware, requireRole } from "../middleware/auth.middleware.js";
import * as productsController from "../controllers/products.controller.js";

const router = express.Router();

/**
 * Public Routes
 */

// Get all products with filters
router.get("/", asyncHandler(productsController.getProducts));

// Get all product categories
router.get("/categories", asyncHandler(productsController.getCategories));

// Get single product details by its ID
router.get("/:id", asyncHandler(productsController.getProductById));

/**
 * Protected Routes (Authentication Required)
 */

// User can review a product
router.post('/:productId/review', authMiddleware, asyncHandler(productsController.createOrUpdateReview));

/**
 * Admin Routes (Admin Role Required)
 */

// Admin can create a new product
router.post("/", authMiddleware, requireRole("admin"), asyncHandler(productsController.createProduct));

export default router;