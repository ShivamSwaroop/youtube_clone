import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        required: true
    }
},
{timestamps: true});

const videoSchema = new mongoose.Schema(
    {
        title: String,
        videoUrl: String,
        thumbnailUrl: String,
        channelName: String,
        views: Number,
        category: String,

        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        dislikes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        comment: [commentSchema]
    },
    {tomestamps: true}
);

export default mongoose.model('Video', videoSchema);