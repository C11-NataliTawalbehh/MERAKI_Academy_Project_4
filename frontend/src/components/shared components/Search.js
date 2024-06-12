// import { useEffect, useState } from "react"
// import axios from "axios";
// import { search } from "../../../../backend/routes/product";
// const Search = ()=>{
//     const [query ,setQuery] = useState("");
//     const [product , setProduct] = useState([])
//     useEffect(()=>{
//       axios.get(`http://localhost:5000/product/search`)
//       .then((result)=>{
//        setProduct(result.data)
//       })
//       .catch((error)=>{
//         console.log(error);
//       })
//     },[])

//     return(
//         <>
//         <input placeholder="Search" onChange={(e)=>{
//             setQuery(e.target.value)
//         }}/><br/>
//         {product && product.filter(product =>{
//             if(query === ""){
//                 return product;
//             }else if(product.name.toLowerCase().includes(query.toLocaleLowerCase())){
//                 return product
//             }
//         }).map((product,i)=>{
//             <div className="box" key={i}>
//                 <p>{product.name}</p>
//             </div>
//         })}
//         </>
//     )
// }

// export default search;