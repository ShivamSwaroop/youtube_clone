import {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Header from './components/Header.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

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
      </Routes>
    </Router>
    </AuthProvider>
  )
};
export default App;