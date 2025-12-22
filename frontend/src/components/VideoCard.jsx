import {Link} from 'react-router-dom';

const VideoCard = ({video})=> {
    return (
        <Link to={`/video/${video._id}`} style={{ textDecoration: 'none', color: 'inherit'}}>
        <div style= {{width : '280px', cursor: 'pointer'}}>
            <img 
            src ={video.thumbnailUrl}
            alt ={video.title}
            style={{width: '100%', borderRadius: '8px'}}/>
            <h4>{video.title}</h4>
            <p>{video.channelName}</p>
            <p>{video.views} views</p>
        </div>
        </Link>
    );
};

export default VideoCard;