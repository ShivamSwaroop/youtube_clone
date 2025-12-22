import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import protect from "./middleware/authMiddleware.js";
import videoRoutes from "./routes/videoRoutes.js";
import channelRoutes from "./routes/channelRoutes.js";


dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (rep, res)=>{
    res.send("Backend running successfully");
});
app.get("/api/protected", protect, (req, res)=>{
    res.json({message: "Protected route accessed", userId : req.user});
});

app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/channels", channelRoutes);


const PORT = process.env.MONGO_UTI || 5000;
app.listen(PORT, ()=>{
    console.log(`Server runnning on port ${PORT}`);
});
