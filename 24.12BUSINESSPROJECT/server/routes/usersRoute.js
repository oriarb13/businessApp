import express from "express";
import {
  TokenValid,
  createUser,
  signInUser,
  logOut,
  getUserByUsername,
  getAllUsers,
  updateUser,
  deleteUser,
  changePlan,
} from "../controllers/usersControllers.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

//  valid
router.get("/validate", verifyToken, TokenValid);

// Sign Up
router.post("/signup", createUser);

// Sign In
router.post("/signin", signInUser);

// Logout
router.post("/logout", logOut);

// user by username
router.get("/:username", getUserByUsername);

//  all users
router.get("/", getAllUsers);

// Update
router.patch("/update", verifyToken, updateUser);

//chane plan
router.patch("/plan", verifyToken, changePlan);

// Delete
router.delete("/delete", verifyToken, deleteUser);

export default router;
