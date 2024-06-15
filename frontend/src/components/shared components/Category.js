// import React,{useEffect , useState,useContext} from "react"
// import axios from "axios";
// import { UserContext } from "../../App";
// const Category = ()=>{
//     const [product , setProduct] = useState([]);
//     const [category ,setCategory] = useState("");
//     const {token }=useContext(UserContext);
// const getProductByCategory =async (id)=>{
//     try{
//         const response = await axios.get(`http://localhost:5000/product/category/${id}`,{ headers: {
//           Authorization: `Bearer ${token}`
//       }})
//       //  console.log(response.data.caegories);
//        setProduct(response.data.categories)
//     }catch(error){
//       console.log(error)
//     }
//   }
  
//   useEffect(()=>{
//     getProductByCategory()
//   },[])

// return (
//     <div>
//    <label>Category:</label>
//     <select value={category} onChange={(e)=>setCategory(e.target.value)} required>
//     <option value="">{category.categoryName}</option>
//     {categories.map((cat)=>(
//     <option key={cat._id} value={cat._id}>{cat.categoryName}</option>
//     ))}
//     </select>
//         {product.length > 0 ? ( 
//          product.map(pr =>(
//              <div key={pr._id}>
//              <h1>{pr.name}</h1>
//                <p>{pr.description}</p>
//               <p>${pr.price}</p>

//              </div>
//          ))
//         ): (
//          <p>NO Oroduct found in this categore</p>
//         )}

    
//      </div>
// )

// }

// export default Category;