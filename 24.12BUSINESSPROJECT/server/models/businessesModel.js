import { Schema, model, Types } from "mongoose";

const businessSchema = new Schema(
  {
    name: { type: String, required: true },
    img: { type: String },
    description: { type: String, required: true },
    category: { type: String, required: true },
    owner: { type: Types.ObjectId, ref: "User", required: true },
    subscribers: [{ type: Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export const Business = model("Business", businessSchema);
