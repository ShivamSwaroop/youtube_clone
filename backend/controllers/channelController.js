import Channel from "../models/Channel.js";
import Video from "../models/Video.js";


export const createChannel = async (req, res) => {
  const existingChannel = await Channel.findOne({ owner: req.user });

  if (existingChannel) {
    return res.status(400).json({
      message: "Channel already exists for this user"
    });
  }

  const { channelName, description } = req.body;

  if (!channelName) {
    return res.status(400).json({
      message: "Channel name is required"
    });
  }

  const channel = await Channel.create({
    channelName,
    description,
    owner: req.user
  });

  res.status(201).json(channel);
};


export const getMyChannel = async (req, res) => {
  const channel = await Channel.findOne({ owner: req.user });

  if (!channel) {
    return res.status(404).json({
      message: "Channel not found"
    });
  }

  res.json(channel);
};
