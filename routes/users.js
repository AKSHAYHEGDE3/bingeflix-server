const express = require("express");
const router = express.Router();
const User = require('../models/User');
const CryptoJS = require("crypto-js");
const verify = require('../verifyToken');

//UPDATE USER

router.put('/updateUser/:id',verify, async (req,res)=>{
    if(req.user.id === req.params.id || req.user.isAdmin){
        if(req.body.password){
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.SECRET_KEY
              ).toString();
        }

        try{
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {$set : req.body},
                {new:true}
            ) ;
            res.status(200).send(updatedUser)
        } catch (err){
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("You are not authorized");
      }

})


//DELETE USER

router.delete('/deleteUser/:id',verify,async (req,res)=>{
    if(req.user.id === req.params.id || req.user.isAdmin){
        try{
            const deleteUser = await User.findByIdAndDelete(req.params.id)
            res.status(200).send("user deletd successfully")
        }  catch (err){
            res.status(500).json(err)
        }
        
    } else {
        res.status(403).json("You are not authorized");
      }
})


//GET SINGLE USER

router.get("/findUser/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...info } = user._doc;
      res.status(200).json(info);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //GET ALL USERS 
  router.get('/fetchUsers',verify, async (req,res)=>{
      if(req.user.isAdmin){
        try{
            const users = await User.find();
            res.status(200).send(users)
         } catch(err){
            res.status(500).json(err);
      }
    } else {
        res.status(403).json("You are not authorized");
    }
  })


  module.exports = router