const productModel = require("../../models/productModel")
const getProductDetails =async(req,res)=>{
    try{
        const productId=req.body.productId || req.query.productId
        console.log("productId",productId)
        const product=await productModel.findById(productId)
        console.log("productId",productId)
        res.json({
            data:product,
            message:"Product Updated successfully",
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
module.exports=getProductDetails