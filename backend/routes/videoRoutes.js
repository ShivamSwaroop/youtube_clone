import express from 'express';

import{ getVideoById, likeVideo, addComment } from '../controllers/VideoController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:id', getVideoById);
router.post('/:id/like', protect, likeVideo);
router.post('/:id/comment', protect, addComment);

export default router;