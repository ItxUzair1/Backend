const mongoose=require("mongoose")
const dotenv=require("dotenv").config()

const connectDB=()=>{

mongoose.connect(process.env.MONGO_URI).then(()=>console.log("Database Connected")).catch((error)=>console.log(error))
}


module.exports=connectDB