// Imports the Express framework to build APIs and manage HTTP requests and responses efficiently.We are bringing Express into our project. Express is like a helper that makes it easy to create a web server and handle requests from users.

const express = require('express');

//Here we are creating our app (like making a robot). This app will listen to requests (like “hey, show me data”) and send responses (like “here’s your data”).This initializes an Express application instance which will be used to define routes, middleware, and start the server.
const app =express();

// Imports the connectDB function from db.js which handles connecting to the MongoDB database.
const connectDB = require('./db');
//Imports the router defined in routes/users.js which contains CRUD operations for the User model.
const users =require('./routes/users')

//Defines the port number on which the Express server will listen for incoming HTTP requests.we are saying, “our app will listen on door number 3000”. Anyone visiting this door (port) can talk to our app.
const PORT =3000;

//body parse
//This line teaches our app to understand JSON (data format). When someone sends data like { "name": "Nirmal" }, our app can read it.
// this kind of Middleware that parses incoming JSON payloads, allowing req.body to access the data sent in POST or PUT requests.
app.use(express.json());


//connect to database
//Calls the connectDB function to establish a connection with MongoDB before handling any requests. which means we are telling our app to connect to the database. Without this, we can’t save or get any users.
connectDB();

//Here we are mounting the user routes. It means, all requests starting with /api will go to users.js.
// For example:
// GET /api/users → fetch users
// POST /api/users → add a new user
//Mounts the users router on the /api path, so all CRUD routes defined in routes/users.js are prefixed with /api.
//Mounting is like attaching a special road (router) to your main app. So when someone goes on that road, the app knows which helper (router) to use.

//Using a common prefix like /api clearly separates API endpoints from other web routes. It’s a best practice for structure and maintenance, especially when frontend and backend coexist.
//Think of /api as a label or folder name. We put all data routes in this folder so we don’t mix them with other pages like /home or /about. It keeps things organized and clear.

app.use("/api",users);

// In Express (and most web servers), all routes handle HTTP requests, so technically all routes are HTTP routes. The method (GET, POST, etc.) defines what kind of request it is.
//Defines a GET route for the root URL (/). It sends a plain text response “Hello” and logs a message to the server console.
// Here we are saying: “When someone visits the home page (/), show them ‘Hello’”. The console.log is like writing a note in our app to see in terminal.

// Whenever someone knocks on a door (makes a request), we have to reply. Otherwise, they will wait forever and the app may crash or hang.

// explanation:
// In Express, every request should end with a response (res.send, res.json, etc.). If you don’t send a response, the client keeps waiting and may eventually timeout.
app.get('/', (req, res)=>{
  console.log("Im in home page")
  res.send("Hello")
}) ;

// Starts the Express server on the specified port and executes a callback once the server is running. It makes the app ready to accept incoming HTTP requests.
app.listen(PORT, ()=>{
 console.log('server is Up');
});