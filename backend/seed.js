import mongoose from "mongoose";
import dotenv from "dotenv";
import Video from "./models/Video.js";
import videos from "./data/videos.js";

dotenv.config();

const seedVideos = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);

        await Video.deleteMany();
        await Video.insertMany(videos);

        console.log("Videos seeded successfully");
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedVideos();