import React,{useContext} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import { FaHome } from "react-icons/fa";
import { FiUser, FiClipboard, FiLogOut ,FiAlignCenter ,FiShoppingCart} from 'react-icons/fi'; 
import { FaShoppingCart } from "react-icons/fa";
const Navbar = ()=>{
   const {isLoggedIn , handelLogout} = useContext(UserContext)
   return (
     <>
       <div className="App">
    <div className="name-container">
      {/* محتوى اسم التطبيق */}
    </div>

    <nav>
      
        
          <Link to={"/login"}><FiUser /> </Link>
        
        
          <Link to={"/add product"}><FiAlignCenter /> </Link>
        
        
          <Link to={"/admin/Checkout"}><FiClipboard /> </Link>
        
        
          <Link to={"/dashboard"}><FaHome /> </Link>
        
        
          <Link to={"/cart/:id"}><FaShoppingCart /> </Link>
        
      
    </nav>

    {/* محتوى الصفحات الرئيسية للتطبيق */}
   </div>
     {/* <div>
      <nav>     
    <Link to={"/dashboard"}>Dashboard</Link>
     <Link to={"/search"}>Search</Link> 
     <Link to={"/admin/Checkout"}>Checkout</Link>
    <Link to={"/add product"} ><FiAlignCenter/>
    </Link>
      {isLoggedIn ? (
      <button onClick={handelLogout}>Logout</button>
    ):( <Link to={"/login"}>Login</Link>)}
    </nav>
    </div> */}
    
     {/* <Link to={"/login"}>Login</Link>

    <Link to={"/add product"} ><FiAlignCenter/>
    </Link> 

     <Link to={"/admin/Checkout"}>Checkout</Link> 
    
      <Link to={"/dashboard"}>Dashboard</Link> 
     <Link to={"/cart/:id"}>Cart</Link>   */}
    
    </>
   )
}

export default Navbar;