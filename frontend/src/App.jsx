import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Header from './components/Header.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

function App(){
  return(
    <AuthProvider>
    <Router>
      <Header toggleSidebar={()=> setIsSidebarOpen(!isSidebarOpen)}/>
      <Routes>
        <Route path="/" element={<Home isSidebarOpen={isSidebarOpen}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
    </AuthProvider>
  )
};
export default App;