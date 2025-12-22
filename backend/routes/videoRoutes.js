import express from 'express';
import{ getAllVideos, getVideoById, likeVideo, dislikeVideo, addComment } from '../controllers/VideoController.js';
import protect from '../middleware/authMiddleware.js';
import Video from "../models/Video.js";
import { createVideo, deleteVideo } from "../controllers/VideoController.js";


const router = express.Router();

router.get("/", async (req, res) => {
  const filter = {};
  if (req.query.channel) {
    filter.channel = req.query.channel;
  }
  const videos = await Video.find(filter);
  res.json(videos);
});
router.get("/", getAllVideos);
router.get('/:id', getVideoById);
router.post('/:id/like', protect, likeVideo);
router.post('/:id/dislike', protect, dislikeVideo);
router.post('/:id/comment', protect, addComment);
router.post("/", protect, createVideo);
router.delete("/:id", protect, deleteVideo);

export default router;