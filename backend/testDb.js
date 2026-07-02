import pool from "./database/db.js";

async function testDatabase() {
  const result = await pool.query(
    "SELECT * FROM categories"
  );

  console.log(result.rows);
}

testDatabase();