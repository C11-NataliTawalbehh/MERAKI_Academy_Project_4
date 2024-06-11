import axios from "axios";
import { useContext , useState } from "react";
import { UserContext } from "../../App";
import { Navigate ,useNavigate } from "react-router-dom";

const Login = ()=>{
    const navigate = useNavigate();
    const {setToken , setIsLoggedIn} = useContext(UserContext);
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [error , setError] = useState("");

    const handelLoginOnClick = async ()=>{
        try{
            const response = await axios.post("http://localhost:5000/user/login",
            {email,password})

            const token = response.data.token;
            console.log(token);
            setToken(token);
            localStorage.setItem("token",token)
            setIsLoggedIn(true)
            navigate("/product");
        }catch(error){
            setError(error.response.data.message)
        }
    }
    return(
        <>
        <p>Login</p>
        <input type="email" placeholder="Email" onChange={(e)=>{
            setEmail(e.target.value)
        
        }}/>
        <input type="password" placeholder="Password" onChange={(e)=>{
            setPassword(e.target.value)
    
        }}/>
        <button onClick={handelLoginOnClick}>Login</button>
        {error&& <p>{error}</p>}
        </>
    )
}

export default Login;