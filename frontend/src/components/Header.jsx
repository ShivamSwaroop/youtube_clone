import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = ({ toggleSidebar, searchTerm, setSearchTerm }) => {
    const { user, token, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [hasChannel, setHasChannel] = useState(false);

    useEffect(() => {
        if (!token) {
            setHasChannel(false);
            return;
        }
        axios
            .get("http://localhost:5000/api/channels/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(() => setHasChannel(true))
            .catch(() => setHasChannel(false));
    }, [token]);


    return (
        <header style={{background:'#020202ff',color:'#222',padding: '10px',borderBottom: '1px solid #cfcfcf', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button onClick={toggleSidebar}style={{background: "#020202ff",border: "1px solid #cfcfcf",padding: "6px 10px",cursor: "pointer"}}>☰</button>

            <Link to="/">Youtube Clone</Link>

            <input type="text" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                style={{ flex: 1, maxWidth: '400px' }} />

            <div style={{ marginLeft: 'auto' }}>
                {user ? (
                    <>
                        <button onClick={() => navigate(hasChannel ? "/my-channel" : "/create-channel")} style={{background: "#020202ff",border: "1px solid #cfcfcf",padding: "6px 10px",cursor: "pointer"}}>
                            {hasChannel ? "My Channel" : "Create Channel"}
                        </button>
                        <span>{user.username}</span>
                        <button onClick={logout} style={{ marginLeft: "10px" }}>Logout</button>
                    </>
                ) : (
                    <Link to="/login">Sign In</Link>
                )}
            </div>
        </header>
    )
};
export default Header;