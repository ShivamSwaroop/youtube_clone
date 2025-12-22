import express from 'express';
import{ getAllVideos, getVideoById, likeVideo, dislikeVideo, addComment } from '../controllers/VideoController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/", getAllVideos);
router.get('/:id', getVideoById);
router.post('/:id/like', protect, likeVideo);
router.post('/:id/dislike', protect, dislikeVideo);
router.post('/:id/comment', protect, addComment);

export default router;