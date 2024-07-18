const userModel = require("../../models/userModel")

async function updateUser(req,res){
    try{
        const sessionUser=req.userId
        const {userId,name,email,role} =req.body
        const payload={
            ...(email && {email:email}),
            ...(name && {name:name}),
            ...(role && {role:role})
        }
        const user=await userModel.findById(sessionUser)
        console.log("user.role",user.role)
        const updatedUser=await userModel.findByIdAndUpdate(userId,payload)
        res.json({
            message:"User Updated",
            error:false,
            success:true
        })

    }catch(err){
        res.status(400).json({
            message:err.message || err,
            error:true,
            success:false
        })
    }
}
module.exports=updateUser