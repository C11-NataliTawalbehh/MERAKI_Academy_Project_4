import React, { useEffect, useState ,useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { UserContext } from "../../App";
const Cart = () => {
  const {user} = useParams()
  const [cart,setCart] = useState([]);
  const [ url, setUrl ] = useState("");
  const [name , setName] = useState("")
  //   const [description , setDescription] =useState("");
  //   const [price ,setPrice] = useState("");
  //   const [quantity ,setQuantity] = useState("");
  // const [product , setProduct] = useState([])
  // const [allCart , setAllCart] = useState([])
  const {token}=useContext(UserContext);
  const [totalPrice , setTotalPrice] = useState(0)

  const cartProduct = async() => {
    try{
      const response = await axios.get(`http://localhost:5000/cart/${user}`,{ headers: {
          Authorization: `Bearer ${token}`
      }});
      console.log(response.data);
      setCart(response.data);
      // setProduct(response.data.product)
      
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  
  useEffect(() => {
   cartProduct()
  }, []);

  // const calculateTotalPrice = (item)=>{
  //     let total = 0
  //     item.forEach(element => {
  //       total += element.price
  //     });
  //   setTotalPrice(total)
  // }


  return(
    // <div>
    //   <ul>
    //  {cart.product.map(item =>(
    //   <li key={item._id}>{item.name}</li>
    //  ))}
    // </ul>
    // <p>{cart.total}</p>
    // </div>
    <div>
    <h2>Cart</h2>
    {cart && cart.product&& cart.product.length > 0 ? (
      <div>
        {cart.product.map((item, index) => (
          <div key={index}>
            <img src={item.product.image} />
            <h3>{item.product.name}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.product.price}</p>
          </div>
        ))}
        <p>Total: ${cart.total}</p>
      </div>
    ) : (
      <p>Your cart is empty.</p>
    )}
  </div>
  //   <div>
  //   {cart ? (
  //     <div>
  //       <h2>Cart</h2>
  //       <p>UserID: {cart.userid}</p>
  //       <ul>
  //         {cart.product.map((prd) => (
  //           <li key={prd._id}>
  //             <h2>{prd.product.name}</h2>
  //             <img src={prd.product.image} alt={prd.name} />
  //             <p>Price: {prd.product.price}</p>
  //             <p>Quantity: {prd.product.quantity}</p>
  //           </li>
  //         ))}
  //       </ul>
  //       <h4>total price :{totalPrice}</h4>
  //     </div>
  //   ) : (
  //     <p>Loading cart...</p>
  //   )}
  // </div>
  )
  
};

export default Cart;