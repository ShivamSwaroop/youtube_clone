import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import VideoCard from "../components/VideoCard";
import { useNavigate } from "react-router-dom";

const MyChannel = () => {
  const { token } = useContext(AuthContext);
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/channels/me",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setChannel(res.data);
      } catch {
        setChannel(null);
      }
    };

    fetchChannel();
  }, [token]);

  useEffect(() => {
    if (!channel) return;

    axios
      .get(`http://localhost:5000/api/videos?channel=${channel._id}`)
      .then((res) => setVideos(res.data));
  }, [channel]);

  if (!channel) {
    return <p>You don’t have a channel yet.</p>;
  }

  return (
    <div>
      <h2>{channel.channelName}</h2>
      <p>{channel.description}</p>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3>Your Videos</h3>

        <button onClick={() => navigate("/upload")}>
          Upload Video
        </button>
      </div>


      {videos.length === 0 ? (
        <p>No videos uploaded yet</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, 280px)", gap: "20px" }}>
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      )}
      <button
        onClick={() =>
          axios
            .delete(`http://localhost:5000/api/videos/${videos._id}`, {
              headers: { Authorization: `Bearer ${token}` }
            })
            .then(() => setVideos(videos.filter(v => v._id !== videos._id)))
        }
      >
        Delete
      </button>
    </div>
  );
};

export default MyChannel;
