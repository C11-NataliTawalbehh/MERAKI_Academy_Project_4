const userModel = require("../models/userSchema");

const addFavorite = (req,res)=>{
    const {id} = req.body;
    const user = req.token.userid;
    console.log(user);
    if(!user || !favorite){
      return res.status(400).json({
        success:false,
        message:"user id and favorite product id are required"
      })
    }
    userModel 
    .findById(user ,{$push:{favorite:id}} ,{new:true})
    .save()
    .then((result)=>{
       if(!result){
        return res.status(404).json({
            success:false,
            message:"user not found"
        })
       }
    })
    .then(result =>{
        res.status(201).json({
            success:true,
            message:"favorite added successfully",
            result:result
        })
    })
    .catch(error =>{
        res.status(500).json({
            success:false,
            message:"server Error",
            error:error.message
        })
    })
   
  }

  // userModel.findById(userid, {$push: {favorites: favorite}}, {new: true})
  // .then((result) => {
  //   console.log(result);
  // }).catch(err => {
  //   console.log(err.message);
  // })

const deleteFavoriteById = (req, res) => {
    const id = req.params.id;
    userModel
      .findByIdAndDelete(id)
      .then((result) => {
        if (!result) {
          return res.status(404).json({
            success: false,
            message: `The favorite with id => ${id} not found`,
          });
        }
        res.status(200).json({
          success: true,
          message: `favorite deleted`,
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

module.exports = {addFavorite , deleteFavoriteById}