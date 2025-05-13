const User = require("../model/user");
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")


const createUser = async (req, res) => {
  const { name, email, password, age } = req.body;

  const UserExist = await User.findOne({ email });

  if (UserExist) {
    console.log("User already exists");
    return res.status(400).json({ message: "User already exists" }); // ✅ Add response and return here
  }
  const rounds=10
  const hashedpassword=await bcrypt.hash(password,rounds)


  try {
    await User.create({
      name,
      email,
      password:hashedpassword,
      age
    });
    console.log("User Created");
    return res.status(201).json({ message: "User created successfully" }); // ✅ Add success response
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" }); // ✅ Handle error response
  }
};

const Login = async (req,res)=>{
  const {email,password}=req.body

  try{
    const UserExist=await User.findOne({email})
    const isMatch=await bcrypt.compare(password,UserExist.password)

    if(UserExist && isMatch){
      res.json(GenerateToken(UserExist._id,UserExist.email))

    }else{
      res.json({message:"Invalid Creditionals"})
    }


  }catch(error){
    res.status(400).json({message:"Error while Login"})
  }

}

const GenerateToken=(id,email)=>{
  const token=jwt.sign({id,email},process.env.SECRET_KEY,{expiresIn:"1h"})
  return token
}

module.exports = { createUser,Login };
