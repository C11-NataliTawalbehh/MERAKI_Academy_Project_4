const checkoutModel = require("../models/checkoutSchema");

const createCheckout = (req ,res)=>{
    const {provid ,paymentIsCash} = req.body;
    const user = req.token.userid
    const newCheckout = new checkoutModel({
        provid,
        paymentIsCash,
        user,
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