import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { Navigate, useNavigate, Link } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import "./Style.css"
import { BiHomeHeart } from "react-icons/bi";
import { GrFavorite } from "react-icons/gr";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import Search from './Search'
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
const Dashboard = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState([])
  const category = ["Candle", "Backage", "Vazza", "Stove", "Distributions", "Concrete"];
  const { token, role ,Admin} = useContext(UserContext);
  console.log(role , Admin);
  //============================================================ Get All Product =================================================================
  const getAllProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/product/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response.data);
      setProduct(response.data.product)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllProduct()
  }, [])
  //============================================================ Delete Product ===============================================================
  const handelDeleteProduct = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.status === 200) {
        const deleteProduct = product.filter(product =>
          product._id !== id
        )
        setProduct(deleteProduct)

      }
    } catch (error) {
      console.log(error);
    }
  }
//==================================================== category click ==================================================================
  const handelCategoryClick = async (category) => {
    console.log(category);
    try {
      const response = await axios.get(`http://localhost:5000/product/category/${category}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response.data);
      setProduct(response.data.product)

    } catch (error) {
      console.log(error);
    }

  }


  const handelOnClickHome = () => {
    getAllProduct()

  }

  const addToFavorite = async (productId) => {
    try {
      const response = await axios.post(`http://localhost:5000/favorite/add`, { productId }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
            
          <Row className="justify-content-md-center">
            <Col md="8">
              <Search />
            </Col>
          </Row>

      <div className="container">
        <BiHomeHeart onClick={handelOnClickHome} className="home-icon" />
        <div className="category">
          {category.map((category, i) => (
            <button key={i} onClick={() => handelCategoryClick(category)} className="btn-category">
              {category}
            </button>
          ))}
        </div>

        <div className="container my-5">
          <div className="row">
            {product.map((prod) => (
              <div key={prod._id} className="col-md-4 mb-3">
                <div className="product-item">
                  <img src={prod.image} className="product-img" alt={prod.name} />
                  <Link to={`/product/${prod._id}`} element={<ProductDetails />} className="product-details-link">More details</Link>
                  <div className="product-body">
                    <h5 className="product-title">{prod.name}</h5>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="badge bg-primary me-2">{prod.price}jd</span>
                      {role === Admin && <button className="btn-danger" onClick={() => handelDeleteProduct(prod._id)}>Delete</button>}
                      <button className="btn-info" onClick={() => addToFavorite(prod._id)}>
                        <GrFavorite />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 d-flex justify-content-center">
            {/* <button className="btn btn-info" onClick={getAllProduct}></button> */}
          </div>
        </div>

        <div className="footer">
          <p className="footer-text">STAY ON TOP OF THE LATEST TRENDS.
            <br />
            Follow us on Instagram and Facebook.</p>
          <a href="https://www.instagram.com/concretenatalia?igsh=MWhnejcxZnp4bDU3Ng==" rel="noopener noreferrer">
            <FaInstagramSquare className="icon" />
          </a>
          <a href="https://www.facebook.com/profile.php?id=61554426860072&mibextid=ZbWKwL" rel="noopener noreferrer">
            <FaFacebookSquare className="icon" />
          </a>
        </div>
      </div>


    </>

  )
}

export default Dashboard;
