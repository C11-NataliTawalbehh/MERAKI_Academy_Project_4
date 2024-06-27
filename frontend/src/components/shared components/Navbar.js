import React,{useContext} from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../App";
import { FaHome } from "react-icons/fa";
import { FiUser, FiClipboard, FiLogOut ,FiAlignCenter ,FiShoppingCart} from 'react-icons/fi'; 
import { FaShoppingCart } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
import "./Navbar.css"
const Navbar = ()=>{
   const {isLoggedIn , handelLogout ,handelLogin} = useContext(UserContext)
   return (
     <>
       <div className="App">

    <nav>
      
        
          <Link to={"/login"}><FiUser /> </Link>
        
          <Link to={"/add-product"}><FiAlignCenter /> </Link>
        
        
          <Link to={"/Checkout"}><FiClipboard /> </Link>
        
        
          <Link to={"/"}><FaHome /> </Link>
        
          <Link to={"/cart/:productId"}><FaShoppingCart /> </Link>

          <Link to={"/favorites"}><MdFavoriteBorder /></Link>
          <NavLink to="/" onClick={handelLogout}><RiLogoutCircleRLine /></NavLink>
          
       
      
    </nav>

   
   </div>
    </>
   )
}

export default Navbar;