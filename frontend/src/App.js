import React, { createContext, useState } from 'react'
import "./App.css";
import Login from './components/shared components/Login';
import Navbar from './components/shared components/Navbar';
import { Routes, Route, Link, Navigate  } from "react-router-dom";
import AddProduct from './components/shared components/AddProduct';
import Dashboard from './components/shared components/Dashboard';
import Favorite from './components/shared components/Favorite';
import Search from './components/shared components/Search'
import { Nav } from 'react-bootstrap';
import AddCheckout from './components/shared components/AddCheckout';
import Cart from './components/shared components/Cart';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import ProductList from './components/shared components/ProductListe';
import ProductDetails from './components/shared components/ProductDetails';
import { FiUser, FiClipboard, FiLogOut ,FiAlignCenter } from 'react-icons/fi'; 
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineFavorite } from "react-icons/md";
import { FaHome } from "react-icons/fa";

// import Search from './components/shared components/Search';
export const UserContext = createContext();
const App = () => {
   
  const [token , setToken] = useState(localStorage.getItem('token')||"");
  const [isLoggedIn , setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn')||false );
  const [searchResult , setSearchResult] = useState([])
  const [product , setProduct] = useState([])
  const category= ["candel","backage"];
  const handelLogin = ()=>{
    setIsLoggedIn(true)
    localStorage.getItem('isLoggedIn',true)
  }


  const handelLogout = ()=>{
    setToken("")
    setIsLoggedIn(false)
  }
  
  return (
   <div className="App">
    <UserContext.Provider value={{token,setToken,isLoggedIn,setIsLoggedIn , category , handelLogout ,setSearchResult ,product,handelLogin}}>
     
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
    
    
      <div className="name-container">
    
      <img src='/assets\Natalia3.gif' alt="Logo" className="logo-img" />
      <h1 className="name-text">Concrete Natalia</h1>
    
        
      {/* <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6} className="text-center">
            <img src='/assets\Natalia2.gif' alt='Logo' className='logo-img'/>
          </Col>
          <Col xs={12} md={6} className="text-center">
          <h1 className="name-text">Concrete Natalia</h1>
          </Col>
        </Row>
      </Container> */}
    </div>

    <Container>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/">منتجات</Navbar.Brand>
            {isLoggedIn ? (
              <Nav className="ml-auto">
                <Nav.Link as={Link} to="/favorites">المفضلة <MdOutlineFavorite /></Nav.Link>
                <Nav.Link as={Link} to="/cart">السلة <FaShoppingCart /></Nav.Link>
                <Nav.Link onClick={handelLogout}>تسجيل الخروج <FiLogOut /></Nav.Link>
              </Nav>
            ) : (
              <Nav className="ml-auto">
                <Nav.Link as={Link} to="/login">تسجيل الدخول <FiUser /></Nav.Link>
              </Nav>
            )}
          </Navbar>

          <Row className="justify-content-md-center">
            <Col md="8">
              <Search />
            </Col>
          </Row>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path='/login' element={<Login handleLogin={handelLogin} />} />
            <Route path='/add-product' element={isLoggedIn ? <AddProduct /> : <Navigate to="/login" />} />
            <Route path='/product/:productId' element={<ProductDetails />} />
            <Route path='/cart/:productId' element={isLoggedIn ? <Cart /> : <Navigate to="/login" />} />
            <Route path='/favorites' element={<Favorite/>} />
            {/* <Route path='/favorites' element={isLoggedIn ? <Favorite /> : <Navigate to="/login" />} /> */}
            <Route path='/Checkout' element={<AddCheckout/>} />
          </Routes>
        </Container>
    
    
    {/* <Container>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">منتجات</Navbar.Brand>
      </Navbar>

      <Row className="justify-content-md-center">
        <Col md="8">
          <Search />
        </Col>
      </Row>
    
      

    
    
       <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/add Product' element={<AddProduct/>}/>
        <Route path='/product/:productId' element={<ProductDetails/>}/> 
        <Route path='/cart/:productId' element={<Cart/>} />
        <Route path='/Checkout' element={<AddCheckout />} />
        <Route path='/favorites' element={<Favorite/>} />
        </Routes>
        </Container> */}
    </UserContext.Provider>
    </div>
  )
}

export default App



{/* <Container className='containers'>
  <Row className="justify-content-md-center search-container">
    <Col md="8">
      <Search setSearchResult={setSearchResult} />
    </Col>
  </Row>
{/*  */}
  {/* <Row className="justify-content-md-center mt-3 navbar-links">  */}
{/*     
   <Col md="12"> */}
        {/* <Navbar/> */}
          {/* <Navbar.Link to={"/login"}><FiUser /> </Navbar.Link>
        
        
          <Navbar.Link to={"/add product"}><FiAlignCenter /> </Navbar.Link>
        
        
          <Navbar.Link to={"/admin/Checkout"}><FiClipboard /> </Navbar.Link>
        
        
          <Navbar.Link to={"/dashboard"}><FaHome /> </Navbar.Link>
        
        
          <Navbar.Link to={"/cart/:id"}><FaShoppingCart /> </Navbar.Link>

          <Navbar.Link to={"/favorites"}><MdOutlineFavorite /></Navbar.Link>
      </Navbar> */}
    {/* </Col>  */}
  {/* </Row> */}

  {/* <Row className="justify-content-md-center">
    <Col md="12">
      <ProductList searchResult={searchResult} />
    </Col>
  </Row> */}

{/* </Container> */}









 {/* <div>
      <nav> */}
         
    {/* <Link to={"/dashboard"}>Dashboard</Link> */}
    {/* <Link to={"/search"}>Search</Link> */}
    {/* <Link to={"/admin/Checkout"}>Checkout</Link>
    <Link to={"/add product"} ><FiAlignCenter/>
    </Link>
      {isLoggedIn ? (
      <button onClick={handelLogout}>Logout</button>
    ):( <Link to={"/login"}>Login</Link>)}
    </nav>
    </div> */}

