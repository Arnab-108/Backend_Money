const express = require("express")
const cors = require("cors")
const { connection } = require("./db")
const { authRouter } = require("./Routes/user.router")
const { auth } = require("./Middleware/auth.middleware")

const app = express()
app.use(express.json())
app.use(cors())

app.use("/user",authRouter)

app.get("/", auth , (req,res)=>{
    res.send("HomePage")
})
app.listen(8080, async()=>{
    try {
        await connection
        console.log("Connected to DB")
        console.log("Server is running at 8080")
    } catch (error) {
        console.log(error)
        console.log("Something went wrong!")
    }
})