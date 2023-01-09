const authenticate = (req,res,next)=>{
    try{
        if(!req.isAuthenticated()){
            return res.redirect("/")
        }else{
            next()
        }
    
    }catch(err){
        console.log(err)
    }
}

module.exports = authenticate