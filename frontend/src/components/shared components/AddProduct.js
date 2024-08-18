import axios from "axios";
import { useState ,useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { Container, Row, Col, Form, Button, Alert ,Image } from "react-bootstrap";
import "./AddProduct.css"
const AddProduct = ()=>{
    const [image, setImage ] = useState([]);
    const [ url, setUrl ] = useState([]);
    const [name , setName] = useState("")
    const [description , setDescription] =useState("");
    const [price ,setPrice] = useState("");
    const [quantity ,setQuantity] = useState("");
    const [selectedCategory ,setSelectedCategory] = useState("")
    const [categoryName , setCategoryName] = useState("")
    const [comment , setComment] = useState("");
    const [user ,setUser] = useState("");
    const [message , setMessage] = useState("");
    const [rating ,setRating] = useState(0)
    const {token}=useContext(UserContext)
    const category= ["Candle","Backage" ,"Vazza","Stove","Distributions","Concrete"];  
 
//========================================================= Add Product ===================================================================    
 const handelOnClicAddProduct = ()=>{
    const newProduct = {
        name,
        description,
        price,
        image:url,
        quantity,
        category:selectedCategory,
        rating,
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
     <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card add-product-card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Add a new product</h2>
              {message && <div className="alert alert-info">{message}</div>}
              <form>
                <div className="mb-3">
                  <label htmlFor="productName" className="form-label">
                    Product name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="productName"
                    placeholder="Enter product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="productDescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="productDescription"
                    rows="3"
                    placeholder="Enter product description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="productPrice" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="productPrice"
                    placeholder="Enter the price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="productQuantity" className="form-label">
                    Quantity
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="productQuantity"
                    placeholder="Enter the quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="productCategory" className="form-label">
                    Category
                  </label>
                  <select
                    className="form-control"
                    id="productCategory"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">Select category</option>
                    {category.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="productImage" className="form-label">
                    Product image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="productImage"
                    onChange={uploadImage}
                  />
                </div>

                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={handelOnClicAddProduct}
                >
                  Add product
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    </>
)
}

export default AddProduct;


