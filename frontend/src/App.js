import React, { createContext, useState } from 'react'
import "./App.css";
import Login from './components/shared components/Login';
import Navbar from './components/shared components/Navbar';
import { Routes, Route, Link, Navigate  } from "react-router-dom";
import AddProduct from './components/shared components/AddProduct';
import Dashboard from './components/shared components/Dashboard';
import Favorite from './components/shared components/Favorite';
import AddCheckout from './components/shared components/AddCheckout';
import Cart from './components/shared components/Cart';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import ProductDetails from './components/shared components/ProductDetails';
export const UserContext = createContext();
const App = () => {
   
  const [token , setToken] = useState(localStorage.getItem('token')||"");
  const [role , setRole] = useState(localStorage.getItem("role")||"")
  const [isLoggedIn , setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn')||false );
  const [searchResult , setSearchResult] = useState([])
  const [product , setProduct] = useState([])
  const Admin = "6664d9e55d86bf0c7604964a";
  const category= ["candel","backage"];
  const handelLogin = ()=>{
    setIsLoggedIn(true)
    localStorage.setItem('isLoggedIn',true)
  }


  const handelLogout = ()=>{
    localStorage.removeItem("token")
    localStorage.setItem("isLoggedIn", false)
    setIsLoggedIn(false)
   
  }
  
  return (
   <div className="App">
    <UserContext.Provider value={{token,setToken,isLoggedIn,setIsLoggedIn ,Admin, category , handelLogout ,setSearchResult ,product,handelLogin,role}}>
     
    <div className="ticker-container">
      <div className="ticker">
        <div className="ticker__content">
          <span>Welcome to Concrete Natalia - Welcome to our new website - Discover our products that were made for you - Handcrafted - For any inquiries, contact us on the Concrete Natalia page.</span>
        </div>
      </div>
    </div>
      
      <br/>
      <br/>
      <br/>
      <br/>
      <div className="name-container">
    
      <img src='/assets\Natalia3.gif' alt="Logo" className="logo-img" />
      <h1 className="name">Concrete Natalia</h1>


        
   
    </div>

    <Container>
          <Navbar bg="light" expand="lg">
          </Navbar>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path='/login' element={<Login handleLogin={handelLogin} />} />
            {role === Admin && <Route path='/add-product' element={isLoggedIn ? <AddProduct /> : <Navigate to="/login" />} />}
            <Route path='/product/:productId' element={<ProductDetails />} />
            <Route path='/cart/:productId' element={isLoggedIn ? <Cart /> : <Navigate to="/login" />} />
            <Route path='/favorites' element={<Favorite/>} />
            {/* <Route path='/favorites' element={isLoggedIn ? <Favorite /> : <Navigate to="/login" />} /> */}
            <Route path='/Checkout' element={<AddCheckout/>} />
          </Routes>
        </Container>
    
    </UserContext.Provider>
    </div>
  )
}

export default App












