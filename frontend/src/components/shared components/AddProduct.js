import axios from "axios";
import { useState ,useContext } from "react";
import { UserContext } from "../../App";

const AddProduct = ()=>{
    const [image, setImage ] = useState("");
    const [ url, setUrl ] = useState("");
    const [name , setName] = useState("")
    const [description , setDescription] =useState("");
    const [price ,setPrice] = useState("");
    const [quantity ,setQuantity] = useState("");
    const [message , setMessage] = useState("")
    const {token }=useContext(UserContext)
 const handelOnClicAddProduct = ()=>{
    const newProduct = {
        name,
        description,
        price,
        image,
        quantity,
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