import express from "express";
import {
  getAllBusinesses,
  getBusinessById,
  createBusiness,
  deleteBusiness,
  editBusiness,
  getBusinessesOfOwner,
  searchBusinesses,
  addBusinessToFav,
  removeBusinessFromFav,
} from "../controllers/businessController.js";

import verifyToken from "../middleware/auth.js";

const router = express.Router();

// all businesses
router.get("/", getAllBusinesses);

// business by ID
router.get("/:id", getBusinessById);

//  businesses of owner
router.get("/owner/:ownerId", getBusinessesOfOwner);

// Create
router.post("/", verifyToken, createBusiness);

// Edit
router.put("/:id", verifyToken, editBusiness);

// Delete
router.delete("/:id", verifyToken, deleteBusiness);

// Search
router.get('/search', searchBusinesses);

//add business to fav
router.post("/favorites/add/:businessId", verifyToken, addBusinessToFav);

//remove from fav
router.delete(
  "/favorites/remove/:businessId",
  verifyToken,
  removeBusinessFromFav
);

export default router;
