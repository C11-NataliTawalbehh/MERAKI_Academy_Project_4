const favoriteCartModel = require("../models/favoriteCartSchema");
const productModel = require("../models/productSchema")
const addCart = async (req, res) => {
  // const {total , quantity} = req.body;
  //    const user = req.token.userid;
  //    console.log( user);
  //    const {productId} = req.params;
  //    const newCart = new favoriteCartModel({
  //     product:productId,
  //     total,
  //     user,
  //     quantity,
  //    })
  
     
    // ------------------------------------------- 
  const {total,quantity} = req.body;
  const user = req.token.userid;
  const {productId} = req.params;
  console.log(productId);
  try {
    // تحقق مما إذا كانت السلة موجودة لهذا المستخدم
    let cart = await favoriteCartModel.findOne({user});
console.log("cart==========>",cart);
    if (cart) {
      // إذا كانت السلة موجودة، أضف المنتج الجديد إلى السلة باستخدام $push
      updated_cart = await favoriteCartModel.findOneAndUpdate(
        {user},
        { $push: { product: {id:productId,quantity:quantity}} , $inc:{total:total}}, { new: true },
       
      );
    } else {
      // إذا لم تكن السلة موجودة، أنشئ سلة جديدة
      cart = new favoriteCartModel({
        product:[{id:productId,quantity:quantity}],
        total,
        user,
      });
      await cart.save();
    }

    res.status(200).json({
      success: true,
      message: "Cart updated",
      result: updated_cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      err: error.message,
    });
  }
    // favoriteCartModel.findByIdAndUpdate({user},{$push:{product:productId}},{new:true})
    // // favoriteCartModel.findOne({user})
    // .then((result)=>{
    //   console.log("from add cart ",result);
    // })
    // .catch((err)=>{
    //     res.status(500).json({
    //       success: false,
    //       message: `Server Error`,
    //       err: err.message,
    //     });
    //    })
    //-------------------------------------
    

  // try {
  //   const { total, product } = req.body;
  //   const user = req.token.userid;
  //   const newFavoriteCart = new favoriteCartModel({
  //       total,
  //       product,
  //       user,
  //   });

  //   await newFavoriteCart.save();
  //   res.status(201).json(newFavoriteCart);
  // } catch (error) {
  //   res.status(400).json({ error: error.message });
  // }
}

  const getAllCart = (req,res)=>{
    const user = req.token.userid;
    favoriteCartModel
      .find({user})
      .populate({path:"product",populate:{path:"id",populate:{path:"user"}}})
      .populate("user")
      .exec()
      .then((product) => {
          res.status(200).json({
            success: true,
            message: `All the product`,
            userId: user,
            product: product,
            total:product.total,
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

  const getCartById = (req,res)=>{
    const {cartId} = req.params;
    console.log("from get ======================> ",cartId);
    favoriteCartModel
    .findById(cartId)
    .exec()
    .then((result) => {
        res.status(200).json({
          success: true,
          message: `All the product`,
          result: result,
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

const deleteCartById = (req, res) => {
    const cartId = req.params.id;
    favoriteCartModel
      .findByIdAndDelete(cartId)
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

  const updateCartById = (req ,res)=>{
    const cartId = req.params.id;
    const {total} = req.body;
 
    favoriteCartModel
    .findByIdAndUpdate({_id:cartId} , {total:total} ,{new:true})
    .then((result)=>{
      res.status(200).json({
        success: true,
        message: `update`,
      });
    })
    .catch((err)=>{
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    })

  }

module.exports = {addCart , deleteCartById ,getAllCart , updateCartById ,getCartById}


























  // const {total} = req.body;
  // const user = req.token.userid;
  // const productId = req.params.id;
  // try {
  //   // تحقق مما إذا كانت السلة موجودة لهذا المستخدم
  //   let cart = await favoriteCartModel.findById(user);

  //   if (cart) {
  //     // إذا كانت السلة موجودة، أضف المنتج الجديد إلى السلة باستخدام $push
  //     cart = await favoriteCartModel.findByIdAndUpdate(
  //       cart._id,
  //       { $push: { product: productId} , $inc:{total:total}}, { new: true },
       
  //     );
  //   } else {
  //     // إذا لم تكن السلة موجودة، أنشئ سلة جديدة
  //     cart = new favoriteCartModel({
  //       product:[productId],
  //       quantity,
  //       total,
  //       user,
  //     });
  //     await cart.save();
  //   }

  //   res.status(200).json({
  //     success: true,
  //     message: "Cart updated",
  //     result: cart,
  //   });
  // } catch (error) {
  //   res.status(500).json({
  //     success: false,
  //     message: "Server Error",
  //     err: error.message,
  //   });
  

// const addCart =(req,res)=>{
//    const {total} = req.body;
//    const user = req.token.userid;
//    const productId = req.params.id
   
//    const newCart = new favoriteCartModel({
//     product:productId,
//     total,
//     user,
//    })

//    newCart 
//    .save()
//    .then((result)=>{
//     productModel
//     .findByIdAndUpdate({_id:id},{$push:{product:result._id}},{new:true})
//     .then(()=>{
//     res.status(200).json({
//       success: true,
//       message: `All the product`,
//       result: result,
//     });
//   }).catch((err)=>{
//     res.status(500).json({
//       success: false,
//       message: `Server Error`,
//       err: err.message,
//     });
//    })
//    })
//    .catch((err)=>{
//     res.status(500).json({
//       success: false,
//       message: `Server Error`,
//       err: err.message,
//     });
//    })
   
//   }