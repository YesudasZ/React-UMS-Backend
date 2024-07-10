import express from "express";
const router = express.Router();
import {
  getDashboard,
  searchUser,
  viewUser,
  deleteUser,
} from "../controllers/adminController.js";
import { protect, verifyAdmin } from "../middleware/authMiddleware.js";

router.get("/getUsers", protect, verifyAdmin, getDashboard);
router.get("/searchUser", protect, verifyAdmin, searchUser);
router.get("/viewUser/:id", protect, verifyAdmin, viewUser);
router.delete("/deleteUser/:id", protect, verifyAdmin, deleteUser);

export default router;
