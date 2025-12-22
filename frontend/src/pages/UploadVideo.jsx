import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UploadVideo = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    videoUrl: "",
    thumbnailUrl: "",
    category: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/videos", form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate("/my-channel");
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload Video</h2>

      <input name="title" placeholder="Title" onChange={handleChange} required />
      <input name="videoUrl" placeholder="Video URL" onChange={handleChange} required />
      <input name="thumbnailUrl" placeholder="Thumbnail URL" onChange={handleChange} />
      <input name="category" placeholder="Category (React, Node…)" onChange={handleChange} />
      <textarea name="description" placeholder="Description" onChange={handleChange} />

      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadVideo;
