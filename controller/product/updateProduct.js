const uploadProductPermission=require('../../helpers/permission')
const productModel = require("../../models/productModel")
async function updateProductController(req,res){
    try{
        if(!uploadProductPermission(req.userId)){
            throw new Error("Permission denied")
        }
        const {_id,...resbody}=req.body
        console.log("Received _id:", _id);
        console.log("Received resbody:", resbody);
        const updatedProduct = await productModel.findByIdAndUpdate(_id, resbody, { new: true });
        res.json({
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

module.exports=updateProductController