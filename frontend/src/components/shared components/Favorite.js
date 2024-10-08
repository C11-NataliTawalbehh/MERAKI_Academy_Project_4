import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";


import "./Favorite.css";

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const { token } = useContext(UserContext);

  // جلب المنتجات المفضلة
  const getFavorites = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/favorite/`, {
        headers: {
          Authorization:`Bearer ${token}`,
        },
      });
      console.log(response.data);
      setFavorites(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  const removeFromFavorites = async(productId)=>{
    try{
        const response = await axios.delete(`http://localhost:5000/favorite/remove/${productId}`, {
            headers: {
              Authorization:`Bearer ${token}`,
            },
          });
          console.log(response.data);
          setFavorites(favorites.filter((fav)=>fav._id !== productId))
    }catch(error){
        console.log(error);
    }
  }

  return (
    <Container className="my-5">
      <Row>
        {favorites.map((prod) => (
          <Col key={prod._id} md={4} className="mb-3">
            <Card>
              <Card.Img variant="top" src={prod.image} className="card-img-custom" />
              <Link to={`/product/${prod._id}`} element={<ProductDetails />}>More details</Link>
              <Card.Body>
                <Card.Title>{prod.name}</Card.Title>
                <div className="d-flex justify-content-between align-items-center">
                  <Badge bg="primary" className="me-2">
                    {prod.price} jd
                  </Badge>
                  <Button variant="danger" onClick={()=>removeFromFavorites(prod._id)}>delete</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

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
  
    </Container>
  );
};

export default Favorite;


