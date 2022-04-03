const router=require("express").Router();
const User=require("../models/User")
const bcrypt=require("bcrypt")

//registration
router.post("/register",async(req,res)=>{

    try{
        //generate new password
        //The higher the saltRounds value, the more time the hashing algorithm takes. You want to select a number that is high enough to prevent attacks, but not slower than potential user patience. In this example, we use the default value, 10.
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(req.body.password,salt);

        //create new user
        const newUser=await new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
        })

        //save user and return response
        const user=await newUser.save();
        res.status(200).json(user);

    }catch(err){
        res.status(500).json(err);
    }
});


//login
router.post("/login",async(req,res)=>{
    try{
          const user=await User.findOne({email:req.body.email});
          !user && res.status(404).json("User not found."); //Wrong email entered
          const validPassword=await bcrypt.compare(req.body.password, user.password);
          !validPassword && res.status(400).json("Wrong password."); //wrong password entered
          res.status(200).json(user);//correct email amd password, outputs user credentials

    }catch(err){
        res.status(500).json(err);
    }
});

module.exports=router;