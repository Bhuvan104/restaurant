const productModel=require('../../models/productModel')
const getCategoryWiseProduct=async(req,res)=>{
try{
    const category = req.body.category || req.query.category;
    if (!category) {
        return res.status(400).json({ error: 'Category is required' });
      }
    const product=await productModel.find({category})
    
        res.status(200).json({
            message:'Category products',
            data:product,
            success:true,
            error:false
        })

}catch(err){
        res.status(400).json({
            message:err.message || err,
            error:true,
            success:false
        })
    }
}

module.exports=getCategoryWiseProduct