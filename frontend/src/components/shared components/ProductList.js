import React from "react";

// const ProductList =({product})=>{
//     return (
//         <>
//       {product.length === 0 ? (
//         <p>No Product Found</p>
//       ):(<ul>
//         {product.map((prd)=>(
//             <li key={prd._id}>
//                 <h2>{prd.name}</h2>
//                 <p>{prd.description}</p>
//                 <p>Price:{prd.price}</p>
//                 <p>Quantity:{prd.quantity}</p>

//                 {prd.comment&& prd.comment.map(comments =>(
//                   <div key={comments._id}>
//                     <p>Comment:{comments.comment}</p>
//                     <button onClick={()=>
//                 handelDeleteComment(prd._id , comments._id)}>Delete</button>
//                   </div>
//                 ))}


//             </li>
//         ))}
//       </ul>)}
//       </>
//     )
// }