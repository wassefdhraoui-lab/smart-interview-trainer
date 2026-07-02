import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "smart_interview_trainer",
  user: "postgres",
  password: "abe5b161ba",
});

export default pool;