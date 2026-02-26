import pool from "../config/db.js";
import express from 'express';

const router = express.Router();

// Testing Route

router.get("/", (req, res) => {
    res.json({ message: 'Test route working'})
});


export default router;