import React, { useEffect, useState ,useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from "../../App";
import "./Cart.css"
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
const Cart = () => {
  const {user} = useParams()
  const [cart,setCart] = useState([]);
  const [ url, setUrl ] = useState("");
  const [name , setName] = useState("")
  const [quantity, setQuantity] = useState(1);
  const {token}=useContext(UserContext);
  const [totalPrice , setTotalPrice] = useState(0)

  const cartProduct = async() => {
    try{
      const response = await axios.get(`http://localhost:5000/cart/${user}`,{ headers: {
          Authorization: `Bearer ${token}`
      }});
      console.log(response.data.product[0].product);
      setCart(response.data.product);
      
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  
  useEffect(() => {
   cartProduct()
  }, []);

 const handelDeleteCart = async(productId)=>{
   try{
    const response = await axios.delete(`http://localhost:5000/cart/delete/${productId}`,{ headers: {
      Authorization: `Bearer ${token}`
    }});
    if(response.data.success){
      if(cart&&cart.product){
        const updatedCart = cart.product.filter(item=>
          item.id._id !== productId
        )
        setCart({...cart , product:updatedCart})
      }
    }
   }catch(error){
    console.log(error);
   }
 }
  

  const calculateTotalPrice = (item)=>{
    // console.log(item);
      let total = parseFloat(item.price)
    total *= parseFloat(quantity)
     return total;
  }

  const totalPrices = ()=>{
    const total = cart.reduce((acc , item)=>{
      return acc+item.product.reduce((acc , prod)=>{
        return acc + (parseFloat(prod.id.price)*prod.quantity)
      },0)
      
    },0)
    return total.toFixed(2);
  }

 

  return(

<div className='cart-container'>
      <h2>Cart</h2>
      { cart.length > 0 ? (
        <div>
          {cart?.map((item, index) => (
            (<div className='cart-item'>
              {item.product.map((prod)=>{
                return(
                  <div key={prod._id} className='cart-item-details'>
                    {prod.id.image && prod.id.image.length > 0 && ( <img src={prod.id.image[0]}/>)}
                    {/* <img src={prod.id.image[0]}/> */}
                    <h3>{prod.id.name}</h3>
                    <span className="badge bg-primary me-2">{prod.id.price}jd</span>
               
                  <button onClick={()=>handelDeleteCart(prod.id._id)} className='delete'>Delete</button>
                  {/* <p className='total-price'>price: jd{calculateTotalPrice(prod.id )}</p> */}
                  </div>
                )
              })}
              <p className='total'>Total Cart Price :
                <br/>
                {totalPrices()} jd</p>
                 <Link to={"/Checkout"} className='checkout'>Checkout</Link>
                 
            </div>)
          ))}
          
        </div>
      ) : (
        <div>
        <p>Your cart is empty.</p>

        <div className="footer">
        <p className="footer-text">STAY ON TOP OF THE LATEST TRENDS.
          <br />
          Follow us on Instagram and Facebook.</p>
        <a href="https://www.instagram.com/concretenatalia?igsh=MWhnejcxZnp4bDU3Ng==" rel="noopener noreferrer">
          <FaInstagramSquare className="icon" />
        </a>
        <a href="https://www.facebook.com/profile.php?id=61554426860072&mibextid=ZbWKwL" rel="noopener noreferrer">
          <FaFacebookSquare className="icon" />
        </a>
      </div>
      </div>
      )}
    </div>

  )
  
};

export default Cart;