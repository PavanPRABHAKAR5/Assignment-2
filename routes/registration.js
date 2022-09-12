const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../modules/user')
const bcrypt = require('bcrypt')

// router.get('/', async (req,res)=>{
//     res.status(200).json({
//         status: "ok"
//     })
// })


router.post('/', body("email").isEmail(), body("name").isAlpha(), body("password").isLength({min: 5, max: 20}), async (req,res)=>{
    try{
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {name, email, password} = req.body;
    bcrypt.hash(password, 10, async function(err, hash) {
        // Store hash in your password DB.
        if(err){
            res.status(500).json({
                status: "Failed",
                message: err.message
            })
        }

        const result = await User.create({
            name,
            email,
            password: hash
        })
        res.status(200).json({
            status:"Success",
            message: "Registration Successful"
        })
    });
    }catch (err){
        res.status(400).json({
            status : "Failed",
            message: err.message
        })
    }
    
})

module.exports=router;