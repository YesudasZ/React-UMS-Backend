import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../helpers/upload.js";

router.post("/", upload.single("profilePicture"), registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile/:id", protect,upload.single("profilePicture"), updateUserProfile);

export default router;
