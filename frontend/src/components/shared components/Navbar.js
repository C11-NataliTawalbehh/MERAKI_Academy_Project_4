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
   const {isLoggedIn , handelLogout ,role , Admin} = useContext(UserContext)
   return (
     <>
       <div className="App">

    <nav>
    <Link to={"/"} title="Homepage"><FaHome /> </Link>
      {isLoggedIn ? (
         <div className="isLoggedIn">
            {role === Admin && <Link to={"/add-product"} title="Add Product"><FiAlignCenter /> </Link>}
            <Link to={"/Checkout"} title="Checkout"><FiClipboard /> </Link>
            <Link to={"/cart/:productId"} title="Cart"><FaShoppingCart /> </Link>
            <Link to={"/favorites"} title="Favorites"><MdFavoriteBorder /></Link>
            <NavLink to="/" onClick={handelLogout} title="Logout"><RiLogoutCircleRLine /></NavLink>
         </div>
          
      ):(
         <Link to={"/login"} title="Login"><FiUser /> </Link>
      )}
        
     
       
      
    </nav>

   
   </div>
    </>
   )
}

export default Navbar;



   