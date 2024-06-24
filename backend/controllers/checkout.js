const checkoutModel = require("../models/checkoutSchema");

const createCheckout = (req ,res)=>{
    const {provid ,paymentIsCash ,fullName,phoneNumber,country,city,address} = req.body;
    const newCheckout = new checkoutModel({
        provid,
        paymentIsCash,
        fullName,
        phoneNumber,
        country,
        city,
        address
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


const getAllOrderCheckout = (req,res) => {
    checkoutModel
    .find({})
    .populate({path: "FavoriteCart", select: "product -_id"})
    .exec()
    .then((result)=>{
        res.status(201);
        res.json(result);
    })
    .catch((err)=>{
        res.status(500);
        res.json(err.message)
    });
};

module.exports ={createCheckout ,getAllOrderCheckout}