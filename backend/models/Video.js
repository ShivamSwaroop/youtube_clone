import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
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
        description: String,
        videoUrl: String,
        thumbnailUrl: String,
        channelName: String,
        views: Number,
        category: String,

        channel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Channel",
            default: null
        },

        views: {
            type: Number,
            default: 0
        },

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
        comments: [commentSchema]
    },
    {tomestamps: true}
);

export default mongoose.model('Video', videoSchema);