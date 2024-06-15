import React, { createContext, useState } from 'react'
import "./App.css";
import Login from './components/shared components/Login';
import Navbar from './components/shared components/Navbar';
import { Routes, Route, Link, Navigate  } from "react-router-dom";
import AddProduct from './components/shared components/AddProduct';
import Dashboard from './components/shared components/Dashboard';

// import Search from './components/shared components/Search';
export const UserContext = createContext();
const App = () => {

  const [token , setToken] = useState(localStorage.getItem('token')||"");
  const [isLoggedIn , setIsLoggedIn] = useState(false);
  const category= ["candel","backage"];

  // const handelLogout = ()=>{
  //   setToken("")
  //   setIsLoggedIn(false)
  //   localStorage.removeItem("token")
  // }
  
  return (
   <div className="App">
    <UserContext.Provider value={{token,setToken,isLoggedIn,setIsLoggedIn , category}}>
    <h1>Concrete Natalia</h1>

    <Navbar/>

    <Routes>
    <Route path='dashboard' element={<Dashboard />}  />

      <Route path='login' element={<Login />} />

      <Route path='add product' element={<AddProduct category={category}/>} />
    
      <Route path='dashboard' element={<Dashboard />} />
      
      {/* <Route path='search' element={<Search />} /> */}
    </Routes>

    </UserContext.Provider>
    </div>
  )
}

export default App

