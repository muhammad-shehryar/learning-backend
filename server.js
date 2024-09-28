const express = require("express")
const app = express()
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config()
const PORT = process.env.PORT || 5000;
const postRoute = require("./routes/postRoute")
const connectDB = require("./config/db")
const authRoute = require("./routes/authRoute")

app.use(cors())
app.use(express.json())

connectDB()

app.get("/",(req,res)=>{
    res.send("blog platform api is running")
})

app.use("/api/auth/register",authRoute);
app.use("/api/auth",postRoute);

app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`)
})
