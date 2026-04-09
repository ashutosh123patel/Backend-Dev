//MongooseMiddleware: in these type of operation (save , find , update and delete) can be perform the db operation to be run.
//Types 
//1.Pre Middleware : before saving operation.
//Ex. Psd : Hash Value.

//2.Post MiddleWare: After saving operation.
//Ex.  Hash value save then print value.


//const bcrypt = require("bcrypt");

//const password = "123456";

//const hashedPassword = await bcrypt.hash(password, 10);

//console.log(hashedPassword);

//Login
//const isMath = await bcrypt.compare("123456", hashedPassword);
//console.log(isMath);

// //Registration page with the help of bcrypt.
// const bcrypt = require("bcrypt");
// const password = "123456";
// const hashedPassword = await bcrypt.hash(password,10);

// //login
// const isMath = await bcrypt.compare("123456", hashedPassword);
// if(isMatch){
//     console.log("login ho gaya:");
// }else{
//     console.log("Invalid credentials")
// }

 //Registration page with the help of bcrypt for a login page by using bcrypt.
// const express = require('express');
// const app = express();
// const bcrypt = require("bcrypt");

// async function run() {
//     const password = "123456";

//     const hashedPassword = await bcrypt.hash(password, 10);
//     console.log("Hashed Password:", hashedPassword);

//     const isMatch = await bcrypt.compare("12456", hashedPassword);

//     if (isMatch) {
//         console.log("Login ho gaya");
//     } else {
//         console.log("Invalid credentials");
//     }
// }

// run();


const express = require("express");
const bcrypt = require("bcrypt");

const app = express();

app.get("/login", async (req, res) => {
    const password = "123456";

    const hashedPassword = await bcrypt.hash(password, 10);

    const isMatch = await bcrypt.compare("123456", hashedPassword);

    if (isMatch) {
        res.send("Login ho gaya");
    } else {
        res.send("Invalid credentials");
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

