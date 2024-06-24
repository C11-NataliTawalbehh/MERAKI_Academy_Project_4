import axios from "axios";
import { useContext , useState } from "react";
import { UserContext } from "../../App";
import { Navigate ,useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

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
            setIsLoggedIn(true)
            navigate('/dashboard')
        }catch(error){
            setError(error.response.data.message)
        }
    }

    const handelOnClicRegister = ()=>{

        const registers = {
          firstName,
          lastName,
          age,
          role:"66703c5b6ad6eec8649bda5b",
          email,
          password,
        }

    axios.post("http://localhost:5000/user/register" ,registers)
    .then((result)=>{
        console.log(result);
        setMessage(result.data.message)
        navigate("/Dashboard")
    })
    .catch((error)=>{
        console.log(error);
        setMessage(error.response.data.message)
    })
    }
    return(
        <>
        <Container>
      <Row className="justify-content-md-center">
        <Col md="6">
          <h2>تسجيل الدخول</h2>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>البريد الإلكتروني</Form.Label>
              <Form.Control
                type="email"
                placeholder="أدخل البريد الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>كلمة المرور</Form.Label>
              <Form.Control
                type="password"
                placeholder="أدخل كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}

            <Button variant="primary" onClick={handelLoginOnClick}>
              تسجيل الدخول
            </Button>
          </Form>
        </Col>
      </Row>

      <Row className="justify-content-md-center mt-5">
        <Col md="6">
          <h2>التسجيل</h2>
          <Form>
            <Form.Group controlId="formFirstName">
              <Form.Label>الاسم الأول</Form.Label>
              <Form.Control
                type="text"
                placeholder="أدخل الاسم الأول"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>الاسم الأخير</Form.Label>
              <Form.Control
                type="text"
                placeholder="أدخل الاسم الأخير"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formAge">
              <Form.Label>العمر</Form.Label>
              <Form.Control
                type="number"
                placeholder="أدخل العمر"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>البريد الإلكتروني</Form.Label>
              <Form.Control
                type="email"
                placeholder="أدخل البريد الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>كلمة المرور</Form.Label>
              <Form.Control
                type="password"
                placeholder="أدخل كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            {message && <Alert variant="info">{message}</Alert>}

            <Button variant="success" onClick={handelOnClicRegister}>
              التسجيل
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>

        {/* <p>Login</p>

        <input type="email" placeholder="Email" onChange={(e)=>{
            setEmail(e.target.value)
        
        }}/>
        <input type="password" placeholder="Password" onChange={(e)=>{
            setPassword(e.target.value)
    
        }}/>
        <button onClick={handelLoginOnClick}>Login</button>
        {error&& <p>{error}</p>}
        
        <br/> */}
{/* 
        <p>Register</p>
        <input type="text" placeholder="First Name" onChange={(e)=>{
            setFirstName(e.target.value)
        }}/>
        <input type="text" placeholder="Last Name" onChange={(e)=>{
            setLastName(e.target.value)
        }}/>
        <input type="number" placeholder="Age" onChange={(e)=>{
            setAge(e.target.value)
        }}/>
        <input type="email" placeholder="Email" onChange={(e)=>{
            setEmail(e.target.value)
        }}/>
        <input type="password" placeholder="Password" onChange={(e)=>{
            setPassword(e.target.value)
        }}/>
        <br></br>
        <button onClick={handelOnClicRegister}>Register</button>
        {message && <p>{message}</p>} */}

        </>
    )
}

export default Login;