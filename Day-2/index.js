const express=require("express")
const app=express()
const port =process.env.PORT || 5000
const connectDB=require("../Day-2/config/db")
const UserRoutes=require("./routes/userRoutes")

connectDB()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/",UserRoutes)


app.listen(port,()=>{
    console.log("Server is running"+port)
})