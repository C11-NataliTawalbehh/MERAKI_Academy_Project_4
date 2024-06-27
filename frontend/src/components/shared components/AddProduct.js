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
// const uploadImage = () => {
//   if(image.length === 0){
//     setMessage("please select image to upload")
//     return;
//   }
//   const promises = image.map(images => {
//       const data = new FormData();
//       data.append("file", images);
//       data.append("upload_preset", "mbz8udcz");
//       data.append("cloud_name","do0c8tkck");

//       return axios.post("https://api.cloudinary.com/v1_1/do0c8tkck/image/upload", data)
//           .then(response => response.data.url)
//           .catch(err => console.log(err));
//   });

//   Promise.all(promises)
//       .then(results => {
//         const validUrls = results.filter(url => url !== null)
//           setUrl(validUrls);
//           console.log(validUrls);
//       })
//       .catch(err => console.log(err));
// }

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
    <Container>
      <Row className="justify-content-md-center">
        <Col md="6">
        
          <h2 className="text-center my-4">Add a new product</h2>
          {message && <Alert variant="info">{message}</Alert>}
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Product name</Form.Label>
              <Form.Control
                type="text"
                placeholder="product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formDescription" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter product description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPrice" className="mt-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter the price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formQuantity" className="mt-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter the quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formCategory" className="mt-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select caegory</option>
                {category.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formImage" className="mt-3">
              <Form.Label>product image</Form.Label>
              <Form.Control
                type="file"
                
                onChange={(e) => setImage(e.target.files[0])}
              />
              <Button className="mt-2" onClick={uploadImage}>
                Uploaded
              </Button>
             </Form.Group>
            <Button
              variant="primary"
              className="mt-4"
              onClick={handelOnClicAddProduct}
            >
              Add product
            </Button>
          </Form>
          
        </Col>
      </Row>
    </Container>

    </>
)
}

export default AddProduct;


