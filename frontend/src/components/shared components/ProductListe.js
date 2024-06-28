
// import React from 'react';
// import { Card, Row, Col } from 'react-bootstrap';
// import { useState,useContext ,useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import { UserContext } from '../../App';
// import axios from 'axios';
// const ProductList = ({searchResult})=> {

 
//   return (
  
//     <Row>
//      <div>
//       {searchResult && searchResult.length > 0 ? (
//         <ul>
//           {searchResult.map((item) => (
//             <li key={item.id}>{item.name}</li>
//           ))}
//         </ul>
//       ) : (
//         <p>No products found.</p>
//       )}
//     </div>
//     </Row>
//   );
// }

// export default ProductList;
















// import React, { useState, useEffect, useContext } from 'react';
// import { useParams } from 'react-router-dom';
// import { Container, Row, Col, Card } from 'react-bootstrap';
// import axios from 'axios';
// import { UserContext } from "../../App";
// const ProductDetails = () => {
//   const { token } = useContext(UserContext);
//   const { id } = useParams(); // استخلاص معلمة المنتج من URL
//   const [product, setProduct] = useState([]); // حالة لتخزين تفاصيل المنتج

//   useEffect(() => {
//     // جلب تفاصيل المنتج عند تحميل الصفحة
//     axios.get(`http://localhost:5000/product/${id}`,{
//       headers: {Authorization: `Bearer ${token}`},
//     })
//       .then(response => {
//         setProduct(response.data); // تعيين بيانات المنتج من الاستجابة
//       })
//       .catch(error => console.error(error));
//   }, []); // يتم إعادة جلب التفاصيل عندما يتغير معرف المنتج (id)

//   if (!product) {
//     return <div>جارٍ التحميل...</div>; // عرض رسالة تحميل أثناء جلب البيانات
//   }

//   return (
//          <Row>
//            {product.map((product) => (
//              <Col key={product.id} sm="12" md="6" lg="4">
//                <Card className="mb-3">
//                  <Card.Img variant="top" src={product.image} />
//                  <Card.Body>
//                    <Card.Title>{product.name}</Card.Title>
//                    <Card.Text>
//                      {product.price} 
//                    </Card.Text>
//                  </Card.Body>
//                </Card>
//              </Col>
//            ))}
//          </Row>
//        );
// }

// export default ProductDetails;












// import axios from "axios";
// import { useState ,useContext } from "react";
// import { UserContext } from "../../App";
// const AddCategory = () =>{
//     const [categoryName , setCategoryName] = useState("")
//     const [message , setMessage] = useState("")
//     const {token }=useContext(UserContext)
//     const handelOnClick = ()=>{
//         axios.post("http://localhost:5000/categories/",{categoryName},{headers:{
//             Authorization:`Bearer ${token}`
//         }})
//             .then((result)=>{
//                 console.log(result);
//              setMessage(result.data.message)
//              setCategoryName("")
//             })
//             .catch((error)=>{
//               setMessage(error.data)  
//             })
//     }
//     return(
//         <>
//         <p>Add Category</p>
//         <input type="text" placeholder="name" onChange={(e)=>{
//             setCategoryName(e.target.value)
//         }}/>
//         <br/>
//         <button onClick={handelOnClick}>Add Category</button>
//         </>
//     )
// }

// export default AddCategory;