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

    <Link to={"/add category"}>Add Category</Link>

    <Link to={"/dashboard"}>Dashboard</Link>
    <Link to={"/favorite"}>Favorite</Link>
    {/* <Link to={"/search"}>Search</Link> */}
    </>
   )
}

export default Navbar;