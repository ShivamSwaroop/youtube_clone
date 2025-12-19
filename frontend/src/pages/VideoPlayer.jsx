import {useParams} from 'react-router-dom';
import videos from '../data/videos';
import {useState, useEffect, useContext} from 'react';
import { trusted } from 'mongoose';

const VideoPlayer = ()=>{
    const {id} = useParams();
    const {token, user} = useContext(AuthContext);

    const [video, setVideo] = useState(null);
    const [commentText, setCommentText] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchVideo = async () =>{
        try{
            const res = await fetch(`http://localhost:5000/api/videos/${id}`);
            const data = await res.json();
            setVideo(data);
            setLoading(false);
        }catch(error){
            console.error("Error fetching video:", error);
        }
    };

    useEffect(()=>{ fetchVideo(); }, [id]);

    const handleLike = async ()=> {
        if(!token){
            alert("Please login to like video");
            return;
        }

        await fetch(`http://localhost:5000/api/videos/${id}/like`, {
            method: "POST",
            headers: { Authorization : `Bearer ${token}`}
        });
        fetchVideo();
    };

    const handleAddComment  = async ()=>{
        if(!token){
            alert("Please login to comment");
            return;
        }

        if(!commentText.trim()) return;

        await fetch(`http://localhost:5000/api/videos/${id}/comment`,
            { 
                method: "POST",
                headers: { Authorization: `Bearer ${token}`},
                body: JSON.stringify({text: commentText})
            }
        );

        setCommentText("");
        fetchVideo();
    };
    if(loading){
        return <p style={{padding: "16px"}}>Loading...</p>;
    }

    if(!video){
        return <p style={{padding: "16px"}}>Video not found</p>;
    }


    return (
        <div style={{padding: '16px', maxWidth: '900px', margin: 'auto'}}>
            <video width="100%" controls>
                <source src={video.videoUrl} type= 'video/mp4'/>
                Your browser does not support the video tag.
            </video>

            <h2>{video.title}</h2>
            <p>{video.channelName}</p>

            {/* likes and didlikes */}
            <div style={{margin: '10px 0'}}>
                <button onClick={handleLike}>👍 {video.likes.length}
                </button> </div>

            {/* comments */}
            <div style={{marginTop: '20px'}}>
                <h3>Comments</h3>
                
                {users && (
                <div><input type="text" placeholder="Add a comment" value={commentText} onChange={(e)=> setCommentText(e.target.value)}/>
                <button onClick={handleAddComment}>Add</button></div>
                )}

                {!user && <p>Please login to comment</p>}
                

                <ul style={{marginTop: '10px'}}>
                    {video.comments.map((c)=>(
                        <li key = {c._id}>
                            <strong>{c.user?.username}:</strong>{" "}
                             {c.text}</li>
                    ))}
                </ul>
            </div>
        </div>
    );

};

export default VideoPlayer;