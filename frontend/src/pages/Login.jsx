import {useState , useContext} from "react";
import axios from "axios";
import { AuthContext } from "./context/AuthContext.jsx";
import { useNavigate } from 'react-router-dom';

const Login = ()=>{
    const[formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e)=>{
        e,preventDefault();
        try{
            const res = await axios.post("http://localhost:5000/api/auth/login", formData);
            login(res.data.token, res.data.user);
            navigate("/");
        }catch(error){
            alert(error.response?.data?.message || "Login failed");
        }
    };

    return(
        <form onSubmit = {handleSubmit}>
            <h2>Login</h2>
            <input name="email" placeholder="Email" onChange= {handleChange}/>
            <input name= "password" typr="password" placeholder="Password" onChange={handleChange}/>
            <button type= "submit">Login</button>
        </form>
    )
};
export default Login;