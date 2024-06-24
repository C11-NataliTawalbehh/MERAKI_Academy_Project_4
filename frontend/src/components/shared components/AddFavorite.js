// import axios from "axios";
// import { useState,useContext ,useEffect} from "react";
// import { UserContext } from "../../App";
// const AddFavorite = ()=>{
//     const [productId , setProductId] = useState("");
//     const [user , setUser] = useState("");
//     const [favorite , setFavorite] = useState("");
//     const [message ,setMessage] = useState("");
//     const {token }=useContext(UserContext);
//     const addFavorite = async()=>{
//         // if(!userid || !productId){
        
//         //    return setMessage("user id and favorite product id are required")
          
//         // }
//         try{
//        const response = await axios.get("http://localhost:5000/product/favorite/",{user ,favorite:productId},{ headers: {
//         Authorization: `Bearer ${token}`}})
         
//          setMessage(response.data.message)
//        }catch(error){
//          setMessage(error.response.data.message)
//        }}
//     return (
//         <div>
//             <button onClick={addFavorite}>Favorite</button>
//             {message && <p>{message}</p>}
//         </div>
//     )
// }

// export default AddFavorite ;