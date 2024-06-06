const mongoose = require("mongoose");
console.log(process.env.DB_URI);
mongoose
.connect(process.env.DB_URI)
.then(()=>{
    console.log("project_4 result");
    
})
.catch((error)=>{
    console.log("project_4 error");
    res.send(error);
})