const commentModel = require("../models/commentSchema");
const productModel= require("../models/productSchema")
console.log("comment controllers");
const createNewComment = (req , res)=>{
    id = req.params.id;
    const {comment} = req.body;
    const commenter = req.token.userid;
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

const deleteCommentById = (req, res) => {
  const id = req.params.id;
  commentModel
    .findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The comment with id => ${id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `comment deleted`,
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

module.exports = {createNewComment,deleteCommentById}