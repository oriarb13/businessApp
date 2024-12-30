import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String },
  plan: {
    type: String,
    enum: ["Standard", "Gold", "Platinum"],
    default: "Standard",
  },
  savedBusinesses: [{ type: Schema.Types.ObjectId, ref: "Business" }],
  ownBusinesses: [{ type: Schema.Types.ObjectId, ref: "Business" }],
});

export const User = model("User", userSchema);
