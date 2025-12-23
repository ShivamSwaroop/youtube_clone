import Channel from "../models/Channel.js";
import Video from '../models/Video.js';

export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  }
  catch (error) {
    res.status(500).json({ message: "Failed to fetch videos" })
  };
};

import mongoose from "mongoose";

export const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid video id" });
    }

    const video = await Video.findById(id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.json(video);
  } catch (error) {
    console.error("getVideoById error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



export const likeVideo = async (req, res) => {
  const video = await Video.findById(req.params.id);
  const userId = req.user.toString();

  const hasLiked = video.likes.some(
    id => id.toString() === userId
  );

  if (!hasLiked) {
    video.likes.push(req.user);
    video.dislikes = video.dislikes.filter(
      id => id.toString() !== userId
    );
  }

  await video.save();
  res.json(video);
};


export const dislikeVideo = async (req, res) => {
  const video = await Video.findById(req.params.id);
  const userId = req.user.toString();

  const hasDisliked = video.dislikes.some(
    id => id.toString() === userId);

  if (!hasDisliked) {
    video.dislikes.push(req.user);
    video.likes = video.likes.filter(
      id => id.toString() !== userId);
  }

  await video.save();
  res.json(video);
};


export const addComment = async (req, res) => {
  try {
    console.log("REQ USER:", req.user);
    console.log("REQ BODY:", req.body);
    console.log("REQ PARAM ID:", req.params.id);

    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    video.comments.push({
      user: req.user,
      text: req.body.text
    });

    await video.save();
    res.json(video.comments);
  } catch (error) {
    console.error("ADD COMMENT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

export const createVideo = async (req, res) => {
  const channel = await Channel.findOne({ owner: req.user });

  if (!channel) {
    return res.status(403).json({
      message: "You must create a channel before uploading videos"
    });
  }

  const { title, description, videoUrl, thumbnailUrl, category } = req.body;

  if (!title || !videoUrl) {
    return res.status(400).json({ message: "Title and video URL are required" });
  }

  const video = await Video.create({
    title,
    description,
    videoUrl,
    thumbnailUrl,
    category,
    channel: channel._id
  });

  res.status(201).json(video);
};

export const deleteVideo = async (req, res) => {
  const video = await Video.findById(req.params.id);

  if (!video) {
    return res.status(404).json({ message: "Video not found" });
  }

  const channel = await Channel.findOne({ owner: req.user });

  if (!channel || video.channel.toString() !== channel._id.toString()) {
    return res.status(403).json({ message: "Not authorized to delete this video" });
  }

  await video.deleteOne();
  res.json({ message: "Video deleted successfully" });
};


export const getRecommendedVideos = async (req, res) => {
  try {
    const currentVideo = await Video.findById(req.params.id);

    if (!currentVideo) {
      return res.status(404).json({ message: "Video not found" });
    }
     const recommendations = await Video.find({_id: { $ne: currentVideo._id },          
      category: currentVideo.category          
    })
      .limit(8)
      .sort({ createdAt: -1 });

    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recommendations" });
  }
};


