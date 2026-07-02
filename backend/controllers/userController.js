import { getUserById, updateUserAvatar } from "../services/userService.js";
import { updateAccountData } from "../services/userService.js";

export async function getCurrentUser(req, res) {
  const userId = req.query.userId;

  const result = await getUserById(userId);

  res.json(result);
}

export async function updateAvatar(req, res) {
  const userId = req.body.userId;
  const avatar = req.body.avatar;

  const result = await updateUserAvatar(userId, avatar);

  res.json(result);
}


export async function updateUserProfile(req, res) {
  try {
    const { userId, name, email, currentPassword, newPassword } = req.body;

    const result = await updateAccountData(
      userId,
      name,
      email,
      currentPassword,
      newPassword
    );

    res.json(result);
  } catch (error) {
  console.error("================================");
  console.error(error);
  console.error("================================");

  res.status(500).json({
    success: false,
    message: error.message,
  });
  }
}