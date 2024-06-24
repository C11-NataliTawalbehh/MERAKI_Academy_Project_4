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
// import Search from './components/shared components/Search';
export const UserContext = createContext();
const App = () => {
   
  const [token , setToken] = useState(localStorage.getItem('token')||"");
  const [isLoggedIn , setIsLoggedIn] = useState(false);
  const [searchResult , setSearchResult] = useState([])
  const [product , setProduct] = useState([])
  const category= ["candel","backage"];
  const handelLogin = ()=>{
    setIsLoggedIn(true)
  }

  const handelLogout = ()=>{
    setToken("")
    setIsLoggedIn(false)
  }
  
  return (
   <div className="App">
    <UserContext.Provider value={{token,setToken,isLoggedIn,setIsLoggedIn , category , handelLogout ,setSearchResult ,product}}>
     
    <div className="ticker-container">
      <div className="ticker">
        <div className="ticker__content">
          <span>أهلاً بكم في كونكريت نتاليا - مرحباً بكم في موقعنا الجديد - اكتشف عروضنا الحصرية الآن</span>
        </div>
      </div>
    </div>
      
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
    
      <div className="name-container">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} className="text-center">
            <h1 className="name-text">Concrete Natalia</h1>
          </Col>
        </Row>
      </Container>
    </div>


    <Container className='containers'>
  <Row className="justify-content-md-center">
    <Col md="8">
      <Search setSearchResult={setSearchResult} />
    </Col>
  </Row>

  <Row className="justify-content-md-center mt-3">
    <Navbar/>
    {/* <Col md="12">
      <Navbar className="justify-content-center">
        <Navbar.Link to="/new-product">منتج جديد</Navbar.Link>
        <Navbar.Link to="/register">تسجيل جديد</Navbar.Link>
        <Navbar.Link to="/login">تسجيل الدخول</Navbar.Link>
      </Navbar>
    </Col> */}
  </Row>

  <Row className="justify-content-md-center">
    <Col md="12">
      <ProductList searchResult={searchResult} />
    </Col>
  </Row>

</Container>

    
    {/* <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">منتجات</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/new-product">منتج جديد</Nav.Link>
              <Nav.Link href="/register">تسجيل جديد</Nav.Link>
              <Nav.Link href="/login">تسجيل الدخول</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}

      <Container>
        {/* <Row className="justify-content-md-center">
          <Col md="8">
            <Search setSearchResult={setSearchResult} />
          </Col>
        </Row> */}

        {/* <Row className="justify-content-md-center">
          <Col md="12">
            <ProductList product={searchResult} />
          </Col>
        </Row> */}
    
       <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/add Product' element={<AddProduct/>}/>
        <Route path='/product/:productId' element={<ProductDetails/>}/> 
        <Route path='/cart/:productId' element={<Cart/>} />
        <Route path='/admin/Checkout' element={<AddCheckout />} />
        </Routes>
        </Container>
    </UserContext.Provider>
    </div>
  )
}

export default App









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

