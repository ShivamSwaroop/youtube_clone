import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Filters from "../components/Filters";
import VideoCard from "../components/VideoCard";
import videos from "../data/videos";

const Home = ({ searchTerm = "", isSidebarOpen }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const safeSearchTerm = String(searchTerm || "").toLowerCase();

  const filteredVideos = videos.filter((video) => {
    const categoryMatch =
      selectedCategory === "All" ||
      video.category.toLowerCase() === selectedCategory.toLowerCase();

    const searchMatch =
      safeSearchTerm === "" ||
      video.title.toLowerCase().includes(safeSearchTerm);

    return categoryMatch && searchMatch;
  });

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar isOpen={isSidebarOpen} />

      <main style={{ flex: 1, padding: "16px" }}>
        <Filters
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {filteredVideos.length === 0 ? (
          <p style={{ marginTop: "20px" }}>No videos found</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "20px",
              marginTop: "16px"
            }}
          >
            {filteredVideos.map((video) => (
              <VideoCard key={video.videoId} video={video} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
