import pool from "../database/db.js";

export async function loadDashboardData(userId) {
    const userResult = await pool.query(
        "SELECT * FROM users WHERE id = $1", 
        [userId]
    );
    const user = userResult.rows[0];

    return {
        success: true,
        user: {
            name: user.name,
            avatar: user.avatar
        },
        
    };
}