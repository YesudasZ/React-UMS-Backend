import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const getDashboard = asyncHandler(async (req, res) => {
  const users = await User.find({ isAdmin: false }).select("-password");
  res.status(200).json(users);
});

const searchUser = asyncHandler(async (req, res) => {
  const { query } = req.query;
  const users = await User.find({
    $or: [
      { name: { $regex: query, $options: "i" } },
      { email: { $regex: query, $options: "i" } },
    ],
    isAdmin: false,
  }).select("-password");

  res.json(users);
});

const viewUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { getDashboard, searchUser, viewUser, deleteUser };
