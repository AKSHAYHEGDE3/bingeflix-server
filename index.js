const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const cors = require('cors');
dotenv.config()

const app = express();

const mongodb = process.env.MONGO_URL

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200 // For legacy browser support
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(mongodb,{useNewUrlParser: true,  useUnifiedTopology: true  }).
then(()=>{console.log("connected to DB")}).
catch(err=>console.log(err))

app.use(express.json())




//ROUTES

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/users')
const videoRoutes = require('./routes/videos')


app.use(authRoutes)
app.use(userRoutes)
app.use(videoRoutes)


// if(process.env.NODE_ENV == "production"){
//     app.use(express.static("bingeflix/build"))
// }

app.listen(process.env.PORT || 5000,()=>{
    console.log("server is running")
})

app.get("/",(req,res)=>{
    res.send("home")
})