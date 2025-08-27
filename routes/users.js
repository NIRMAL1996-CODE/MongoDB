const express = require("express");
const router = express.Router();

// app.get("/", (req, res)=>{

// });

const User= require("../Models/usersModel");
//routes

//CRUD Operations

//view/read
router.get("/users",async (req, res)=>{
  console.log("respond sended");
  try {
      
    const users= await User.find();
    res.status(200).json(users);
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
})

//create

router.post("/users",async (req, res)=>{
  try {
      
    const {name}= req.body;
    const newUser = new User({name});
    //  await User.save(newUser);
    await newUser.save();

      res.status(200).json({
        success:true,
        user: newUser
      });
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
})




module.exports =router;