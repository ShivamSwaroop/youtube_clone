import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CreateChannel = () => {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/channels",
        { channelName, description },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      navigate("/my-channel");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create channel");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Channel</h2>

      <input placeholder="Channel Name" value={channelName} onChange={(e) => setChannelName(e.target.value)} required />

      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

      <button type="submit">Create Channel</button>
    </form>
  );
};

export default CreateChannel;
