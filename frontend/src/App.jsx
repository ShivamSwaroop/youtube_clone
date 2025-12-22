import {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Header from './components/Header.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import VideoPlayer from './pages/VideoPlayer.jsx';
import CreateChannel from "./pages/CreateChannel";
import MyChannel from "./pages/MyChannel";
import UploadVideo from "./pages/UploadVideo";

function App(){
  const [searchTerm , setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);



  return(
    <AuthProvider>
    <Router>
      <Header toggleSidebar={()=> setIsSidebarOpen(!isSidebarOpen)} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}/>
      <Routes>
        <Route path="/" element={<Home searchTerm={searchTerm} isSidebarOpen={isSidebarOpen}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/video/:id" element={<VideoPlayer />}/>
        <Route path="/create-channel" element={<CreateChannel />} />
        <Route path="/my-channel" element={<MyChannel />} />
        <Route path="/upload" element={<UploadVideo />} />
      </Routes>
    </Router>
    </AuthProvider>
  )
};
export default App;