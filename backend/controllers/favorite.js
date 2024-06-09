const userModel = require("../models/userSchema");

const createFavorite = (req,res)=>{
    const {userId , favorite} = req.body;
    userModel 
    .findById(userId)
    .then((result)=>{
       if(!result){
        return res.status(404).json({
            success:false,
            message:"user not found"
        })
       }
       result.favorite.push(favorite);
       return result.save();
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

module.exports = {createFavorite , deleteFavoriteById}