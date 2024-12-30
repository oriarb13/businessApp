import { Business } from "../models/businessesModel.js";
import { User } from "../models/userModels.js";
import { notifySubscribers } from "../utils/socket.js";

// Get all businesses
export const getAllBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find()
      .populate("owner", "username img")
      .populate("subscribers", "username img");

    res.status(200).json({
      message: "Businesses retrieved successfully",
      data: businesses,
    });
  } catch (error) {
    console.error("Error retrieving businesses:", error);
    res.status(500).json({
      error: "Something went wrong. Please try again later.",
    });
  }
};

// Get a business by ID
export const getBusinessById = async (req, res) => {
  const { id } = req.params;
  try {
    const business = await Business.findById(id)
      .populate("owner", "username img")
      .populate("subscribers", "username img");

    if (!business) {
      return res.status(404).json({ error: "Business not found" });
    }

    res.status(200).json({
      message: "Business retrieved successfully",
      data: business,
    });
  } catch (error) {
    console.error("Error retrieving business:", error);
    res.status(500).json({
      error: "Something went wrong. Please try again later.",
    });
  }
};

// Get businesses of a specific owner
export const getBusinessesOfOwner = async (req, res) => {
  const { ownerId } = req.params;
  try {
    const businesses = await Business.find({ owner: ownerId })
      .populate("owner", "username img")
      .populate("subscribers", "username img");

    res.status(200).json({
      message: "Businesses retrieved successfully",
      data: businesses,
    });
  } catch (error) {
    console.error("Error retrieving owner's businesses:", error);
    res.status(500).json({
      error: "Something went wrong. Please try again later.",
    });
  }
};

// Create a new business
export const createBusiness = async (req, res) => {
  const { name, description, category, img } = req.body;
  const ownerId = req.user._id;

  if (!name || !description || !category) {
    return res
      .status(400)
      .json({ error: "Name, description, and category are required" });
  }

  try {
    // Check business limit
    const user = await User.findById(ownerId);

    let maxBusinesses = 1;
    if (user.plan === "Gold") {
      maxBusinesses = 3;
    } else if (user.plan === "Platinum") {
      maxBusinesses = 10;
    }

    if (user.ownBusinesses.length >= maxBusinesses) {
      return res.status(400).json({
        error: `You have reached the maximum limit of ${maxBusinesses} businesses for your plan.`,
      });
    }

    const newBusiness = new Business({
      name,
      description,
      category,
      img,
      owner: ownerId,
    });

    await newBusiness.save();

    // Add the new business to the user's ownBusinesses list
    await User.findByIdAndUpdate(ownerId, {
      $push: { ownBusinesses: newBusiness._id },
    });

    res.status(201).json({
      message: "Business created successfully",
      data: newBusiness,
    });
  } catch (error) {
    console.error("Error creating business:", error);
    res.status(500).json({
      error: "Something went wrong. Please try again later.",
    });
  }
};

// Edit a business
export const editBusiness = async (req, res) => {
  const { id } = req.params;
  const ownerId = req.user._id;
  const { name, description, category, img } = req.body;
  try {
    const business = await Business.findById(id);

    if (!business) {
      return res.status(404).json({ error: "Business not found" });
    }

    if (business.owner.toString() !== ownerId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to edit this business" });
    }

    const updatedBusiness = await Business.findByIdAndUpdate(
      id,
      { name, description, category, img },
      { new: true }
    );

    if (!updatedBusiness) {
      return res.status(404).json({ error: "Business not found" });
    }
    //socket
    const message = `The business "${updatedBusiness.name}" has been updated.`;
    notifySubscribers(req.io, id, message);

    res.status(200).json({
      message: "Business updated successfully",
      data: updatedBusiness,
    });
  } catch (error) {
    console.error("Error updating business:", error);
    res.status(500).json({
      error: "Something went wrong. Please try again later.",
    });
  }
};

// Delete a business
export const deleteBusiness = async (req, res) => {
  const { id } = req.params;
  const ownerId = req.user._id;

  try {
    const business = await Business.findById(id);

    if (!business) {
      return res.status(404).json({ error: "Business not found" });
    }

    if (business.owner.toString() !== ownerId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this business" });
    }
    //socket
    const message = `The business "${business.name}" has been deleted.`;
    notifySubscribers(req.io, id, message);

    // Remove from owner
    await User.findByIdAndUpdate(ownerId, {
      $pull: { ownBusinesses: id },
    });

    //delete
    await business.remove();

    res.status(200).json({
      message: "Business deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting business:", error);
    res.status(500).json({
      error: "Something went wrong. Please try again later.",
    });
  }
};

export const searchBusinesses = async (req, res) => {
  const { search = "", category = "", page = 1, limit = 10 } = req.query;

  const searchQuery = {};

  // תנאי חיפוש אם יש מילה לחיפוש
  if (search) {
    searchQuery.name = { $regex: search, $options: "i" };
    searchQuery.description = { $regex: search, $options: "i" };
  }

  // אם יש קטגוריה, נוסיף אותה לחיפוש
  if (category) {
    searchQuery.category = { $regex: category, $options: "i" };
  }

  try {
    const businesses = await Business.find(searchQuery)
      .populate("owner", "username img")
      .populate("subscribers", "username img")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .exec();

    const totalCount = await Business.countDocuments(searchQuery);

    res.status(200).json({
      message: "Businesses retrieved successfully",
      data: businesses,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    console.error("Error searching businesses:", error);
    res.status(500).json({
      error: "Something went wrong. Please try again later.",
    });
  }
};

//add fav
export const addBusinessToFav = async (req, res) => {
  const userId = req.user._id;
  const { businessId } = req.params;
  console.log("hey");

  try {
    const user = await User.findById(userId);
    const business = await Business.findById(businessId);

    if (!user || !business) {
      console.log("hey");

      return res.status(404).json({ error: "User or Business not found" });
    }

    //user
    if (!user.savedBusinesses.includes(businessId)) {
      user.savedBusinesses.push(businessId);
      await user.save();
    }
    //buisn
    if (!business.subscribers.includes(userId)) {
      business.subscribers.push(userId);
      await business.save();
    }

    req.io.sockets.in(businessId).socketsJoin(userId);

    res
      .status(200)
      .json({ message: "Business added to favorites", data: user });
  } catch (error) {
    console.error("Error adding business to favorites:", error);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
};

// remove   fav
export const removeBusinessFromFav = async (req, res) => {
  const userId = req.user._id;
  const { businessId } = req.params;

  try {
    const user = await User.findById(userId);
    const business = await Business.findById(businessId);

    if (!user || !business) {
      return res.status(404).json({ error: "User or Business not found" });
    }

    //users
    user.savedBusinesses = user.savedBusinesses.filter(
      (id) => id.toString() !== businessId
    );
    await user.save();

    //buis
    business.subscribers = business.subscribers.filter(
      (id) => id.toString() !== userId
    );
    await business.save();

    req.io.sockets.in(businessId).socketsLeave(userId);

    res
      .status(200)
      .json({ message: "Business removed from favorites", data: user });
  } catch (error) {
    console.error("Error removing business from favorites:", error);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
};
