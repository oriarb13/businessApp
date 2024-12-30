import express from "express";
import {
  getReviewsByBusinessId,
  createReview,
  deleteReview,
} from "../controllers/reviewController.js";

import verifyToken from "../middleware/auth.js";

const router = express.Router();

// Get all reviews by business ID
router.get("/post/:id", getReviewsByBusinessId);

// Create a new review
router.post("/", verifyToken, createReview);

// Delete a review by ID
router.delete("/:id", verifyToken, deleteReview);

export default router;
