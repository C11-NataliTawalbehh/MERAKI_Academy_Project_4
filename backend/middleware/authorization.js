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




