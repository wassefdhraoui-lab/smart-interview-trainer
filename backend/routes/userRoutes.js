import express from "express";
import { getCurrentUser, updateAvatar, updateUserProfile, } from "../controllers/userController.js";

const router = express.Router();

router.get("/me", getCurrentUser);
router.patch("/avatar", updateAvatar);
router.patch("/profile", updateUserProfile);

export default router;