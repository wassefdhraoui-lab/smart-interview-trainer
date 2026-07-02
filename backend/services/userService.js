import pool from "../database/db.js";

export async function getUserById(userId) {
  const result = await pool.query(
    `
      SELECT id, name, email, avatar
      FROM users
      WHERE id = $1
    `,
    [userId]
  );

  if (result.rows.length === 0) {
    return {
      success: false,
      message: "User not found",
    };
  }

  return {
    success: true,
    user: result.rows[0],
  };
}

export async function updateUserAvatar(userId, avatar) {
  const result = await pool.query(
    `
      UPDATE users
      SET avatar = $2
      WHERE id = $1
      RETURNING id, name, email, avatar
    `,
    [userId, avatar]
  );

  return {
    success: true,
    message: "Avatar updated",
    user: result.rows[0],
  };
}

export async function updateAccountData(
  userId,
  name,
  email,
  currentPassword,
  newPassword
) {
  const userResult = await pool.query(
    `
      SELECT *
      FROM users
      WHERE id = $1
    `,
    [userId]
  );

  const user = userResult.rows[0];

  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }

  const cleanCurrentPassword = currentPassword ? currentPassword.trim() : "";
  const cleanNewPassword = newPassword ? newPassword.trim() : "";

  const wantsPasswordChange =
    cleanCurrentPassword.length > 0 || cleanNewPassword.length > 0;

  if (wantsPasswordChange) {
    if (!cleanCurrentPassword || !cleanNewPassword) {
      return {
        success: false,
        message: "Please fill both password fields",
      };
    }

    if (cleanCurrentPassword !== user.password_hash) {
      return {
        success: false,
        message: "Current password is wrong",
      };
    }

    const result = await pool.query(
      `
        UPDATE users
        SET
          name = $2,
          email = $3,
          password_hash = $4
        WHERE id = $1
        RETURNING id, name, email, avatar
      `,
      [userId, name, email, cleanNewPassword]
    );

    return {
      success: true,
      message: "Account updated",
      user: result.rows[0],
    };
  }

  const result = await pool.query(
    `
      UPDATE users
      SET
        name = $2,
        email = $3
      WHERE id = $1
      RETURNING id, name, email, avatar
    `,
    [userId, name, email]
  );

  return {
    success: true,
    message: "Account updated",
    user: result.rows[0],
  };
}