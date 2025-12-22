import mongoose from "mongoose";
import dotenv from "dotenv";
import Video from "./models/Video.js";
import User from "./models/User.js";
import videos from "./data/videos.js";

dotenv.config(); 

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding:", mongoose.connection.name);

    
    await Video.deleteMany();
    console.log("Videos collection cleared");

    
    await Video.insertMany(videos);
    console.log("Videos seeded successfully");

    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedDatabase();
