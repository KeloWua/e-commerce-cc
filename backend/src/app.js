import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import testRoutes from './routes/test.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Testing route
app.use("/test", testRoutes);

// Testing normal
app.get("/", (req, res) => {
    res.send("API is running")
});

export default app;