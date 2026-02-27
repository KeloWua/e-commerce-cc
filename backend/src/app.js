import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import testRoutes from './routes/test.routes.js';
import productsRoutes from './routes/products.routes.js';
import authRoutes from './routes/auth.routes.js';
import errorHandler from './middleware/error.middleware.js'
import passport from "./config/passport.js";


const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(passport.initialize());

// Testing route
app.use("/test", testRoutes);
app.use("/products", productsRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler)

// Testing normal
app.get("/", (req, res) => {
    res.send("API is running")
});

export default app;