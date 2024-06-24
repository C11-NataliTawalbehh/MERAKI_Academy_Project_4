import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../App";
import { Link, useParams } from "react-router-dom";
import { Container, Card, Button, Badge, ListGroup } from "react-bootstrap";
import { Navigate ,useNavigate  } from "react-router-dom";
import "./ProductDetails.css"
import { FaStar } from "react-icons/fa";
const ProductDetails = () => {
  const navigate = useNavigate();
  const {productId} = useParams();
// console.log(productId);
  const { token } = useContext(UserContext);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); 
  const [comment , setComment] = useState("");
  const [price ,setPrice] = useState(0)
  const [cart , setCart] = useState([])
  const [rating , setRating] = useState(0)
  const [hover , setHover] = useState(null)
  const addCart = {
    product:[{id:productId , quantity:quantity}],
    total:price * quantity,

  }
  
  const getProductDetails = async () => {
    
    try {
      const response = await axios.get(`http://localhost:5000/product/byId/${productId}`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      console.log(response.data);
      setProduct(response.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
   
    getProductDetails();
   
  }, []);

  const handelAddToCart =async () =>{
    try{
      
      const response = await axios.post(`http://localhost:5000/cart/${productId}` ,addCart, { headers: {
        Authorization: `Bearer ${token}`
    }})
    console.log(response.data.result);
      setCart(response.data.result)
      setProduct(response.data.product)
    
   navigate(`/cart/:productId`)
  }catch(error){
    console.log(error);
  }
  }

  const addComment = async(id)=>{
    console.log(id);
    try{
        const response = await axios.post(`http://localhost:5000/product/${id}/comment/`,
        {comment},{ headers: {
         Authorization:`Bearer ${token}`
         }})
         console.log(response);
          // setProduct(response.data)
          // setComment("")
          if(response.data.success){
            setProduct((prev)=>({
              ...prev , comment:[...prev.comment,response.data.comment]
            }))
            setComment("")
            // const newData = product.map((elem ,i)=>{
            //   if(elem._id === id){
            //     elem.comment.push(response.data.comment)
            //   }
            //   return elem
            // })
            // setProduct(newData);
          }else throw Error
        }  
      catch(error){
        console.log(error);
      
     }
}

const handelDeleteComment =async (productId,commentId)=>{
  try {
    const response =await axios.delete(`http://localhost:5000/product/${productId}/comment/${commentId}`,{ headers: {
      Authorization: `Bearer ${token}`}})
      if(response.status === 200){
        setProduct((prev)=>({
          ...prev,comment:prev.comment.filter((comment)=>
            comment._id !== commentId
          )
        }))
      }
      //   const newDate = product.map((elem)=>{
      //     if(elem._id === productId){
      //       elem.comment=elem.comment.filter(comment => comment._id !== commentId)
      //     }
      //     return elem;
      //   })
      //   setProduct(newDate)
      // }
   }catch(error){
    console.log(error);
   }
}


  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };


  const handleRatingChange =async (newRating)=>{
   try{
    const response = await axios.put(`http://localhost:5000/product/${productId}/updateRating`,{rating:newRating},{ headers: {
      Authorization: `Bearer ${token}`}})
      console.log(response.data.product.rating);
     setRating(response.data.product.rating);
     setProduct((prev)=>({
      ...prev , rating:response.data.rating
     }))
   }catch(error){
    console.log(error);
   }
  }
  return (
     <Container className="my-5">
      {product ?  (
        <Card>
          <Card.Img variant="top" src={product.image} />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
        <Badge bg="primary" className="me-2">
               jd{product.price}
             </Badge>
             <div className="my-3">
               <Button variant="outline-secondary" onClick={handleDecreaseQuantity}>-</Button>
               <span className="mx-2">{quantity}</span>
               <Button variant="outline-secondary" onClick={handleIncreaseQuantity}>+</Button>
             </div>
             <div className="rating">
              {[...Array(5)].map((star,index)=>{
                const ratingValue = index+1;
                return(<label key={index}>
                  <input type="radio" name="rating" value={ratingValue} onClick={()=>handleRatingChange(ratingValue)} style={{display:"none"}}/>
                  <FaStar size={30}
                  color={ratingValue <=(hover || rating) ? "#ffc107" : "#e4e5e9"} onMouseEnter={()=>setHover(ratingValue)}
                  onMouseLeave={()=>setHover(null)}/>
                </label>)
              })}
             </div>
             <Button variant="success" onClick={()=>handelAddToCart(product._id)}>Add to Cart</Button>
           </Card.Body>
           <Card.Footer>
             <h5>Comment:</h5>
             {product.comment && product.comment.map((comments)=>(
                 <div key={comments._id}>
                 <p>Comment: {comments.comment}</p>
                 <button onClick={() => handelDeleteComment(product._id, comments._id)}>Delete</button>
               </div>
             ))}
               <textarea type="text" placeholder="Comment" onChange={(e) => setComment(e.target.value)}></textarea>
               <button onClick={() => addComment(product._id)}>Add Comment</button>
             {/* <ListGroup>
     {product.comment ? (
      product.comment.map((comment, index) => (
      <React.Fragment key={index}>
        <ListGroup.Item>{comment.comment}
        <textarea type="text" placeholder="Comment" onChange={(e) => setComment(e.target.value)}></textarea>
        <Button variant="success" onClick={() => addComment(product._id)}>Add Comment</Button>
        <Button variant="danger" onClick={() => handelDeleteComment(product._id, comment._id)}>Delete</Button>
        </ListGroup.Item>
      </React.Fragment>
    ))
     ) : (
    <ListGroup.Item>No comments available.</ListGroup.Item>
  )}
   </ListGroup> */}
             {/* <ListGroup>
               {product.comment?.map((comment, index) => (
                 <>
                 <ListGroup.Item key={index}>{comment.comment}</ListGroup.Item>
                 <Button variant="success" onClick={()=>addComment(product._id)}>add comment</Button>
                 <Button variant="success" onClick={()=>handelDeleteComment(product._id , comment._id)}>Delete</Button>
                </>
               ))}
             </ListGroup> */}
           </Card.Footer>
         </Card>
       ) : (
         <p className="text-center">loading...</p>
       )}
     </Container>
  );
};

export default ProductDetails;
