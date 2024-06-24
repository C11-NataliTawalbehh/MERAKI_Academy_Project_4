// const userModel = require("../models/userSchema")
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const login = (req ,res)=>{
//     const email = req.body.email.toLowerCase()
//     const {password} = req.body;
//     userModel
//     .findOne({email})
//     .populate("role" ,"-_id -__v")
//     .then(async(result)=>{
//      if (!result){

//        return res.status(403).json({
//             success: false,
//             massage: "The email doesn’t exist or the password you’ve entered is incorrect"
//         })
//      }
//      try{
//         const valid = await bcrypt.compare(password ,result.password) 
//         // if(!valid){
//         //     res.status(403).json({
//         //         success: false,
//         //         massage: "The email doesn’t exist or the password you’ve entered is incorrect",
                
//         //        })
//         // }
//         const payload = {
//             userid :result._id,
//             auther :result.firstName,
//             role :result.role,
//             country:result.country
//         }

//         const options ={
//             expiresIn: "60m" 
//         }

//         const secret = process.env.SECRET;

//         const token = jwt.sign(payload,secret,options);
//         res.status(200).json({
//             success: true,
//             massage: "Valid login credentials",
//             token: token
//         })
//      }catch(error){
//         console.log(error);
//      }
//     })
//     .catch((error)=>{
//        res.status(403).json({
//         success: false,
//         massage: "The email doesn’t exist or the password you’ve entered is incorrect",
//         error:error.massage
//        })
//     })
// }

// module.exports = {login}