const RoleModule = require("../models/roleSchema");
console.log("role controllers");
const createNewRole = (req , res) =>{
  const { role , permissions} = req.body;
  const newRole = new RoleModule({
    role ,
    permissions,
  })
  newRole
  .save()
  .then((result)=>{
    console.log(result);
    res.status(201).json({
        success: true,
        message: `Success role created`,
        role: result,
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

module.exports = {createNewRole}