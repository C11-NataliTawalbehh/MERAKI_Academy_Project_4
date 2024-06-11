import axios from "axios";
import { useState } from "react";
const Register =()=>{
    const [firstName , setFirstName] = useState("");
    const [lastName , setLastName] = useState("");
    const [age , setAge] = useState("");
    const [role , setRole] = useState("");
    const [favorite , setFavorite] = useState([])
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [message , setMessage] = useState("");
  

    const handelOnClicRegister = ()=>{
        const registers = {
          firstName,
          lastName,
          age,
          role:"66684f591da32c9484a698e5",
          favorite,
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
    return (
        <>
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
export default Register;