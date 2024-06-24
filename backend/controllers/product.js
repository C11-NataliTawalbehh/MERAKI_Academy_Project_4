const productModel = require("../models/productSchema")
const createNewProduct = (req ,res) =>{
    const {name , description ,price , image,quantity,comment,category,rating} =req.body;
    const user = req.token.userid;
    const newProduct = new productModel({
        name,
        description,
        price,
        image,
        quantity,
        comment,
        user,
        category,
        rating
        
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
    const user = req.token.userid;
    productModel
      .find({})
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

  const getProductByCategory =(req ,res)=>{
    const category  = req.params.category;
    const userid = req.token.userid;
    productModel 
    .find({category})
    .exec()
    .then((product)=>{
      res.status(200).json({
        success: true,
            message: `All the product`,
            userId: userid,
            product: product
      })
    })
    .catch((err)=>{
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
  })
  }
const getProductById = (req,res)=>{
   const {productId} = req.params;
  //  console.log("from get ======================> ",productId);
   const userid = req.token.userid;
   productModel
   .findById(productId)
   .then((product)=>{
    if(!product){
      return res.status(400).json({message:"product not found"})
    }
    res.status(200).json({
      success: true,
          message: `All the product`,
          userId: userid,
          product: product
    })
   })
   .catch((error)=>{
    res.status(500).json(error)
   })
}
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

const updateRating = async(req,res) =>{
  try{
    const productId = req.params.productId;
    const {rating} = req.body;
    const product = await productModel .findByIdAndUpdate(
      productId,{rating},{new:true}
    )
   if(!product){
    return res.status(404).json({
      success: false,
      message: `The product with id => ${id} not found`,
    });
   }
   res.status(200).json({
    success: true,
    message: `product deleted`,
    product:product
  });
  }catch(error){
    res.status(500).json({
      success: false,
      message: `Server Error`,
      err: error.message,
    });
  }
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


const searchProduct = async(req,res)=>{
  const {name} = req.query;
  const regex = new RegExp(name , "gi" )
  try{
    const product =await productModel.find({name:{$regex:regex}});
    if(product.length){
    return res.json(product)
    }
    throw Error
  }catch(error){
    res.status(500).json({error:"server Error"})
  }
}  
module.exports = {createNewProduct , getAllProduct ,updateProductById ,deleteProductById ,getProductByCategory ,
  searchProduct ,getProductById,updateRating};