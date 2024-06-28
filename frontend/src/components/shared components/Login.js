import axios from "axios";
import { useContext , useState } from "react";
import { UserContext } from "../../App";
import { Navigate ,useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import "./Login.css"
const Login = ()=>{
    const navigate = useNavigate();
    const {setToken , setIsLoggedIn} = useContext(UserContext);
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [error , setError] = useState("");
    const [firstName , setFirstName] = useState("");
    const [lastName , setLastName] = useState("");
    const [age , setAge] = useState("");
    const [role , setRole] = useState("");
    const [favorite , setFavorite] = useState([])
    const [message , setMessage] = useState("");
  

    const handelLoginOnClick = async ()=>{
        try{
            const response = await axios.post("http://localhost:5000/user/login",
            {email,password})

            const token = response.data.token;
            console.log(token);
            setToken(token);
            localStorage.setItem("token",token)
            localStorage.setItem("role" , response.data.role)
            setIsLoggedIn(true)
            localStorage.setItem("isLoggedIn",true)
            navigate('/')
        }catch(error){
            setError(error.response.data.message)
        }
    }

    const handelOnClicRegister = ()=>{

        const registers = {
          firstName,
          lastName,
          age,
          role:"",
          email,
          password,
        }

    axios.post("http://localhost:5000/user/register" ,registers)
    .then((result)=>{
        console.log(result);
        setMessage(result.data.message)
         
    })
    .catch((error)=>{
        console.log(error);
        setMessage(error.response.data.message)
    })
    }
    return(
        <>
        <Container className="login-register-container">
      <Row className="justify-content-md-center">
        <Col md="6">
          <h2>Login</h2>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter the password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}

            <Button variant="primary" onClick={handelLoginOnClick}>
              Login
            </Button>
          </Form>
        </Col>
      </Row>

      <Row className="justify-content-md-center mt-5">
        <Col md="6">
          <h2>Register</h2>
          <Form>
            <Form.Group controlId="formFirstName">
              <Form.Label>first Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter the age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter the password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            {message && <Alert variant="info">{message}</Alert>}

            <Button variant="success" onClick={handelOnClicRegister}>
              Register
            </Button>
          </Form>
        </Col>
      </Row>

    </Container>


        </>
    )
}

export default Login;