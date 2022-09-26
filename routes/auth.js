const express = require("express");
const router = express.Router();
const User = require('../models/User')
var CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken')
const verify = require('../verifyToken')

//REGISTER

router.post("/register", async (req, res) => {

    if (req.body.password && req.body.password.length > 5) {
        const newUser = new User({
         username: req.body.username,
         email: req.body.email,
         password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
         isAdmin: req.body.isAdmin
        }) 

        try {
       
            const user = await newUser.save()
            const accessToken = jwt.sign(
                { id: user._id, isAdmin: user.isAdmin },
                process.env.SECRET_TOKEN_KEY,
                { expiresIn: "5d" }
            )
            const { password, ...info } = user._doc
            const data = { ...info, accessToken }
            // console.log(data)
            res.status(200).json({user:data})
        

        } catch (error) {
            if(error.code === 11000){
                res.status(500).json("email or username already registered")
            } else {
                res.status(500).json("please enter all the details")
            }
        }

    }  else {
        res.status(500).json("enter a password of min length 6 characters")
    }

  
})

//LOGIN

router.post('/login', async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(401).json('wrong email or password')
            
        } else {
            const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
            const originalText = bytes.toString(CryptoJS.enc.Utf8)

            if (originalText !== req.body.password) {
                res.status(401).json('wrong email or password')
            } else {
                const accessToken = jwt.sign(
                    { id: user._id, isAdmin: user.isAdmin },
                    process.env.SECRET_TOKEN_KEY,
                    { expiresIn: "5d" }
                )
                const { password, ...info } = user._doc
                const data = { ...info, accessToken }
                res.status(200).json({user:data})
               
                // res.status(200).json({ ...info, accessToken })
            }
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

// VERIFY USER
router.get('/verifyUser', verify, async (req, res) => {
    console.log("---auth---")
    console.log(req.user)
    if (req.user) {
        try {
            console.log(req.user)
            const user = await User.findById(req.user.id)
            res.status(200).json(user)
        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }

    } else {
        // res.status(404).send("no token")
        console.log("no token")
    }
})

module.exports = router




