const mongoose = require("mongoose")

const authSchema = mongoose.Schema({
    name:{type:String , required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    age:{type:String},
    image:{type:String, required:true}
},{
    versionKey:false,
    timeStamp:true
})

const authModel = mongoose.model("auth",authSchema)

module.exports={authModel}