const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const userModel =require('../../models/userModel')
async function  userSignInController(req,res){
    try{
        const {email,password}=req.body
        if(!email){
            throw new Error("Please provide email")

        }
        if(!password){
            throw new Error("Please provide password")

        }
        const user =await userModel.findOne({email})
        if (!user){
            throw new Error("User not exists.")
        }
        const checkpassword= bcrypt.compareSync(password, user.password);
        console.log(checkpassword)
        if(checkpassword){
            const tokenData={
                id:user._id,
                email:user.email
            }
            const token =await jwt.sign(tokenData, process.env.JsonTokenSecretKey, { expiresIn: 60 * 60*8 });
            const tokenOption={
                httpOnly:true,
                secure:true
            }
            res.cookie("token",token,tokenOption).status(200).json({
                message:"Login successfully done",
                token:token,
                error:false,
                success:true
        })

        }else{
            throw new Error("Plese check password")
        }
    }
    catch(err){

        res.json({
            message:err.message || err,
            error:true,
            success:false
        })
    }
}

module.exports=userSignInController