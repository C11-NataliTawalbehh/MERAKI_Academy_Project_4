const checkoutModel = require("../models/checkoutSchema");

const createCheckout = (req ,res)=>{
    const {idProduct , totalPrice ,paymentIsCash} = req.body;
    const newCheckout = new checkoutModel({
        idProduct,
        totalPrice,
        paymentIsCash,
    })

    newCheckout
    .save()
    .then((result)=>{
        res.status(201).json({
            success:true,
            message:"checkout created successfully",
            checkout:result
        })
    })
    .catch((error)=>{
        res.status(500).json({
            success:false,
            message:"checkout Error",
            error:error.message
        })
    })
}

module.exports ={createCheckout}