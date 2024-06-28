import { UserContext } from "../../App";
import React, { useState , useEffect , useContext } from 'react';
import { Navigate ,useNavigate ,Link } from "react-router-dom";
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import ProductDetails from "./ProductDetails";
import { Card, Badge } from "react-bootstrap"
import "./Search.css"
import { FaSearch } from "react-icons/fa";
const Search = () => {
  const { token } = useContext(UserContext);
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [isEmptyQuery, setIsEmptyQuery] = useState(false); 

  useEffect(() => {
    if (query.trim() === '') {
      setIsEmptyQuery(true); 
    } else {
      setIsEmptyQuery(false);
    }
  }, [query]);

  const handelSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/product/search_1?name=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSearchResult(response.data);
      setIsEmptyQuery(false); 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isEmptyQuery) {
     
      axios.get('http://localhost:5000/product', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setProducts(response.data);
        setSearchResult(response.data); 
      })
      .catch(error => console.error(error));
    }
  }, []);

  return (
    <>
       <div>
      <Container>
      <div className="search-container">
      <input
        type="text"
        placeholder="Search Product"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button" onClick={handelSearch}>
      <FaSearch />
      </button>
    </div>
        <Row>
          {Array.isArray(searchResult) && searchResult.length > 0 && searchResult.map((prod) => (
            <Col key={prod._id} md={4} className="mb-3">
              <Card>
                <Card.Img variant="top" src={prod.image} className="card-img-custom" />
                <Card.Body>
                  <Card.Title>{prod.name}</Card.Title>
                  <div className="d-flex justify-content-between align-items-center">
                    <Badge bg="primary" className="me-2">
                      {prod.price} د.أ
                    </Badge>
                  </div>
                  <Link to={`/product/${prod._id}`} element={<ProductDetails />}>More Details</Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>

    </>
  );

}

export default Search;




















