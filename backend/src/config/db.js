import { Pool } from 'pg';

const pool = new Pool(
  process.env.DATABASE_URL
    ? {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    }
    : {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432
    }
)

pool.connect()
  .then(client => {
    console.log("✅ DB CONNECTED");
    client.release();
  })
  .catch(err => {
    console.error("❌ DB CONNECTION ERROR:", err);
  });

export default pool;