import pool from "./db.js";

(async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("CONNECTED:", res.rows);
  } catch (err) {
    console.error("DB ERROR FULL:", err);
  }
})();