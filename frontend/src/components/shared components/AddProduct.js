import axios from "axios";
import { useState ,useContext, useEffect } from "react";
import { UserContext } from "../../App";
import Category from "./Category";
const AddProduct = ()=>{
    const [image, setImage ] = useState("");
    const [ url, setUrl ] = useState("");
    const [name , setName] = useState("")
    const [description , setDescription] =useState("");
    const [price ,setPrice] = useState("");
    const [quantity ,setQuantity] = useState("");
    const [selectedCategory ,setSelectedCategory] = useState("")
    const [categoryName , setCategoryName] = useState("")
    const [comment , setComment] = useState("");
    const [user ,setUser] = useState("");
    const [message , setMessage] = useState("");
    const {token }=useContext(UserContext)
    const [category ,setCategory ]= useState(["candel","backage"]);
//========================================================= Add Product ===================================================================    
 const handelOnClicAddProduct = ()=>{
    const newProduct = {
        name,
        description,
        price,
        image:url,
        quantity,
        category:categoryName
    
    }

  axios.post("http://localhost:5000/product/",newProduct,{headers:{
    Authorization:`Bearer ${token}` 
  }})
  .then((result)=>{
    console.log(result);
    setMessage(result.data.message)
  })
  .catch((error)=>{
    setMessage(error.response.data.message)
    
  })
 }

//  const getAllCategory =async ()=>{
//   try{
//       const response = await axios.get("http://localhost:5000/categories/",{ headers: {
//         Authorization: `Bearer ${token}`
//     }})
//     //  console.log(response.data.caegories);
//      setCategories(response.data.categories)
//   }catch(error){
//     console.log(error)
//   }
// }

// useEffect(()=>{
//   getAllCategory()
// },[])
//================================================================= Upload Image =================================================================
 const uploadImage = () => {
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "mbz8udcz")
    data.append("cloud_name","do0c8tkck")
    axios.post("https://api.cloudinary.com/v1_1/do0c8tkck/image/upload",data)
    .then(data => {
      console.log(data.data);
    setUrl(data.data.url)
    })
    .catch(err => console.log(err))
    }

return(
    <>
    <p>Add Product</p>
    <label>Name:</label>
    <input type="text" placeholder="name" onChange={(e)=>{
        setName(e.target.value)
    }}/>
    <br />
    <label>Description:</label>
    <textarea placeholder="description" onChange={(e)=>{
        setDescription(e.target.value)
    }}></textarea>
    <br />
    <label>Price:</label>
    <input type="text" placeholder="price" onChange={(e)=>{
        setPrice(e.target.value)
    }}/>
    <br/>
    {/* <input type="text" placeholder="categoryName" onChange={(e)=>{
        setCategoryName(e.target.value)
    }}/> */}
    
    <br/>
    {/* <Category setCategory={setCategory} /> */}
    <label>Category:</label>
    <select value={categoryName} onChange={(e)=>setCategory(e.target.value)} required>
    <option value="">Select Category</option>
    {category.map((category , i)=>(
        <option key={i} value={category}>{category}</option>
    ))}
    </select>
    <br />
    <label>Image URL:</label>
    <div>
    <input type="file" onChange= {(e)=> setImage(e.target.files[0])}></input>
    <button onClick={uploadImage}>Upload</button>
    </div>
    {/* <h1>Uploaded image will be displayed here</h1> */}
    <img src={url}/>
    {/* <input type="text" placeholder="image" onChange={(e)=>{
        setImg(e.target.value)
    }}/> */}
    <br/>
    <label>Quantity</label>
    <input type="text" placeholder="quantity" onChange={(e)=>{
        setQuantity(e.target.value)
    }}/>
    <br />
    <button onClick={handelOnClicAddProduct}>Add Product</button>
    {message && <p>{message}</p>}
    </>
)
}

export default AddProduct;


