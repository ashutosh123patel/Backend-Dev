// const express=require("express");
// const app = express();
// app.use(express.json());

// let credentials=[{
//     email: "ashutoshp141@gmail.com",
//     password:"Haineha121"
// },
// {
//     email: "ashu@gmail.com",
//     password:"neha1211Gupta"
// },
// ]

// app.get("/users",(req,res)=>{
//     res.json({message:"User fetched Successful",credentials})
// }); 

// //Reseting the password
// app.put("/reset",( req,res)=>{
//     const {email,password,newpassword}=req.body;
//     //Finding the user
//     const user=credentials.find(
//         (cred)=> cred.email==email&&cred.password==password
//     );
//   if (!user) {
//         return res.status(401).send("Invalid email or password");
//     }

//     res.send("Login successful");
// });

// app.get("/users", (req, res) => {
//     res.send(users);
// });

// app.listen(8000, () => {
//     console.log("server is working");
// });



// const express = require("express");
// const app = express();
// app.use(express.json());

// let credentials = [
//     {
//         email: "ashutoshp141@gmail.com",
//         password: "Haineha121"
//     },
//     {
//         email: "ashu@gmail.com",
//         password: "neha1211Gupta"
//     }
// ];

// app.get("/users", (req, res) => {
//     res.json({
//         message: "User fetched successfully",
//         credentials
//     });
// });


// // Reset password
// app.put("/reset", (req, res) => {
//     const { email, password, newPassword } = req.body;

//     const user = credentials.find(
//         cred => cred.email === email && cred.password === password
//     );

//     if (!user) {
//         return res.status(401).send("Invalid email or password");
//     }

//     user.password = newPassword;

//     res.send("Password reset successful");
// });

// //Forget password section
// app.put("/forgot",(req,res)=>{
//       const { email, newPassword } = req.body;
//       const user = credentials.find(
//         cred => cred.email === email 
//       );
//       if (!user) {
//         return res.status(401).send("Email not found");

//     }
//      user.password=newPassword;
//      res.send("password get re-seted");         
// }) 


// app.listen(8001, () => {
//     console.log("server is working");
// });



const express = require("express");
const app = express();
app.use(express.json());

let credentials = [
    { email: "ashutoshp141@gmail.com", password: "Haineha121" },
    { email: "ashu@gmail.com", password: "neha1211Gupta" }
];

app.get("/users", (req, res) => {
    res.json(credentials);
});

app.put("/reset-email", (req, res) => {
    const { oldEmail, password, newEmail } = req.body;

    const user = credentials.find(
        u => u.email === oldEmail && u.password === password
    );

    if (!user) {
        return res.status(401).send("Invalid email or password");
    }

    user.email = newEmail;
    res.send("Email reset successful");
});

app.listen(8001, () => {
    console.log("server is working");
});
