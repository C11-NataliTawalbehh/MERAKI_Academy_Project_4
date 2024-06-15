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
    const [firstName , setFirstName] = useState("");
    const [lastName , setLastName] = useState("");
    const [age , setAge] = useState("");
    const [role , setRole] = useState("");
    const [favorite , setFavorite] = useState([])
    const [message , setMessage] = useState("");
  

    const handelLoginOnClick = async ()=>{
        try{
            const response = await axios.post("http://localhost:5000/user/login",
            {email,password})

            const token = response.data.token;
            console.log(token);
            setToken(token);
            localStorage.setItem("token",token)
            setIsLoggedIn(true)
            navigate("/Dashboard");
        }catch(error){
            setError(error.response.data.message)
        }
    }

    const handelOnClicRegister = ()=>{
        const registers = {
          firstName,
          lastName,
          age,
          role:"6668aa851da32c9484a699a6",
          favorite:[],
          email,
          password,
        }

    axios.post("http://localhost:5000/user/register" ,registers)
    .then((result)=>{
        console.log(result);
        setMessage(result.data.message)
    })
    .catch((error)=>{
        console.log(error);
        setMessage(error.response.data.message)
    })
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
        
        <br/>

        <p>Register</p>
        <input type="text" placeholder="First Name" onChange={(e)=>{
            setFirstName(e.target.value)
        }}/>
        <input type="text" placeholder="Last Name" onChange={(e)=>{
            setLastName(e.target.value)
        }}/>
        <input type="number" placeholder="Age" onChange={(e)=>{
            setAge(e.target.value)
        }}/>
        <input type="email" placeholder="Email" onChange={(e)=>{
            setEmail(e.target.value)
        }}/>
        <input type="password" placeholder="Password" onChange={(e)=>{
            setPassword(e.target.value)
        }}/>
        <br></br>
        <button onClick={handelOnClicRegister}>Register</button>
        {message && <p>{message}</p>}

        </>
    )
}

export default Login;