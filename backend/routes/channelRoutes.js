import express from "express";
import {createChannel, getMyChannel } from "../controllers/channelController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createChannel);
router.get("/me", protect, getMyChannel);

export default router;
