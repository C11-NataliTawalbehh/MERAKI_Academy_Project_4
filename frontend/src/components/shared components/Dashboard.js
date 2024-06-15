import axios from "axios";
import { useState,useContext ,useEffect} from "react";
import { UserContext } from "../../App";
import AddFavorite from "./AddFavorite";
import AddCategory from "./AddCategory";
import { Navigate ,useNavigate } from "react-router-dom";
const Dashboard = ()=>{
  const navigate = useNavigate();
    const [product , setProduct] = useState([])
    // const [categories , setCategories] = useState([])

    const [name , setName] = useState("");
    const [categoryName , setCategoryName] = useState("")
    const [description , setDescription] =useState("");
    const [price ,setPrice] = useState("");
    const [quantity ,setQuantity] = useState("");
    const [comment , setComment] = useState("");
    const [user , setUser] = useState("");
    const [productId , setProductId] = useState("");
    const [userid , setUserid] = useState("");
    const [favorite , setFavorite] = useState("");
    const [message ,setMessage] = useState("");
    const category = ["candel","backage"];
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

//===================================================== Get All Category =================================================================    
    // const getAllCategory =async ()=>{
    //     try{
    //         const response = await axios.get("http://localhost:5000/categories/",{ headers: {
    //           Authorization: `Bearer ${token}`
    //       }})
    //       //  console.log(response.data.caegory);
    //        setCategories(response.data.categories)
    //     }catch(error){
    //       console.log(error)
    //     }
    // }

    //  useEffect(()=>{
    //     getAllCategory()
    //   },[token])
    // if (!product){
    //   return "hi"
    // }

//===================================================== Get All Category By Id =============================================================
  //  const handelCategoryById = async(id)=>{
  //  try{
  //   const response = await axios.get(`http://localhost:5000/categories/${id}`,{ headers: {
  //     Authorization: `Bearer ${token}`
  // }})
  // console.log(response);
  // if(response.data.product){
  //   setProduct(response.data.product)
  //   setCategories(response.data.categories)
  // }
  // console.log(response.data);
  // // setProduct(response.data.product)
  //  }catch (error){
  //   console.log(error);
  //  }
  //  }
//====================================================== Delete Category ====================================================================
    // const handelDeleteCategory = async(id)=>{
    //     try {
    //         const response =await axios.delete(`http://localhost:5000/categories/${id}`,{ headers: {
    //           Authorization: `Bearer ${token}`}})
              
    //           if (response.status === 200  ){
    //             const deleteCategory= categories.filter(category =>
    //               category._id !== id
    //             )
    //             setCategories(deleteCategory)
        
    //           }
    //        }catch(error){
    //         console.log(error);
    //        }
    // }  

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
  
    // const getProductByCategory =async (id)=>{
    //   try{
    //       const response = await axios.get(`http://localhost:5000/product/categories/${id}`,{ headers: {
    //         Authorization: `Bearer ${token}`
    //     }})
    //      console.log(response.data.caegories);
    //      setProduct(response.data.product)
    //   }catch(error){
    //     console.log(error)
    //   }
    // }
    
    // useEffect(()=>{
    //   getProductByCategory()
    // },[])

    const handelCategoryClick =async(categoryName)=>{
       try{
        const response = await axios.get(`http://localhost:5000/product/category/${categoryName}`,{ headers: {
          Authorization: `Bearer ${token}`
      }})
      console.log(response.data);
      setProduct(response.data.product)
       }catch(error){
        console.log(error);
       }

    }

    const handelOnClickHome = ()=>{
      getAllProduct()
      
    }
    return(
        <>
         <button onClick={handelOnClickHome}>Home</button>
         <div className="category">
            {category.map((category,i)=>(
              <button key={i}  onClick={()=>handelCategoryClick(category)}>{category}</button>
            ))}
            </div>
            
          {/* <div>
           <button onClick={addFavorite}>Favorite</button>
           {message&& <p>{message}</p>} 
            </div>   */}


        <div>
        <ul>
           
         {product&&product.map((prd)=>{
          return(
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
                
            </li>
          )
                 })}
        </ul>
        </div> 
        </>
    )
}

export default Dashboard;