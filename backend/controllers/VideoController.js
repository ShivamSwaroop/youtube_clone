import Video from '../models/video.js';


export const getVideoById = async (req, res)=>{
    const video = await Video.findById(req.params.id).populate("comments.user", "username");
    res.json(video);
} ;

export const likeVideo = async (req, res)=>{
    const video = await Video.findById(req.params.id);

    if(!video.likes.includes(req.user)){
        video.likes.push(req.user);
        video.dislikes = video.dislikes.filter((id)=> id.toString()!== req.user);
    }

    await video.save();
    res.json(video);
};

export const addComment = async(req, res)=>{
    const video = await Video.findById(req.params.id);

    video.comments.push({
        user: req.user,
        text: req.body.text
    });
    await video.save();
    res.json(video.comments);
};

