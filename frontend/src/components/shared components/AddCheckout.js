import React, { useState , useContext } from "react";
import axios from "axios";
import { UserContext } from "../../App";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import "./AddCheckout.css"
const AddCheckout = () =>{
    const [fromData , setFromData]= useState({
        provid:"",
        paymentIsCash:false,
        fullName:"",
        phoneNumber:"",
        country:"",
        city:"",
        address:"",
    }) 
    const [error , setError] = useState("");
    const [success , setSuccess] = useState("");
    const {token}=useContext(UserContext);
    
    const handleChange = (e)=>{
        const {name , value} = e.target;
        setFromData({...fromData , [name]:value})
    }

    const handleOnClick = async() =>{
    
        try{
            const response = await axios.get("http://localhost:5000/checkout/" , fromData ,{headers:{
                Authorization:`Bearer ${token}` 
              }})
              setSuccess("Checkout created successfully")
              setError("")
        }catch(error){
            setError("Error creating checkout")
            setSuccess("")
        }
    }
    return (
        <>
        <Container className="checkout-container">
      <Row className="justify-content-md-center">
        <Col md="6">
          <h2>Checkout</h2>
          <Form>
            <Form.Group controlId="formProvid">
              <Form.Label>Provider ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Provider ID"
                name="provid"
                value={fromData.provid}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPaymentIsCash">
              <Form.Check
                type="checkbox"
                label="paymentIsCash"
                name="paymentIsCash"
                checked={fromData.paymentIsCash}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formFullName">
              <Form.Label>fullName</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter fullName"
                name="fullName"
                value={fromData.fullName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPhoneNumber">
              <Form.Label>phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="phoneNumber"
                name="phoneNumber"
                value={fromData.phoneNumber}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formCountry">
              <Form.Label>country</Form.Label>
              <Form.Control
                type="text"
                placeholder=" country"
                name="country"
                value={fromData.country}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formCity">
              <Form.Label>city</Form.Label>
              <Form.Control
                type="text"
                placeholder=" city"
                name="city"
                value={fromData.city}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label>address</Form.Label>
              <Form.Control
                type="text"
                placeholder=" address"
                name="address"
                value={fromData.address}
                onChange={handleChange}
              />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Button variant="primary" onClick={handleOnClick}>
              Create Checkout
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>

        </>
    )
}

export default AddCheckout;