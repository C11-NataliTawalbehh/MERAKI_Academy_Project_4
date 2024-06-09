const productModel = require("../models/productSchema")

const createNewProduct = (req ,res) =>{
    const {name , description ,price , img,quantity,comment,category} =req.body;
    const user = req.token.userId;
    const newProduct = new productModel({
        name,
        description,
        price,
        img,
        quantity,
        category,
        comment,
        user,
    })
    
    newProduct
    .save()
    .then((result)=>{
        console.log(result);
     res.status(201).json({success: true,
        message: "Article created",
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

module.exports = {createNewProduct};