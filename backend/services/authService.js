import pool from "../database/db.js";

export async function checkLogin(email, password) {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (result.rows.length === 0) {
    return {
      success: false,
      message: "Invalid email or password",
    };
  }

  const user = result.rows[0];

  if (user.password_hash !== password) {
    return {
      success: false,
      message: "Invalid email or password",
    };
  }

  return {
    success: true,
    message: "Login successful",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    },
  };
}