import { User } from "../models/userModels.js";
import JWT from "jsonwebtoken";
import { Business } from "../models/businessesModel.js";

//jwt
import { hashPassword, comparePassword } from "../utils/AUTH.js";
const JWT_EXPIRATION = 3600;

// token validation
export const TokenValid = (req, res) => {
  try {
    console.log(req.user);
    const { username, _id, email, plan, userType, image, businesses } =
      req.user;
    res.status(200).send({
      username,
      _id,
      email,
      plan,
      userType,
      image,
      businesses,
    });
  } catch (error) {
    res.status(500).send({
      error: "Something went wrong. Please try again later.",
    });
  }
};

// sign up
export const createUser = async (req, res) => {
  const { username, email, password, plan, image } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Username, email, and password are required" });
  }

  try {
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      plan: plan || "Standard",
      image,
      savedBusinesses: [],
      ownBusinesses: [],
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      data: {
        username: newUser.username,
        email: newUser.email,
        plan: newUser.plan,
        image: newUser.image,
        savedBusinesses: newUser.savedBusinesses,
        ownBusinesses: newUser.ownBusinesses,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
};

// sign-in
export const signInUser = async (req, res) => {
  const { email, password } = req.body;
  if (!password || !email) {
    return res.status(400).send({ error: "Email and password are required" });
  }
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) {
      return res.status(404).send({ error: "Email not found." });
    }
    // bcrypt
    const isAuth = await comparePassword(password, foundUser.password);
    if (!isAuth) {
      return res.status(401).send({ error: "Invalid password." });
    }

    //without pass
    const {
      password: hashedPassword,
      savedBusinesses,image,
      ...userDetails
    } = foundUser.toObject();
    //type
    const userType =
      userDetails.ownBusinesses.length > 0 ? "businessOwner" : "user";
    console.log(userDetails);

    const token = JWT.sign(
      {
        ...userDetails,
        userType,
      },
      process.env.JWT_KEY,
      { expiresIn: JWT_EXPIRATION }
    );

    req.user = { ...userDetails };
    //cookie
    res.cookie("jwt", token, {
      httpOnly: false,
      secure: true,
      sameSite: "strict",
      maxAge: 3600000,
    });

    res.status(200).send({
      message: "Authentication successful",
      isAuth: true,
      ...userDetails,
      userType,
    });
  } catch (error) {
    console.error("Sign-in error:", error);
    res.status(500).send({
      error: "Something went wrong. Please try again later.",
    });
  }
};

//logout
export const logOut = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: false,
    secure: true,
    sameSite: "strict",
    path: "/login",
  });
  res.status(200).send({
    message: "Successfully logged out.",
  });
};

//users by name
export const getUserByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const foundUser = await User.findOne({ username })
      .populate("savedBusinesses", "name")
      .populate("ownBusinesses", "name");

    if (!foundUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User retrieved successfully",
      data: foundUser,
    });
  } catch (error) {
    console.error("Error finding user:", error);
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
};

//all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .populate("savedBusinesses", "name")
      .populate("ownBusinesses", "name");

    res.status(200).json({
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    console.error("Error retrieving users:", error);
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
};

//update
export const updateUser = async (req, res) => {
  const userId = req.user._id;

  const { username, email, image } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, image },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
};

//delete user
export const deleteUser = async (req, res) => {
  const userId = req.user._id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
};

//change plan

export const changePlan = async (req, res) => {
  const userId = req.user._id;
  const { newPlan } = req.body;

  if (!newPlan || !["Standard", "Gold", "Platinum"].includes(newPlan)) {
    return res.status(400).json({ error: "Invalid plan selected" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // check plan
    let maxBusinesses = 1;
    if (newPlan === "Gold") {
      maxBusinesses = 3;
    } else if (newPlan === "Platinum") {
      maxBusinesses = 10;
    }

    if (
      (newPlan === "Standard" && user.ownBusinesses.length > 1) ||
      (newPlan === "Gold" && user.ownBusinesses.length > 3)
    ) {
      return res.status(400).json({
        error: `You cannot downgrade to ${newPlan} plan because you have more businesses than allowed for this plan.`,
      });
    }

    user.plan = newPlan;
    await user.save();

    res.status(200).json({
      message: `Plan updated to ${newPlan} successfully`,
      data: user,
    });
  } catch (error) {
    console.error("Error changing plan:", error);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
};
