import axios from "axios";
import { useState ,useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { Container, Row, Col, Form, Button, Alert ,Image } from "react-bootstrap";
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
          <h2 className="text-center my-4">إضافة منتج جديد</h2>
          {message && <Alert variant="info">{message}</Alert>}
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>اسم المنتج</Form.Label>
              <Form.Control
                type="text"
                placeholder="أدخل اسم المنتج"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formDescription" className="mt-3">
              <Form.Label>الوصف</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="أدخل وصف المنتج"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPrice" className="mt-3">
              <Form.Label>السعر</Form.Label>
              <Form.Control
                type="number"
                placeholder="أدخل السعر"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formQuantity" className="mt-3">
              <Form.Label>الكمية</Form.Label>
              <Form.Control
                type="number"
                placeholder="أدخل الكمية"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formCategory" className="mt-3">
              <Form.Label>الفئة</Form.Label>
              <Form.Control
                as="select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">اختر الفئة</option>
                {category.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formImage" className="mt-3">
              <Form.Label>صورة المنتج</Form.Label>
              <Form.Control
                type="file"
                
                onChange={(e) => setImage(e.target.files[0])}
              />
              <Button className="mt-2" onClick={uploadImage}>
                رفع الصورة
              </Button>
             </Form.Group>
            {/* <Form.Group className="mt-3">
              <Form.Label>الصور المحمله</Form.Label>
              <Row>
                {url.map((urls , i)=>(
                <Col key={i} md={4}>
                  <Image src={urls} thumbnail />
                </Col>
                ))}
              </Row>
            </Form.Group>  */}
            
            <Button
              variant="primary"
              className="mt-4"
              onClick={handelOnClicAddProduct}
            >
              إضافة المنتج
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    {/* <p>Add Product</p>
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
    <br/> */}
    {/* <input type="text" placeholder="categoryName" onChange={(e)=>{
        setCategoryName(e.target.value)
    }}/> */}
    
    {/* <br/> */}
    {/* <Category setCategory={setCategory} /> */}
    {/* <label>Category:</label>
    <select value={categoryName} onChange={(e)=>setCategoryName(e.target.value)} required>
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
    </div> */}
    {/* <h1>Uploaded image will be displayed here</h1> */}
    {/* <img src={url}/> */}
    {/* <input type="text" placeholder="image" onChange={(e)=>{
        setImg(e.target.value)
    }}/> */}
    {/* <br/>
    <label>Quantity</label>
    <input type="text" placeholder="quantity" onChange={(e)=>{
        setQuantity(e.target.value)
    }}/>
    <br />
    <button onClick={handelOnClicAddProduct}>Add Product</button>
    {message && <p>{message}</p>} */}
    </>
)
}

export default AddProduct;


