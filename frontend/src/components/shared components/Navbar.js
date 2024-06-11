import React,{useContext} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

const Navbar = ()=>{
   const {setToken , isLoggedIn} = useContext(UserContext);
   return (
    <>
    <Link to={"/register"}>Register</Link>

    <Link to={"/login"}>Login</Link>

    <Link to={"/add product"}>Add Product</Link>


    </>
   )
}

export default Navbar;