# 📘 MongoDB + Mongoose Notes

Beginner-friendly notes covering **Database basics, MongoDB, Mongoose, Schema, Model, CRUD, and common doubts**.  

---

## 📂 1. What is Database (DB)?

- A **Database** = digital cupboard to store & manage data in an organized way.  
- Makes it easy to **store, search, update, delete** data.  

### 🔑 Why we need DB
1. Store **large data safely**.  
2. **Fast searching** instead of checking files manually.  
3. Keep data **organized** (tables/collections).  
4. Allow **many users** to access at same time.  

### 🔑 Types of DB
1. **SQL (Relational)**  
   - Data in **tables (rows & columns)**.  
   - Example: MySQL, PostgreSQL, Oracle.  
   - Best for **structured data** (fixed format).  

2. **NoSQL (Non-Relational)**  
   - Data in **documents, key-value, graphs, wide-columns**.  
   - Example: MongoDB, Redis, Cassandra.  
   - Best for **unstructured/changing data**.  

---

## 🍃 2. What is MongoDB?

- MongoDB = **NoSQL Database**.  
- Stores data as **documents (JSON-like)** inside **collections**.  
- Flexible schema (you can add/remove fields anytime).  
- Can scale to handle **huge data & many users**.  

**Example Document:**
```json
// { "name": "Nirmal", "age": 25 }
---------------------------------------------------------------------------
| Method                | Purpose         | Example Use               |
| --------------------- | --------------- | ------------------------- |
| `create()` / `save()` | Add new data    | Register new user         |
| `find()`              | Get all data    | Show all users            |
| `findOne()`           | Get 1 match     | Login check               |
| `findById()`          | Get by ID       | Profile page              |
| `updateOne()`         | Update 1 record | Edit profile              |
| `updateMany()`        | Update many     | Set all inactive → active |
| `findByIdAndUpdate()` | Update by ID    | Change user’s email       |
| `deleteOne()`         | Delete 1 record | Remove account            |
| `deleteMany()`        | Delete many     | Clear old logs            |
| `findByIdAndDelete()` | Delete by ID    | Remove specific order     |

👉 Easy to remember:
create/save → add
find → read
update → change
delete → remove
-----------------------------------
Schema

Schema = Blueprint (design) for documents.
Defines fields & data types.

Example:
const userSchema = new mongoose.Schema({
  name: String,
  age: Number
});


👉 Tells MongoDB: every user has a name (string) & age (number).
---------------------------------
## Model
const User = mongoose.model("User", userSchema);

## Breakdown
mongoose.model(...)
Function given by Mongoose.
It creates a Model.

"User"
Name of the model.
Mongoose will automatically make it plural & lowercase → users collection in DB.

userSchema
The schema (blueprint) we made earlier.
It tells what fields (name, age, etc.) a User will have.

const User = ...
We store this model in a variable User.
Now we can use User to CRUD data.

---------------------------------------------
 Common Model Methods
Create
User.create({name:"Nirmal", age:25})
new User({name:"Raj"}).save()

Read
User.find()                       // all users
User.findOne({name:"Nirmal"})     // first match
User.findById("id_here")          // by id

Update
User.updateOne({name:"Nirmal"}, {age:26})
User.updateMany({}, {isActive:true})
User.findByIdAndUpdate(id, {age:30})

Delete
User.deleteOne({name:"Nirmal"})
User.deleteMany({})
User.findByIdAndDelete(id)
----------------------------------------------
 Install & Test MongoDB
Install

Download → mongodb.com
.
Start server:
mongod --dbpath /your/path/data/db

Connect:
mongosh

Test Commands
show dbs               # list databases
use testdb             # create/switch db
db.users.insertOne({name:"Nirmal"})   # insert document
db.users.find()        # read data
show collections       # list collections
db.dropDatabase()      # delete db
-----------------------------------------------------------
 Doubts (with Answers)

❓ Can schema be written like an object?
✅ Inside schema we define fields like an object { name:String },
but whole schema = special Mongoose object, not plain object.

❓ Do I have to define schema order?
✅ No, order doesn’t matter. Field names matter.

❓ Amazon has millions of products, do they make schema for all?
✅ Yes, they design big schemas (Product, User, Order, Review). That’s why UI looks consistent.

❓ Can schema be very long?
✅ Yes, it can be as long as needed (nested objects, arrays, etc.).

❓ Do I need to write mongoose.model() every time?
✅ Only once per collection type. After that, just use the model.

------------------------------------------------------
👍 let’s make a basic flow/structure (like a roadmap):

1. Create Express App (index.js → setup server).

2. Connect Database (db.js → MongoDB connection).

3. Make Schema & Model (userSchema in user.js → export User model).

4. Use Model in Routes (in index.js or routes → create/read users).

5. .env file (store DB URL, PORT, secret keys).

👉 Order while coding = Express app → DB connect → Schema/Model → Routes/Logic → Env.

--------------------------------------
things are common / boilerplate (fixed code we always reuse).
Here’s the usual structure with those:

1. index.js (Express App)

   require('express')
   const app = express()
   app.use(express.json()) (to read JSON body)
   app.listen(PORT)

2. db.js (Database Connect)

   mongoose.connect(process.env.MONGO_URL)
   console log success/error

3. models/user.js

   i. Define Schema (fields: name, email, password, etc.)
   ii. Create Model with mongoose.model("User", userSchema)

4.routes/user.js (optional)

   Write routes like POST /register, GET /users using User model

5.env

   PORT=5000
   MONGO_URL=your-mongo-uri

These 5 are the most common files you’ll see in almost every MongoDB + Express project.
--------------------------------------

a short summary of what we covered in server.js so far:

1.const express = require('express') → Import Express (web server helper).

2.const app = express() → Create our app (server instance).

3.const connectDB = require('./db') → Bring database connection helper.

4.const users = require('./routes/users') → Bring user routes (CRUD operations).

5.const PORT = 3000 → Server will listen on port 3000.

6.app.use(express.json()) → App can read JSON data from requests.

7.connectDB() → Connect to MongoDB database.

8.app.use("/api", users) → Mount user routes on /api path.

9.app.get('/', ...) → Create a GET route for home page /.

Note: Extra points:
   Mounting means attaching a router to a path.
   /api is a prefix to organize API routes.
   All routes are HTTP routes because they respond to HTTP requests.