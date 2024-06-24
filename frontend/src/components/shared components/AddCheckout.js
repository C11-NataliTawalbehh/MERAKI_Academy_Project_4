import React, { useState , useContext } from "react";
import axios from "axios";
import { UserContext } from "../../App";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import "./Style.css"
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
        <Container>
      <Row className="justify-content-md-center">
        <Col md="6">
          <h2>إضافة Checkout</h2>
          <Form>
            <Form.Group controlId="formProvid">
              <Form.Label>Provider ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="أدخل Provider ID"
                name="provid"
                value={fromData.provid}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPaymentIsCash">
              <Form.Check
                type="checkbox"
                label="الدفع نقداً"
                name="paymentIsCash"
                checked={fromData.paymentIsCash}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formFullName">
              <Form.Label>الاسم الكامل</Form.Label>
              <Form.Control
                type="text"
                placeholder="أدخل الاسم الكامل"
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
              إنشاء Checkout
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
        {/* <h1>Create Checkout</h1>
        {error&&<p>{error}</p>}
        {success && <p>success</p>}
        <from>
             <input type="text" name="provid" value={fromData.provid} onChange={handleChange} placeholder="Product ID" required />
             <br/>
             <input type="checkbox" name="paymentIsCash" checked={fromData.paymentIsCash} onChange={(e)=>setFromData({...fromData,paymentIsCash:e.target.value})} />
             <label>payment in Cash</label>
             <br/>
             <input type="text" name="fullName" value={fromData.fullName} onChange={handleChange} placeholder="Full Name" required /> 
             <br/> 
             <input type="text" name="phoneNumber" value={fromData.phoneNumber} onChange={handleChange} placeholder="Phone Number" required /> 
             <br/> 
             <input type="text" name="city" value={fromData.city} onChange={handleChange} placeholder="City" required />
             <br/>
             <input type="text" name="address" value={fromData.address} onChange={handleChange} placeholder="Address" required />
             <br/>
             <button onClick={handleOnClick}>Create Checkout</button>
        </from> */}
        </>
    )
}

export default AddCheckout;