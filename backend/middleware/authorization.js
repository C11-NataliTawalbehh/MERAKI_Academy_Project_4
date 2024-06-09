const authorization = (requiredPermission)=>{
    return (req ,res , next)=>{
        console.log("token:",req.token);
    if(!req.token.role.permissions.includes(requiredPermission)){
        res.status(403);
        res.json({success: false, massage: "Unauthorized"});
    }
    next()
}
}
module.exports = authorization;




// const authorization = (requiredPermission) => {
//     return async(req, res, next) => {
        
//         console.log("token:", req.token);

//         // if (!req.token || !req.token.role || !req.token.role.permissions) {
//         //     res.status(403);
//         //     return res.json({ success: false, message: "Unauthorized - token or permissions missing" });
//         // }
        
    
//         if (!req.token.role.permissions.includes(requiredPermission)) {
//             res.status(403);
//             return res.json({ success: false, message: "Unauthorized" });
//         }

//         next();
//     }

    
    
// }

// module.exports = authorization;