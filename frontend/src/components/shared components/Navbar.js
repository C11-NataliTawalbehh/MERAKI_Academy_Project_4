import React,{useContext} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import { FiAlignCenter } from "react-icons/fi"
const Navbar = ()=>{
   const {setToken , isLoggedIn} = useContext(UserContext);
   return (
     <>
     
   <ul class="nav">
   <li class="nav-item">
    <a class="nav-link active" aria-current="page" href="#"><Link to={"/login"}>Login</Link></a>
   </li>
   <li class="nav-item">
    <a class="nav-link" href="#"><Link to={"/dashboard"}>Dashboard</Link> </a>
   </li>
    <li class="nav-item">
    <a class="nav-link" href="#"><Link to={"/add product"} ><FiAlignCenter/>
    <span>AddProduct</span>
    </Link></a>
   </li>
    {/* <li class="nav-item">
    <a class="nav-link disabled" aria-disabled="true"><Link to={"/add product"} ><FiAlignCenter/>
    <span>AddProduct</span>
    </Link></a>
    </li> */}
   </ul>
     {/* <Link to={"/register"}>Register</Link> */}

    {/* <Link to={"/login"}>Login</Link> */}

    {/* <Link to={"/add product"} ><FiAlignCenter/>
    <span>AddProduct</span>
    </Link> */}

    {/* <Link to={"/add category"}></Link> */}
    
    {/* <Link to={"/dashboard"}>Dashboard</Link> */}
    {/* <Link to={"/favorite"}>Favorite</Link> */}
    {/* <Link to={"/search"}>Search</Link> */}
    </>
   )
}

export default Navbar;