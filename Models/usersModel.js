//Schema and model are predefined classes in Mongoose.
// Schema → defines document structure (fields, types, validation).
// model → creates a model based on a schema to perform CRUD operations on a collection.

//We are bringing helpers from Mongoose to use in our file, like taking tools out of a toolbox.
// require("mongoose") imports the Mongoose library.
// { Schema, model } extracts only the Schema and model properties from Mongoose so we can use them directly without writing mongoose.Schema or mongoose.model.

const {Schema, model}= require("mongoose");

// new Schema({ ... }) creates a new Mongoose schema object to specify fields, types, and validations.
// { Schema, model } → we take the tools out of the box
// new Schema({ ... }) → we use the Schema tool to make a blueprint for our data

// Defines a field name in the schema.
// type: String → data type is string.
// required: true → MongoDB will not allow a user without a name.
// maxlength: 50 → limits the length of the string to 50 characters.

// Every user will automatically get the current date when created. Field createdAt stores the creation time of a document.
// type: Date → it’s a date type.Date ensures the value is a date object.
// default: Date.now → if we don’t give a date, MongoDB will use the current time.Date.now automatically sets the current timestamp when a new

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


// model("User", userSchema) creates a Mongoose model named User.
// This model allows us to perform CRUD operations on the users collection in MongoDB using the defined schema.
// Mongoose automatically pluralizes the collection name (User → users).
const UserModel =model("User", userSchema)

// Exports the UserModel so it can be imported in other modules (like routes).
// Enables modular code and reuse across the project.
module.exports= UserModel;