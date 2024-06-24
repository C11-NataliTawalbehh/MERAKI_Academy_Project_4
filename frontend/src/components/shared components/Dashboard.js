import axios from "axios";
import { useState,useContext ,useEffect} from "react";
import { UserContext } from "../../App";
import AddFavorite from "./AddFavorite";
import AddCategory from "./ProductListe";
import { Navigate ,useNavigate ,Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import ProductDetails from "./ProductDetails";
import "./Style.css"
import { BiHomeHeart } from "react-icons/bi";
import { BiHeart } from "react-icons/bi";
const Dashboard = ()=>{
  const navigate = useNavigate();
  
    const [product , setProduct] = useState([])
    // const [categories , setCategories] = useState([])

    const [name , setName] = useState("");
    const [cartItem , setCartItem] = useState([])
    const [cartTotal , setCartTotal] = useState(0)
    const [description , setDescription] =useState("");
    const [price ,setPrice] = useState("");
    const [total , setTotal] = useState("")
    const [quantity ,setQuantity] = useState("");
    const [comment , setComment] = useState("");
    const [user , setUser] = useState("");
    const [productId , setProductId] = useState("");
    const [userid , setUserid] = useState("");
    const [favorite , setFavorite] = useState("");
    const [message ,setMessage] = useState("");
    const category= ["Candle","Backage" ,"Vazza","Stove","Distributions","Concrete"];  
    const {token}=useContext(UserContext);
//============================================================ Get All Product =================================================================
    const getAllProduct = async()=>{
        try{
            const response = await axios.get(`http://localhost:5000/product/`,{ headers: {
              Authorization: `Bearer ${token}`
          }})
           console.log(response.data);
           setProduct(response.data.product)

        }catch(error){
          console.log(error)
        }
    }

    useEffect(()=>{
        getAllProduct()
      },[])
//============================================================ Delete Product ===============================================================
    const handelDeleteProduct =async (id)=>{
        try {
            const response =await axios.delete(`http://localhost:5000/product/${id}`,{ headers: {
              Authorization: `Bearer ${token}`}})
              
              if (response.status === 200  ){
                const deleteProduct= product.filter(product =>
                  product._id !== id
                )
                setProduct(deleteProduct)
               
              }
           }catch(error){
            console.log(error);
           }
    }  


    const handelUpdateProduct = ()=>{

    }
//======================================================= Add Comment ==================================================================
    const addComment = async(id)=>{
        try{
            const response = await axios.post(`http://localhost:5000/product/${id}/comment/`,
            {comment},{ headers: {
             Authorization:`Bearer ${token}`
             }})
             console.log(response);
              setProduct(response)
              setComment("")
              if(response.data.success){
                const newData = product.map((elem ,i)=>{
                  if(elem._id === id){
                    elem.comment.push(response.data.comment)
                  }
                  return elem
                })
                setProduct(newData);
              }else throw Error
            }  
          catch(error){
            console.log(error);
          
         }
    }

//====================================================Delete Comment =====================================================================
  const handelDeleteComment =async (productId,commentId)=>{
    try {
      const response =await axios.delete(`http://localhost:5000/product/${productId}/comment/${commentId}`,{ headers: {
        Authorization: `Bearer ${token}`}})
        if(response.status === 200){
          const newDate = product.map((elem)=>{
            if(elem._id === productId){
              elem.comment=elem.comment.filter(comment => comment._id !== commentId)
            }
            return elem;
          })
          setProduct(newDate)
        }
     }catch(error){
      console.log(error);
     }
  }

      
  
  //===================================================================================================================================
    const getProductByCategory =async (id)=>{
      try{
          const response = await axios.get(`http://localhost:5000/product/categories/${id}`,{ headers: {
            Authorization: `Bearer ${token}`
        }})
         console.log(response.data.caegories);
         setProduct(response.data.product)
      }catch(error){
        console.log(error)
      }
    }
    
  

    const handelCategoryClick =async(category)=>{
      console.log(category);
       try{
        const response = await axios.get(`http://localhost:5000/product/category/${category}`,{ headers: {
          Authorization: `Bearer ${token}`
      }})
      console.log(response.data);
      setProduct(response.data.product)
      
       }catch(error){
        console.log(error);
       }

    }

    const handelAddToCart =async (productId) =>{
      try{
        const products = cartItem.fu
        
        const response = await axios.post(`http://localhost:5000/cart/` ,{product:productId , quantity:1} , { headers: {
          Authorization: `Bearer ${token}`
      }})
      console.log(response.data);
      setProduct(product.map(prd =>({
      ...prd , quantity:0
      })))
     navigate(`/cart/:productId`)
    }catch(error){
      console.log(error);
    }
    }

    const handelOnClickHome = ()=>{
      getAllProduct()
      
    }

    const addToFavorite = async (productId) =>{
      try{
        const response = await axios.post(`http://localhost:5000/favorite/add`,{productId},{ headers: {
          Authorization: `Bearer ${token}`
      }})
      console.log(response.data);
      }catch(error){
        console.log(error);
      }
    }
    
    return(
        <>

        <BiHomeHeart onClick={handelOnClickHome} />
           {/* <button onClick={handelOnClickHome}>Home</button> */}

         <div className="category">
            {category.map((category,i)=>(
              <button key={i}  onClick={()=>handelCategoryClick(category)} className="btn-category">{category}</button>
            ))}
            </div>

         <Container className="my-5">
      {/* <h2 className="text-center mb-4">لوحة التحكم</h2> */}
      <Row>
        {product.map((prod) => (
          <Col key={prod._id} md={4} className="mb-3">
            <Card>
      
              <Card.Img variant="top" src={prod.image} className="card-img-custom"
/>
              <Link to={`/product/${prod._id}`} element={<ProductDetails/>}>more details</Link>
              <Card.Body>
                <Card.Title>{prod.name}</Card.Title>
                
                <div className="d-flex justify-content-between align-items-center">
                  <Badge bg="primary" className="me-2">
                    {prod.price}jd
                  </Badge>
                  <Button
                    variant="danger"
                    onClick={() => handelDeleteProduct(prod._id)}
                  >
                    Delete
                  </Button>
                  <Button variant="info" onClick={()=>addToFavorite(prod._id)}>
                    <BiHeart />
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="mt-4 d-flex justify-content-center">
        {/* <Link to="/add-product" className="btn btn-primary me-3" on>
          إضافة منتج جديد
        </Link> */}
        <Button variant="info" onClick={getAllProduct}>
          تحديث
        </Button>
      </div>
     </Container>  

  
         {/* <button onClick={handelOnClickHome}>Home</button>
         <div className="category">
            {category.map((category,i)=>(
              <button key={i}  onClick={()=>handelCategoryClick(category)}>{category}</button>
            ))}
            </div>
            
            {product && product.map((prd) => {
      console.log(prd);
       return (
         <ul key={prd._id}>
         <li>
         <img src={prd.image} alt={prd.name} />
         <h3>{prd.name}</h3>
         <p>{prd.description}</p>
         <p>Price: {prd.price}</p>
         <p>Quantity: {prd.quantity}</p>
         {prd.comment && prd.comment.map((comment) => (
          <div key={comment._id}>
            <p>Comment: {comment.comment}</p>
            <button onClick={() => handelDeleteComment(prd._id, comment._id)}>Delete</button>
          </div>
         ))}
         <button onClick={() => handelDeleteProduct(prd._id)}>Delete</button>
         <textarea type="text" placeholder="Comment" onChange={(e) => setComment(e.target.value)}></textarea>
         <button onClick={() => addComment(prd._id)}>Add Comment</button>
         <div>
          <button onClick={() => handelAddToCart(prd._id)}>Add To Cart</button>
        </div>
      </li>
    </ul>
  );
})} */}


         
          
        
           
         {/* {product&&product.map((prd)=>{
          console.log(prd);
          return(
            <ul>
            <li key={prd._id}>
              
                <img src={prd.image}  />
                <h3>{prd.name}</h3>
                <p>{prd.description}</p>
                <p>Price:{prd.price}</p>
                <p>Quantity:{prd.quantity}</p>
                {prd.comment&& prd.comment.map(comments =>(
                  <div key={comments._id}>
                    <p>Comment:{comments.comment}</p>
                    <button onClick={()=>
                handelDeleteComment(prd._id , comments._id)}>Delete</button>
                  </div>
                ))}
              
                <button onClick={()=>
                handelDeleteProduct(prd._id)}>Delete</button>
                 <textarea type="Text" placeholder="Comment" onChange={(e)=>setComment(e.target.value)}></textarea>
                 <button onClick={()=>addComment(prd._id)}>Add Comment</button>
                 <div>
                 <button onClick={()=>handelAddToCart(prd._id)}>Add To Cart</button> 
                 </div>
                 <br/>
                <button onClick={handelAddCart}>Add To Cart</button> 
                
             </li>  
             
         

             </ul>
         
           </div> 
          
         */}
                
        </>
            
    )
}

export default Dashboard;











{/* <Container className="my-5">
      <h2 className="text-center mb-4">لوحة التحكم</h2>
      <Row>
        {product.map((prod) => (
          <Col key={prod._id} md={4} className="mb-3">
            <Card>
      
              <Card.Img variant="top" src={prod.image} onClick={()=>
                navigate("/product/:id")
              }/>
              {/* <Link to={'/product/:id'} element={<ProductDetails/>}>more details</Link> */}
              {/* <Card.Body>
                <Card.Title>{prod.name}</Card.Title>
                
                <div className="d-flex justify-content-between align-items-center">
                  <Badge bg="primary" className="me-2">
                    {prod.price}
                  </Badge>
                  <Button
                    variant="danger"
                    onClick={() => handelDeleteProduct(prod._id)}
                  >
                    حذف
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col> */}
        {/* ))}
      </Row> */}
      {/* <div className="mt-4 d-flex justify-content-center">
        <Link to="/add-product" className="btn btn-primary me-3" on>
          إضافة منتج جديد
        </Link>
        <Button variant="info" onClick={getAllProduct}>
          تحديث
        </Button>
      </div> */}
     {/* </Container>   */}