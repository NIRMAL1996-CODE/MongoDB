// mongoose → is like a helper to talk to MongoDB.
// dotenv → helps us hide secret info (like database password).
// dotenv.config() → tells the app to read secrets from .env file`.

//  explanation:
// mongoose is an ODM (Object Data Modeling) library to interact with MongoDB.
// dotenv loads environment variables from a .env file.
// dotenv.config() initializes environment variables for use in the project.
// dotenv.config() is like opening a treasure chest. It reads secrets (like your DB password) from .env so the app can use them safely.
//  explanation:It loads the variables defined in .env into process.env, making them accessible in your code (e.g., process.env.MONGODB_URI). Without it, environment variables from .env won’t work.
const mongoose = require('mongoose');
const dotenv = require ('dotenv');
dotenv.config();

// all lines inside the connectDB function are needed every time you want to connect MongoDB.
// mongoose.connect(...) → actually makes the connection.
// try/catch → handles errors safely.
// console.log → optional, just for confirmation.
// process.exit(1) → stops app if connection fails (important for production).

// connectDB → is like telling our app to shake hands with MongoDB.
// await mongoose.connect(...) → tries to connect to the database using the secret URL.
// console.log("MongoDB Connected") → says “Yay, we are connected!”
// catch → if something goes wrong, it shows the error and stops the app.

// explanation:
// connectDB is an async function that connects to MongoDB using Mongoose.
// process.env.MONGODB_URI provides the connection string.
// useNewUrlParser: true avoids deprecation warnings.
// Errors are caught and logged; process.exit(1) stops the server on failure.
// try/catch is optional. Without it, errors from mongoose.connect() will be unhandled and might crash the Node.js process. Using it is best practice for production-ready code.
// We are making a helper function called connectDB that will talk to MongoDB. async means it can wait for the database to respond before moving on.
const connectDB = async () => {

  // process → special object in Node.js that has info about the app.
  // env → a part of process that stores environment variables (hidden secrets like passwords or URLs).
  // MONGODB_URI → the name of the secret variable in .env that has the MongoDB connection string.
  // Each project usually has its own database, so the value of MONGODB_URI changes.But the variable name (MONGODB_URI) in your code can stay the same; you just put a different URI in .env for each project.
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // useNewUrlParser: true just ensures the address is read correctly.New parser → reads all modern addresses correctly without mistakes or warnings.
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected`);
    // catch → says: “If something goes wrong, do this”.Handles errors if MongoDB connection fails.

// console.error(error.message) → shows the problem in terminal.
//  Logs the error      message for debugging.
// process.exit(1) → stops the app because it can’t work without the database.  
// terminates the Node.js process to prevent running without a DB connection

  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
// Exports the connectDB function so it can be imported and used in other modules, enabling modular and reusable code.
module.exports = connectDB;