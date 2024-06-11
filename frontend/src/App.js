import React, { createContext, useState } from 'react'
import "./App.css";
import Register from './components/shared components/Register';
import Login from './components/shared components/Login';
import Navbar from './components/shared components/Navbar';
import { Routes, Route, Link, Navigate  } from "react-router-dom";
import AddProduct from './components/shared components/AddProduct';
export const UserContext = createContext();
const App = () => {
  // const [image, setImage ] = useState("");
  // const [ url, setUrl ] = useState("");
  const [token , setToken] = useState(localStorage.getItem('token')||"");
  const [isLoggedIn , setIsLoggedIn] = useState(false);

  // const uploadImage = () => {
  //   const data = new FormData()
  //   data.append("file", image)
  //   data.append("upload_preset", "391138357968942")
  //   data.append("cloud_name","do0c8tkck")
  //   fetch("  https://api.cloudinary.com/v1_1/do0c8tkck/image/upload",{
  //   method:"post",
  //   body: data
  //   })
  //   .then(resp => resp.json())
  //   .then(data => {
  //     console.log(data);
  //   setUrl(data.url)
  //   })
  //   .catch(err => console.log(err))
  //   }
  return (
   <div className="App">
    <UserContext.Provider value={{token,setToken,isLoggedIn,setIsLoggedIn}}>
    {/* <div>
    <input type="file" onChange= {(e)=> setImage(e.target.files[0])}></input>
    <button onClick={uploadImage}>Upload</button>
    </div>

    <h1>Uploaded image will be displayed here</h1>
    <img src={url}/> */}
    
    <Navbar/>
    <Routes>
      <Route path='register' element={<Register />} />
      <Route path='login' element={<Login />} />
      <Route path='add product' element={<AddProduct />} />
    </Routes>
      <h1>Hello World!</h1>
    </UserContext.Provider>
    </div>
  )
}

export default App

