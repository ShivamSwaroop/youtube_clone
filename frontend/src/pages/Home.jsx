import {useState} from 'react';
import Sidebar from './components/Sidebar.jsx';
import VideoCard from './components/VideoCard.jsx';
import videos from './data/videos.js';


const Home = ()=>{
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [selectedCategory, setSelectedCategory]= useState('All');

    const filteredVideos = selectedCategory === 'All' ? videos : videos.filter((v)=> v.category === selectedCategory);

    return (
        <div style ={{display: "flex"}}>
            <Sidebar isOpen={isSidebarOpen}/>
            <main style={{ padding: '10px', flex: 1}}>
                <Filters selected={selectedCategory} onSelect={setSelectedCategory}/>

                <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px'}}>
                    {filteredVideos.map((video)=>(
                        <videoCard key={video.videoId} video={video}/>
                    ))
                    }
                </div>
            </main>
        </div>
    )
};

export default Home;