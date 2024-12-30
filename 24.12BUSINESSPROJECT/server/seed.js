import mongoose from "mongoose";
import { User } from "./models/userModels.js";
import { Business } from "./models/businessesModel.js";
import { Review } from "./models/reviewModel.js";
import dotenv from "dotenv";
const mongoURI =
  "mongodb+srv://oriarb13690:oriarb13690@cluster0.ys1qc.mongodb.net/business?retryWrites=true&w=majority&appName=Cluster0"; // שים לב שהקישור שלך הוא לאותו הפורמט

const seedDatabase = async () => {
  try {
    const uri = process.env.DB_URI || "mongodb://localhost:27017/my_database";
    await mongoose
      .connect(mongoURI)
      .then(() => {
        console.log("connected to MongoDB");
      })
      .catch((err) => {
        console.error("Error connecting to MongoDB: " + `${uri}`, err.message);
      });

    console.log("Database connected");

    // Reset collections
    await User.deleteMany({});
    await Business.deleteMany({});
    await Review.deleteMany({});
    console.log("All collections cleared");

    // Seed Users
    const users = await User.insertMany([
      {
        username: "standardUser",
        email: "standard@example.com",
        password: "password",
        plan: "Standard",
      },
      {
        username: "goldUser",
        email: "gold@example.com",
        password: "password",
        plan: "Gold",
      },
      {
        username: "platinumUser",
        email: "platinum@example.com",
        password: "password",
        plan: "Platinum",
      },
      {
        username: "noBusinessUser",
        email: "nobusiness@example.com",
        password: "password",
        plan: "Standard",
      },
    ]);
    console.log("Users seeded");

    // Seed Businesses
    const businesses = await Business.insertMany([
      {
        name: "Standard Business",
        img: "https://via.placeholder.com/150",
        description: "A business owned by a standard user",
        category: "Retail",
        owner: users[0]._id,
      },
      {
        name: "Gold Business 1",
        img: "https://via.placeholder.com/150",
        description: "A business owned by a gold user",
        category: "Tech",
        owner: users[1]._id,
      },
      {
        name: "Gold Business 2",
        img: "https://via.placeholder.com/150",
        description: "Another business owned by a gold user",
        category: "Food",
        owner: users[1]._id,
      },
      {
        name: "Platinum Business 1",
        img: "https://via.placeholder.com/150",
        description: "A business owned by a platinum user",
        category: "Finance",
        owner: users[2]._id,
      },
      {
        name: "Platinum Business 2",
        img: "https://via.placeholder.com/150",
        description: "Another business owned by a platinum user",
        category: "Healthcare",
        owner: users[2]._id,
      },
      {
        name: "Platinum Business 3",
        img: "https://via.placeholder.com/150",
        description: "Yet another business owned by a platinum user",
        category: "Education",
        owner: users[2]._id,
      },
    ]);
    console.log("Businesses seeded");

    // Assign businesses to users (owners)
    await Promise.all(
      businesses.map((business) =>
        User.findByIdAndUpdate(business.owner, {
          $push: { ownBusinesses: business._id },
        })
      )
    );

    // Assign subscribers to businesses and update savedBusinesses in users
    await Business.findByIdAndUpdate(businesses[0]._id, {
      $push: { subscribers: [users[3]._id, users[1]._id] },
    });
    await User.findByIdAndUpdate(users[3]._id, {
      $push: { savedBusinesses: businesses[0]._id },
    });
    await User.findByIdAndUpdate(users[1]._id, {
      $push: { savedBusinesses: businesses[0]._id },
    });

    await Business.findByIdAndUpdate(businesses[1]._id, {
      $push: { subscribers: [users[0]._id, users[2]._id] },
    });
    await User.findByIdAndUpdate(users[0]._id, {
      $push: { savedBusinesses: businesses[1]._id },
    });
    await User.findByIdAndUpdate(users[2]._id, {
      $push: { savedBusinesses: businesses[1]._id },
    });

    await Business.findByIdAndUpdate(businesses[2]._id, {
      $push: { subscribers: [users[1]._id] },
    });
    await User.findByIdAndUpdate(users[1]._id, {
      $push: { savedBusinesses: businesses[2]._id },
    });

    // Seed Reviews
    await Review.insertMany([
      {
        userId: users[0]._id,
        businessId: businesses[1]._id,
        content: "Great customer service!",
        rating: 5,
      },
      {
        userId: users[1]._id,
        businessId: businesses[0]._id,
        content: "Very reliable business.",
        rating: 4,
      },
      {
        userId: users[2]._id,
        businessId: businesses[3]._id,
        content: "Decent experience.",
        rating: 3,
      },
    ]);
    console.log("Reviews seeded");

    console.log("Database seeded successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
};

seedDatabase();
