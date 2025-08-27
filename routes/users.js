// express → brings Express tools
// router → makes a special mini-app just for routes
// User → brings our User table from usersModel
// MongoDB is NoSQL, so it doesn’t have “tables” like SQL.But Mongoose calls it a model and collection to make it easier to understand, like a “table of users” in your mind, even though under the hood it’s just JSON documents.
const express = require("express");
const router = express.Router();

const User= require("../Models/usersModel");
//routes
//CRUD Operations
//view/read

// When someone asks /users, this gives all users from the database.router.get("/users") defines an HTTP GET endpoint.
// async/await → waits until database responds.
// User.find() fetches all documents from the users collection.
// res.status(200).json(users) → sends users back as JSON. So, res.status(200).json(users) sends a success response with data.
// catch → if something goes wrong, sends an error message
router.get("/users",async (req, res)=>{
  console.log("respond sended");
  try {
    const users= await User.find();
    res.status(200).json(users);
  }catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
})

//create
// The POST /users route lets your app add a new user to MongoDB. When a client sends data to /users, req.body gets the info (like the user’s name). Then new User({ name }) creates a new user object using the Mongoose model, and await newUser.save() stores it in the database. After saving, the route sends a JSON response with a success message and the newly created user. If anything goes wrong, the catch block sends a 500 error with the error message.

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
  }catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
})

module.exports =router;