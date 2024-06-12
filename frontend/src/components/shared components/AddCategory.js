import axios from "axios";
import { useState ,useContext } from "react";
import { UserContext } from "../../App";
const AddCategory = () =>{
    const [name , setName] = useState("")
    const [message , setMessage] = useState("")
    const {token }=useContext(UserContext)
    const handelOnClick = ()=>{
        axios.post("http://localhost:5000/product/category",{name},{headers:{
            Authorization:`Bearer ${token}`
        }})
            .then((result)=>{
                console.log(result);
             setMessage(result.data.message)
            })
            .catch((error)=>{
              setMessage(error.data)  
            })
    }
    return(
        <>
        <p>Add Category</p>
        <input type="text" placeholder="name" onChange={(e)=>{
            setName(e.target.value)
        }}/>
        <br/>
        <button onClick={handelOnClick}>Add Category</button>
        </>
    )
}

export default AddCategory;