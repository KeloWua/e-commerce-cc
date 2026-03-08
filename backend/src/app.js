import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import passport from "./config/passport.js";

// Routes imports
import authRoutes from './routes/auth.routes.js';
import productsRoutes from './routes/products.routes.js';
import ordersRoutes from './routes/orders.routes.js';
import paymentsRoutes from './routes/payments.routes.js';
import contactRoutes from './routes/contact.routes.js';
import testRoutes from './routes/test.routes.js';

// Middleware imports
import errorHandler from './middleware/error.middleware.js';

const app = express();

// use Https from Render
app.set('trust proxy', 1);

/**
 * Global Middlewares
 */

// CORS configuration: allows production URL and local development
const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:5173',
    'http://127.0.0.1:5173'
].filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.use(cookieParser());
app.use(morgan("dev"));
app.use(passport.initialize());

/**
 * Payment routes 
 * NOTE: Stripe webhooks require the RAW body, so we mount this 
 * route BEFORE the global express.json() parser.
 */
app.use("/payments", paymentsRoutes);

// Global JSON processing for other routes
app.use(express.json());

/**
 * API Route Mounting
 */
app.use("/auth", authRoutes);
app.use("/products", productsRoutes);
app.use("/orders", ordersRoutes);
app.use('/contact', contactRoutes);
app.use("/test", testRoutes);

/**
 * Health Check & Base Route
 */
app.get("/", (req, res) => {
    res.json({ ok: true, message: "Vad.er API is running smoothly 🚀" });
});

/**
 * Error Handling (Always last)
 */
app.use(errorHandler);

export default app;