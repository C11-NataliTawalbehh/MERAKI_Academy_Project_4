const userModele = require("../models/userSchema");
const favoriteCartModel = require("../models/favoriteCartSchema");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

console.log("user controllers");
const register = (req, res) => {
    const { firstName, lastName, age, country, email, password, role } = req.body;
    const newRegister = new userModele({
        firstName,
        lastName,
        age,
        country,
        email,
        password,
        role
    })

    newRegister
        .save()
        .then(async (result) => {
            // res.status(201).json({
            //     success: true,
            //     message: "Account Created Successfully",
            //    user : result
            // })

            const newCart = await new favoriteCartModel({
                user: result._id,
                total: 0,
            })
            newCart.save()
                .then((result) => {
                    res.status(201).json({
                        success: true,
                        message: "account Cart Created Successfully",
                        cart: result
                    })
                })
                .catch((error) => {
                    res.status(409).json({
                        success: false,
                        message: "The email already exists",
                        error: error
                    })
                })
        })
        .catch((error) => {
            res.status(409).json({
                success: false,
                message: "The email already exists",
                error: error
            })
        })
}

const login = (req, res) => {
    const email = req.body.email.toLowerCase()
    const { password } = req.body;
    userModele
        .findOne({ email })
        .populate("role", "-_id -__v")
        .then(async (result) => {
            if (!result) {
                res.status(403).json({
                    success: false,
                    massage: "The email doesn’t exist or the password you’ve entered is incorrect"
                })
            }
            try {
                const valid = await bcrypt.compare(password, result.password)
                // if(!valid){
                //     res.status(403).json({
                //         success: false,
                //         massage: "The email doesn’t exist or the password you’ve entered is incorrect",

                //        })
                // }
                const payload = {
                    userid: result._id,
                    auther: result.firstName,
                    role: result.role,
                    country: result.country
                }

                const options = {
                    expiresIn: "60m"
                }

                const secret = process.env.SECRET;

                const token = jwt.sign(payload, secret, options);
                res.status(200).json({
                    success: true,
                    massage: "Valid login credentials",
                    token: token
                })
            } catch (error) {
                console.log(error);
            }
        })
        .catch((error) => {
            res.status(403).json({
                success: false,
                massage: "The email doesn’t exist or the password you’ve entered is incorrect",
                error: error.massage
            })
        })
}

module.exports = { register, login }






// const newCart = new favoriteCartModel ({
//     user : result._id,
//     quantity : 0,
//     total : 0 ,
//     product : []
// })
// newCart.save()
//   .then((result)=>{
//     res.status(201).json({
//         success: true,
//         message: "Cart Created Successfully",
//         author: result
//     })
// })
// .catch((error)=>{
//     res.status(409).json({
//         success: false,
//         message: "The email already exists",
//         error:error
//     })
//    })