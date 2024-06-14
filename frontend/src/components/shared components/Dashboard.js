import axios from "axios";
import { useState,useContext ,useEffect} from "react";
import { UserContext } from "../../App";
import AddFavorite from "./AddFavorite";
import AddCategory from "./AddCategory";
const Dashboard = ()=>{
    const [product , setProduct] = useState([])
    const [category , setCategory] = useState([])
    const [name , setName] = useState("");
    const [description , setDescription] =useState("");
    const [price ,setPrice] = useState("");
    const [quantity ,setQuantity] = useState("");
    const [comment , setComment] = useState("");
    const [user , setUser] = useState("");
    const [productId , setProductId] = useState("");
    const [userid , setUserid] = useState("");
    const [favorite , setFavorite] = useState("");
    const [message ,setMessage] = useState("");
    
    const {token }=useContext(UserContext);
//============================================================ Get All Product =================================================================
    const getAllProduct = async()=>{
        try{
            const response = await axios.get(`http://localhost:5000/product/`,{ headers: {
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
      },[])
    // if (!product){
    //   return "hi"
    // }

//===================================================== Get All Category By Id =============================================================
   const handelCategoryById = async(id)=>{
   try{
    const response = await axios.get(`http://localhost:5000/product/category/${id}`,{ headers: {
      Authorization: `Bearer ${token}`
  }})
  console.log(response);
  if(response.data.product){
    setProduct(response.data.product)
  }
  console.log(response.data);
  // setProduct(response.data.product)
   }catch (error){
    console.log(error);
   }
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

 //====================================================== Add Favorite =====================================================================
    // const addFavorite = async()=>{
    //   // if(!userid || !productId){
      
    //   //    return setMessage("user id and favorite product id are required")
        
    //   // }
    //   try{
    //  const response = await axios.put("http://localhost:5000/favorite/",{userid ,favorite:productId},{ headers: {
    //   Authorization: `Bearer ${token}`}})
       
    //    setMessage(response.data.message)
    //  }catch(error){
    //    setMessage(error.response.data.message)
    //  }}

    return(
        <>

         <div className="category">
                {category.map((category)=>
                (<>
                <div key={category._id}>
                <button onClick={()=>handelCategoryById(category._id)}>{category.name}</button>
                <button onClick={()=>handelDeleteCategory(category._id)}>Delete</button>
                </div>
                </> ))}
            </div>
          {/* <div>
           <button onClick={addFavorite}>Favorite</button>
           {message&& <p>{message}</p>} 
            </div>   */}
        <ul>
           
         {product&&product.map((prd)=>{
          return(
            <li key={prd._id}>
                <img src={prd.image}  />
                <h3>{prd.name}</h3>
                <p>{prd.description}</p>
                <p>Price:{prd.price}</p>
                <p>Quantity:{prd.quantity}</p>
                <p>{prd.category}</p>
                {/* <AddCategory category={prd.category} /> */}
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
                
            </li>
          )
                 })}
        </ul>
        </>
    )
}

export default Dashboard;