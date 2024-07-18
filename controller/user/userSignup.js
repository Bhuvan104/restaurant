const userModel = require("../../models/userModel")
const bcrypt = require('bcrypt');

async function userSignUpController(req,res){
    try{
        
        const {email,password,name}=req.body
        const user =await userModel.findOne({email})
        if (user){
            throw new Error("Already user exists.")
        }
        if(!email){
            throw new Error("Please provide email")

        }
        if(!password){
            throw new Error("Please provide password")

        }
        if(!name){
            throw new Error("Please provide name")

        }
        console.log("2",req.body)
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);
        if (!hashPassword){
            throw new Error("Something is wrong ")
        }
        const payload={
            ...req.body,password:hashPassword,role:"GENERAL"
        }
        console.log("1",req.body)
        const userData=new userModel(payload)
        const saveUser=await userData.save()
        res.json(
            {
                data:saveUser,
                error:false,
                success:true,
                message:"User create success"
            }
        )

    }catch(err){
        console.log("user already exist  ",err.message)
        res.json({
            message:err.message,
            error:true,
            success:false
        })
    }
}

module.exports=userSignUpController