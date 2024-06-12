import axios from "axios";
import { useState,useContext ,useEffect} from "react";
import { UserContext } from "../../App";
const Dashboard = ()=>{
    const [product , setProduct] = useState(null)
    const [category , setCategory] = useState([])
    const [image, setImage ] = useState("");
    const [ url, setUrl ] = useState("");
    const [name , setName] = useState("");
    const [description , setDescription] =useState("");
    const [price ,setPrice] = useState("");
    const [quantity ,setQuantity] = useState("");
    const [comment , setComment] = useState("");
    const [user , setUser] = useState("");
    const [favorit , setFavorit] = useState("");
    const {token }=useContext(UserContext);
//============================================================ Get All Product =================================================================
    const getAllProduct = async()=>{
        try{
            const response = await axios.get("http://localhost:5000/product/",{ headers: {
              Authorization: `Bearer ${token}`
          }})
           console.log(response.data.product);
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
  const handelDeleteComment =async (id)=>{
    try {
      const response =await axios.delete(`http://localhost:5000/product/${id}/comment`,{ headers: {
        Authorization: `Bearer ${token}`}})
        
        if (response.status === 200  ){
          const deleteComment= comment.filter(comment =>
            category._id !== id
          )
          setComment(deleteComment)
  
        }
     }catch(error){
      console.log(error);
     }
  }

//===================================================== Get All Category =================================================================    
    const getAllCategory =async ()=>{
        try{
            const response = await axios.get("http://localhost:5000/product/category",{ headers: {
              Authorization: `Bearer ${token}`
          }})
          //  console.log(response.data.caegory);
           setCategory(response.data.category)
        }catch(error){
          console.log(error)
        }
    }

     useEffect(()=>{
        getAllCategory()
      },[product])
    if (!product){
      return "hi"
    }
//====================================================== Delete Category ====================================================================
    const handelDeleteCategory = async(id)=>{
        try {
            const response =await axios.delete(`http://localhost:5000/product/${id}/category`,{ headers: {
              Authorization: `Bearer ${token}`}})
              
              if (response.status === 200  ){
                const deleteCategory= category.filter(category =>
                  category._id !== id
                )
                setCategory(deleteCategory)
        
              }
           }catch(error){
            console.log(error);
           }
    }  
    return(
        <>
         <div className="category">
                {category.map((category)=>
                (<>
                <h3>{category.name}</h3>
                <button onClick={()=>handelDeleteCategory(category._id)}>Delete</button>
                </> ))}
            </div>
        <ul>
           
         {product?product.map((prd)=>{
          return(
            <li key={prd._id}>
                <h3>{prd.name}</h3>
                <p>{prd.description}</p>
                <p>Price:{prd.price}</p>
                <p>Quantity:{prd.quantity}</p>
                <img src={prd.image}  />
                <button onClick={()=>
                handelDeleteProduct(prd._id)}>Delete</button>
                 <textarea type="Text" placeholder="Comment" onChange={(e)=>setComment(e.target.value)}></textarea>
                 <button onClick={()=>addComment(prd._id)}>Add Comment</button>
                 <button onClick={()=>
                handelDeleteComment(prd._id)}>Delete</button>
            </li>
          )
                 }):""}
        </ul>
        </>
    )
}

export default Dashboard;