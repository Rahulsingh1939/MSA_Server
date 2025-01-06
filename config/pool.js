const { Pool } = require("pg");
// Database Connection Pool
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
