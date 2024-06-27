const favoriteCartModel = require("../models/favoriteCartSchema");
const productModel = require("../models/productSchema")
const addCart = async (req, res) => {

  
     
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

  const deleteProductFromCart = async (req, res) => {
    const { productId } = req.params; // معرف المنتج الذي سيتم حذفه
    const user = req.token.userid; // معرف المستخدم الذي يمتلك السلة
  
    try {
      // العثور على سلة المستخدم
      let cart = await favoriteCartModel.findOne({ user });
  
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: `Cart not found for user ${user}`,
        });
      }
  
      // التحقق من وجود المنتج في السلة
      const productIndex = cart.product.findIndex(p => p.id.toString() === productId);
  
      if (productIndex === -1) {
        return res.status(404).json({
          success: false,
          message: `Product with id ${productId} not found in cart`,
        });
      }
  
      // حذف المنتج من السلة
      cart.product.splice(productIndex, 1);
  
      // تحديث إجمالي السلة بعد الحذف
      cart.total = 0
      for(const item of cart.product){
        const product = await productModel.findById(item.id);
        if(product){
          cart.total += item.quantity * product.price
        }
      }
      
  
      // حفظ التغييرات
      await cart.save();
  
      res.status(200).json({
        success: true,
        message: "Product removed from cart",
        cart: cart,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: error.message,
      });
    }
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

module.exports = {addCart , deleteProductFromCart ,getAllCart , updateCartById ,getCartById}


























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