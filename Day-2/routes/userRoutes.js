const router=require("express").Router()
const {createUser,Login}=require("../controllers/usercontrollers")
const protect=require("../middlewares/auth")


router.post("/create",createUser)

router.post("/login",Login)
router.get("/dash",protect,(req,res)=>{
    res.json("Welcome to the Dshboard")
})


module.exports=router