import {useParams} from 'react-router-dom';
import videos from '../data/videos';
import {useState} from 'react';

const VideoPlayer = ()=>{
    const {id} = useParams();
    const video = videos.find((v)=> v.videoId === id);

    const [likes, setLikes] = useState(0);
    const[dislikes, setDislikes] = useState(0);
    const[comments, setComments] = useState([]);
    const [commentText, setCommentText]= useState('');

    if(!video){
        return <p>Video not found</p>
    }

    const addComment = ()=>{
        if(!commentText.trim()) return;

        setComments([...comments, commentText]);
        setCommentText('');
    };

    return (
        <div style={{padding: '16px'}}>
            <video width="100%" controls>
                <source src={video.videoUrl} type= 'video/mp4'/>
                Your browser does not support the video tag.
            </video>

            <h2>{video.title}</h2>
            <p>{video.channelName}</p>

            {/* likes and didlikes */}
            <div style={{margin: '10px 0'}}>
                <button onClick={()=> setLikes(likes + 1)}>👍 {likes}</button>
                <button onClick={()=> setDislikes(dislikes + 1)}>👎 {dislikes}</button>
            </div>

            {/* comments */}
            <div style={{marginTop: '20px'}}>
                <h3>Comments</h3>

                <input type="text" placeholder="Add a comment" value={commentText} onChange={(e)=> setCommentText(e.target.value)}/>
                <button onClick={addComment}>Add</button>

                <ul>
                    {comments.map((c, index)=>(
                        <li key = {index}> {c}</li>
                    ))}
                </ul>
            </div>
        </div>
    );

};

export default VideoPlayer;