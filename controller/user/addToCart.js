const addToCartModel = require("../../models/cartProduct")

const addToCartController=async(req,res)=>{
    try{
        const {productId}=req?.body
        const currentUser=req.userId
        console.log(req.body)
        const isProductAvailable = await addToCartModel.find({ productId });
    
        if(isProductAvailable.length > 0){
            return res.json({
                message:"Already exists in Add to cart",
                success:false,
                error:true
            })
        }
        const payload={
            productId:productId,
            quantity:1,
            userId:currentUser
        }
        const newAddToCart=new addToCartModel(payload)
        const saveProduct=await newAddToCart.save()
        res.json({
            saveProduct:saveProduct,
            message:"Product added to cart",
            quantity:1,
            userId:currentUser,
            success:true,
            error:false
        })

    }catch(err){
        res.json({
            message:err?.message || err,
            error:true,
            success:false
        })
    }
}
module.exports=addToCartController