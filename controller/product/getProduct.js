const productModel=require("../../models/productModel")
const getProductController=async(req,res)=>{
    try{
        const product=await productModel.find().sort({createAt:-1})
        res.status(200).json({
            data:product,
            error:false,
            success:true,
            message:"User Details"
        })
    }catch{
        res.status(400).json({
            message:err.message || err,
            error:true,
            success:false
        })
    }
}
module.exports=getProductController