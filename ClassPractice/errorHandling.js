const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
//app.use(express.json());

app.get("/data", (req, res) => {
    res.send("cors working");
});



//custom cors
//frontend allow
app.use
cors({
    origin:"http://localhost:8778",
})

// multiple frontend allow
const allowedOrigins=[
    "http://localhost:8778",
    "http://localhost:8128"
];

app.use(
    cors({
        origin:allowedOrigins,

    })
)

app.listen(2000, () => {
    console.log("Server is running");
});