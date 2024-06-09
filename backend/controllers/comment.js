const commentModel = require("../models/commentSchema");
const productModel= require("../models/productSchema")
console.log("comment controllers");
const createNewComment = (req , res)=>{
    id = req.params.id;
    const {comment} = req.body;
    const commenter = req.token.userId;
    const newComment = new commentModel({
        comment,
        commenter,
    })
    newComment
    .save()
    .then((result)=>{
        productModel
        .findByIdAndUpdate({_id:id},{$push:{comment:result._id}},{new:true})
        .then(()=>{
          res.status(201).json({success: true,
          message: "Comment created",
          comment: result})
    })
    .catch((error)=>{
        res.status(500).json({success: false,
          message: "Server Error",
          err: error})
      })
    })
    .catch((error)=>{
      res.status(500).json({success: false,
        message: "Server Error",
        err: error})
    })
}

module.exports = {createNewComment}