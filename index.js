const express = require('express');
const app =express();
const connectDB = require('./db');
const users =require('./routes/users')

const PORT =3000;


//body parse
app.use(express.json());
//connect to database
connectDB();

//mount  router file means?
app.use("/api",users);

app.get('/', (req, res)=>{
  console.log("Im in home page")
  res.send("Hello")
}) ;

app.listen(PORT, ()=>{
 console.log('server is Up');
});