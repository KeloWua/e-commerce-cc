import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import testRoutes from './routes/test.routes.js';
import productsRoutes from './routes/products.routes.js';
import ordersRoutes from './routes/orders.routes.js';
import authRoutes from './routes/auth.routes.js';
import paymentsRoutes from './routes/payments.routes.js';
import errorHandler from './middleware/error.middleware.js'
import passport from "./config/passport.js";
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(morgan("dev"));
app.use(passport.initialize());
app.use("/payments", paymentsRoutes);
app.use(express.json());

app.use("/test", testRoutes);

app.use("/products", productsRoutes);
app.use("/auth", authRoutes);
app.use("/orders", ordersRoutes);

app.use(errorHandler)

// Testing normal
app.get("/", (req, res) => {
    res.send("API is running")
});

export default app;