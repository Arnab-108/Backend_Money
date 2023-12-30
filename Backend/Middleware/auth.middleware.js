const jwt = require("jsonwebtoken")

const auth = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1]
    if(token){
        try {
            
            const decoded = jwt.verify(token,"money")
            if(decoded){
                console.log(decoded)
                req.body.userId = decoded.user_Id
                req.body.user = decoded.user
                next()
            }
            else{
                res.send({err:"Please login first!"})
            }
        } catch (error) {
            res.send({err:"Please login first!"})
        }
    }
    else{
        res.send({err:"Please Login first!"})
    }
}

module.exports={auth}