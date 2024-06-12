const productModel = require("../models/productSchema")
const createNewProduct = (req ,res) =>{
    const {name , description ,price , image,quantity,comment,category} =req.body;
    const user = req.token.userId;
    const newProduct = new productModel({
        name,
        description,
        price,
        image,
        quantity,
        category,
        comment,
        user,
    })
    
    newProduct
    .save()
    .then((result)=>{
     res.status(201).json({success: true,
        message: "product created",
        product:result})
    })
    .catch((error)=>{
     res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message
     })
    })
}


const getAllProduct = (req, res) => {
    const user = req.token.userId
    productModel
      .find({user})
      .populate("category")
      .populate("comment")
      .exec()
      .then((product) => {
          res.status(200).json({
            success: true,
            message: `All the product`,
            userId: user,
            product: product,
          });
        }) 
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: `Server Error`,
          err: err.message,
        });
      });
  };

const updateProductById = (req,res)=>{
    const id = req.params.id;
    const filter = req.body;
    Object.keys(filter).forEach((key) => {
      filter[key] == "" && delete filter[key];
  });

  productModel
  .findByIdAndUpdate({ _id: id }, req.body, { new: true })
  .then((newproduct) => {
    if (!newproduct) {
      return res.status(404).json({
        success: false,
        message: `The product with id => ${id} not found`,
      });
    }
    res.status(202).json({
      success: true,
      message: `product updated`,
      product: newproduct,
    });
  })
  .catch((err) => {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      err: err.message,
    });
  });
}  


const deleteProductById = (req, res) => {
    const id = req.params.id;
    productModel
      .findByIdAndDelete(id)
      .then((result) => {
        if (!result) {
          return res.status(404).json({
            success: false,
            message: `The product with id => ${id} not found`,
          });
        }
        res.status(200).json({
          success: true,
          message: `product deleted`,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: `Server Error`,
          err: err.message,
        });
      });
  };

// const searchProduct = async(req,res)=>{
//   const {query} = req.query;
//   try{
//     const product =await productModel.find({name:{$regex:query , $options:"i"}});
//     res.json(product)
//   }catch(error){
//     res.status(500).json({error:"server Error"})
//   }
// }  
module.exports = {createNewProduct , getAllProduct ,updateProductById ,deleteProductById };