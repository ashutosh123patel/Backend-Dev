/*const express = require("express");
const mongoose =  require("mongoose");

const app =express();

//connect to mongoose
mongoose.connect("mongodb://localhost:27017/")
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

//create schema
const userSchema = new mongoose.Schema(
    {
        firstName:{
            type:String,
            required: true,
        },
        
        lastName:{
                type:String,
                required:false

        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        jobTitle:{
            type:String
        },
        gender:{
            type:String,
        
        }
        
    },
   {timestamps:true}

);

const user = mongoose.model("user", userSchema);
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.get("/user", async (req, res) => {
    const allDbUsers = await user.find();
    const html = `<ul>${allDbUsers.map(user => `<li>${user.firstName} ${user.lastName}</li>`).join('')}</ul>`;
    res.send(html);
});

app.get("/api/users", async (req, res) => {
    const allDbUsers = await user.find();
    res.json(allDbUsers);
});

app.post("/api/users", async (req, res) =>{
const body = req.body;
if(
    !body ||
    !body.firstName ||
    !body.lastName ||
    !body.email ||
    !body.gender ||
    !body.jobTitle

){
    return res.status(400).json({msg:" all fields are required"});
}

const result = await user.create({
   firstName:body.firstName,
   lastName: body.lastName,
   eamil: body.eamil,
   jobTitle:body.jobTitle,
     gender: body.gender
});

console.log("file is running");
myServer.listen(8000, () => console.log("server started"));


});

*/

const express = require("express");
const mongoose = require("mongoose");

const app = express();

// connect DB
mongoose.connect("mongodb://127.0.0.1:27017/userDB")
    .then(() => console.log("DB Connected"))
    .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    jobTitle: {
        type: String
    },
    gender: {

        type: String
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);


// GET HTML
app.get("/user", async (req, res) => {
    const users = await User.find();
    const html = `<ul>${users.map(u => `<li>${u.firstName} ${u.lastName}</li>`).join('')}</ul>`;
    res.send(html);
});

// GET JSON
app.get("/api/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// POST
app.post("/api/users", async (req, res) => {
    const body = req.body;

    if (
        !body.firstName ||
        !body.lastName ||
        !body.email ||
        !body.jobTitle ||
        !body.gender
    ) {
        return res.status(400).json({ msg: "All fields are required" });
    }

    const result = await User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        jobTitle: body.jobTitle,
        gender: body.gender
    });

    res.status(201).json(result);
    
});


app.patch("/api/users/:id", async (req,res)=>{
    await User.findByIdAndUpdate(req.params.id,{lastName:"changed"});
    return res.json({message:"user edited successfully"});
});

app.delete("/api/users/:id", async (req,res)=>{
    await User.findByIdAndDelete(req.params.id);
    return res.json({message:"user deleted successfully"});
});



app.delete("/api/users" , async (req , res)=>{
    const ids = req.params.ids.split(","); // expecting a comma-separated list of user IDs in the URL
    const result = await User.deleteMany({_id: { $in: ids }});
    return res.json({message:"users deleted successfully", deletedCount: result.deletedCount});

});

app.listen(8000, () => console.log("Server started on port 8000"));

/*db.students.find({
  age: { $not: { $gte: 21 } }
});
 */

/*db.students.createIndex({ email: 1 }); */

  