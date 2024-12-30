import { Review } from "../models/reviewModel.js";
import { Business } from "../models/businessesModel.js";

// reviews by business ID
export const getReviewsByBusinessId = async (req, res) => {
  const { id: businessId } = req.params;

  try {
    const reviews = await Review.find({ businessId }).populate(
      "userId",
      "username image"
    );
    if (!reviews.length) {
      return res
        .status(404)
        .json({ error: "No reviews found for this business" });
    }

    res.status(200).json({
      message: "Reviews retrieved successfully",
      data: reviews,
    });
  } catch (error) {
    console.error("Error retrieving reviews:", error);
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
};

// Create  review
export const createReview = async (req, res) => {
  const { businessId, content, rating } = req.body;
  const userId = req.user._id;

  if (!businessId || !content || !rating) {
    return res
      .status(400)
      .json({ error: "Business ID, content, and rating are required" });
  }

  try {
    const businessExists = await Business.findById(businessId);
    if (!businessExists) {
      return res.status(404).json({ error: "Business not found" });
    }

    const newReview = new Review({
      userId,
      businessId,
      content,
      rating,
    });

    await newReview.save();

    res.status(201).json({
      message: "Review created successfully",
      data: newReview,
    });
  } catch (error) {
    console.error("Error creating review:", error);
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
};

// Delete a review by ID
export const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const userId = req.user._id;

  try {
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    if (review.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this review" });
    }

    await review.deleteOne();

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
};
