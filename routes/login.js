const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../modules/user')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
const secret = "RESTAPI";

// router.get('/', async (req,res)=>{
//     res.status(200).json({
//         status: "ok"
//     })
// })

router.post('/', body("email").isEmail(), body("password"), async (req,res)=>{
    try{
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password} = req.body;
    const value = await User.findOne({email});

    if(!value){
        return res.status(400).json({
            status:"FAILED",
            message: "User ID not found"
        })
    }

    bcrypt.compare(password, value.password, function(err, result) {
        if(err){
            res.status(400).json({
                status : "Failed",
                message: err.message
            })
        }

        if(result){
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60), // optional
                data: value._id
              }, secret);

              res.json({
                status:  "Success",
                token
            })
        }
       

    });
    }catch (err){
        res.status(400).json({
            status : "Failed",
            message: err.message
        })
    }
    
})

module.exports=router;