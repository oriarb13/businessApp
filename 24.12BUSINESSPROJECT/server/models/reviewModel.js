import { Schema, model, Types } from "mongoose";

const reviewSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    businessId: { type: Types.ObjectId, ref: "Business", required: true },
    content: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true }
);

export const Review = model("Review", reviewSchema);
