import axios from "axios";
import { useContext , useEffect, useState } from "react";
import { UserContext } from "../../App";

const Favorite = () =>{
    const [favorites , setFavorites] = useState([])
    const [loading , setLoading] = useState(true)
    const [error , setError] = useState(null)
    const [image, setImage ] = useState("");
    const [ url, setUrl ] = useState("");
    const {token}=useContext(UserContext);
    const getFavorite = async()=>{
      try{
        const response = await axios.get("http://localhost:5000/favorite" ,{ headers: {
            Authorization: `Bearer ${token}`
        }})
        setFavorite(response.data.favorites)
        setLoading(false)
      }catch(error){
        setError(error)
        setLoading(false)
      }
    }
    useEffect(()=>{
        getFavorite()
    },[])
    return(
        <div>
            <h1>Favorite Product</h1>
            <ul>
                {favorites.map(product =>(
                    <li key={product._id}>
                     <img src={product.image} alt={product.name} />
                     <h3>{product.name}</h3>
                     <p>{product.description}</p>
                     <p>Price:{product.price}</p>
                     <p>quantity:{product.quantity}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default Favorite;