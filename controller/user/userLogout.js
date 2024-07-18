async function userLogout(req,res){
    try{
        res.clearCookie("token")
        res.json({
            message:"Logot successfully done",
            error:false,
            success:true,
            ddata:[]
    })
    }catch(err){
        res.json({
            message:err.message || err,
            error:true,
            success:false
        })
    }
}

module.exports=userLogout