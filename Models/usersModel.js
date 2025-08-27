const {Schema, model}= require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserModel =model("User", userSchema)
module.exports= UserModel;