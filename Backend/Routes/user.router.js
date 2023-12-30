const express = require("express")

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { authModel } = require("../Model/user.model")

const authRouter = express.Router()

authRouter.post("/signup", async(req,res)=>{
    const {email,password,name,age} = req.body
    const userExist = await authModel.findOne({email:email})

    if(userExist){
        res.status(200).send({msg:"User already exists! Please login!"})
    }
    else{
        try {
            bcrypt.hash(password,5, async(err,hash)=>{
                const data = authModel({name,email,password:hash,age,image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYsYHWYwdwG1evDHsZcnf33j9diSbp1oZOgQ&usqp=CAU"})
                data.save()
                res.status(200).send({msg:"A new user added successfully!"})
            })
        } catch (error) {
            res.status(404).send({err:error})
        }
    }
})

authRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user = await authModel.findOne({email:email})
        console.log(user.password)

        if(user){
            bcrypt.compare(password,user.password, (err,result)=>{
                if(result){
                    let token = jwt.sign({user_id:user._id , user:user.name},"money",{
                        expiresIn:"2d"
                    })
                    console.log(token)
                    res.status(200).send({success:true, msg:"Login Successfull!", token:token, user:user})
                }
                else{
                    res.status(200).send({success:false, msg:"Please provide the correct password!"})
                }
            })
        }
        else{
            console.log("hello!")
            res.status(200).send({success:false, msg:"Invalid emailId or password"})
        }
    } catch (error) {
        console.log("hello!")
        res.status(200).send({success:false, msg:"Invalid emailId or password"})
    }
})

module.exports={authRouter}