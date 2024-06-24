import { UserContext } from "../../App";
import React, { useState , useEffect , useContext } from 'react';
import { Navigate ,useNavigate ,Link } from "react-router-dom";
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
const Search = ({setSearchResult ,searchResult}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  console.log(query);
  const [products, setProducts] = useState([]);
  const { token } = useContext(UserContext);



  const handelSearch = async(e)=>{
    e.preventDefault()
    try{
      const response = await  axios.get(`http://localhost:5000/product/search_1?name=${query}`,{ headers: {
               Authorization: `Bearer ${token}`
           }})
           setSearchResult(response.data)
    }catch(error){
      console.log(error);
    }
  }

  // useEffect(() => {
  //   if(query.trim() === "") {
  //     // جلب جميع المنتجات عند تحميل الصفحة
  //     axios.get('http://localhost:5000/product', { 
  //       headers: {
  //         Authorization:`Bearer ${token}`
  //       }
  //     })
  //     .then(response => {
  //       console.log(response.data);
  //       setProducts(response.data);
  //       setSearchResult(response.data);
  //     })
  //     .catch(error => console.error(error));
  //   }
  // }, [query, setSearchResult, token]);

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   if (query.trim() === '') {
  //     // إذا كان مربع البحث فارغ، أعرض جميع المنتجات
  //     axios.get('http://localhost:5000/product', {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     })
  //     .then(response => {
  //       setSearchResult(response.data);
      
  //     })
  //     .catch(error => console.error(error));
  //   } else {
  //     // البحث عن المنتجات المطابقة
  //     axios.get(`http://localhost:5000/product/search_1?name=${query}`, { 
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     })
  //     .then(response => {
  //       setSearchResult(response.data);

  //     })
  //     .catch(error => console.error(error));
  //   }
  // };



    return(

        <Container>
        <Row className="justify-content-md-center">
          <Col md="8">
            <Form onSubmit={handelSearch}>
              <Form.Group controlId="formSearch">
                <Form.Control 
                  type="text" 
                  placeholder="ابحث عن المنتج..." 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                بحث
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
}

export default Search;





















  // const navigate = useNavigate();
  //   const [searchTerm, setSearchTerm] = useState('');
  //   const [query, setQuery] = useState('');
  // const [products, setProducts] = useState([]);
  // const {token}=useContext(UserContext);
  // useEffect(() => {
  //   if(query.trim() === ""){
  //   // جلب جميع المنتجات عند تحميل الصفحة
  //   axios.get('http://localhost:5000/product' ,{ headers: {
  //       Authorization: `Bearer ${token}`
  //   }})
  
  //     .then((response) =>{
  //       console.log(response.data);
  //        setProducts(response.data)})
  //     .catch(error => console.error(error));
  //   }
  // }, [query , setSearchResult]);

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   if (query.trim() === '') {
  //     // إذا كان مربع البحث فارغ، أعرض جميع المنتجات
  //     axios.get('http://localhost:5000/product')
  //       .then(response => setSearchResult(response.data))
  //       .catch(error => console.error(error));
  //   } else {
  //     // البحث عن المنتجات المطابقة
  //     axios.get(`http://localhost:5000/product/search_1?name=${query}`,{ headers: {
  //       Authorization: `Bearer ${token}`
  //   }})
  //       .then((response) =>{
  //         setSearchResult(response.data)
  //         navigate("/")
  //       })
  //       .catch(error => console.error(error));
  //   }
  // };
      //   <div>
    //   <h2>Search Product</h2>
    //   <input
    //     type="text"
    //     value={query}
    //     onChange={(e) => setQuery(e.target.value)}
    //     placeholder="Enter product name"
    //   />
    //   <button onClick={handleSearch}>Search</button>

    //   <div>
    //     {searchResult.length > 0 ? (
    //       <ul>
    //         {searchResult.map((product) => (
    //           <li key={product._id}>
    //             <p>{product.name}</p>
    //             <p>{product.description}</p>
    //             <p>Price: {product.price}</p>
    //           </li>
    //         ))}
    //       </ul>
    //     ) : (
    //       <p>No products found.</p>
    //     )}
    //   </div>
    // </div>



// import { useEffect, useState } from "react";
// import axios from "axios";
// import { IoSearchOutline } from "react-icons/io5";
// import { useNavigate, useLocation } from "react-router-dom";
// const Search = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [error, setError] = useState("");
//   const [product, setProduct] = useState([]);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const query = new URLSearchParams(location.search);
//     const name = query.get("name");
//     if (name) {
//       setSearchTerm(name);
//       handelSearch(name);
//     }
//   }, [location.search]);

//   const handelSearch = (term) => {
//      axios.get(`http://localhost:5000/product/search_1?name=${term}`)
//       .then((result) => {
//         setProduct(result.data);
//         setError("");
//       })
//       .catch((error) => {
//         console.log(error);
//         setError("server error");
//       });
//   };

//   useEffect(()=>{
//    if(searchTerm === ""){
//     navigate("/Dashboard")
//    }
//   },[searchTerm , navigate])

//   const onSearchClick = () => {
//     if(searchTerm.trim() !== ""){
//     navigate(`/search?name=${searchTerm}`);
//     }else{
//     navigate(-1)
    
//     }
//   };

//   return (
//     <>
//       <input
//         type="text"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         placeholder="search product name"
//       />
//       <IoSearchOutline onClick={onSearchClick} />

//       {error && <p>{error}</p>}
//       <ul>
//         {product.map((prd) => (
//           <li key={prd._id}>
//             <img src={prd.image} />
//             <h2>{prd.name}</h2>
//             <p>{prd.description}</p>
//             <p>Price: {prd.price}</p>
//             <p>Quantity: {prd.quantity}</p>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// };

 





// import { useEffect, useState } from "react"
// import axios from "axios";
// import { IoSearchOutline } from "react-icons/io5";
// const Search = ()=>{
//     const [searchTerm ,setSearchTerm] = useState("");
//     const [error , setError] = useState("")
//     const [product , setProduct] = useState([])
//     const navigate = useNavigate()
    
//     const handelSearch = () =>{
//       axios.get(`http://localhost:5000/product/search_1?name=${searchTerm}`)
//       .then((result)=>{
//        setProduct(result.data)
//        setError("")
//       })
//       .catch((error)=>{
//         console.log(error);
        
//         setError("server error")
//       })
//     }

//     return(
//         <>
//         <input type="text" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder="search product name" />
//         <IoSearchOutline onClick={handelSearch} />

//         {error&&<p>{error}</p>}
//         <ul>
//             {product.map((prd)=>(
//                 <>
//                 <img src={prd.image} />
//                 <h2 key={prd._id}>{prd.name}</h2>
//                 <p>{prd.description}</p>
//                 <p>Price:{prd.price}</p>
//                 <p>Quantity:{prd.quantity}</p>
//                 </>
//             ))}
//         </ul>
//         </>
//     )
// }

// export default Search;