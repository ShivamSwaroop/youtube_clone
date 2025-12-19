import { useContext} from "react";
import {Link} from "react-router-dom";
import { AuthContext} from "./context/AuthContext.jsx";

const Header = ( {toggleSidebar})=>{
    const {user, logout} = useContext(AuthContext);

    return(
        <header style={{padding: '10px', borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center', gap: '10px'}}>
            <button onClick={toggleSidebar}>☰</button>
            
            <Link to="/">Youtube Clone</Link>

            <div style={{float: "right" }}>
                {user ? (
                    <>
                    <span>{user.username}</span>
                    <button onClick={logout} style={{marginLeft: "10px"}}>Logout</button>
                    </>
                ):(
                    <Link to="/login">Sign In</Link>
                )}
            </div>
        </header>
    )
};
export default Header;