const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Post = require('../modules/post')
const bcrypt = require('bcrypt')





// router.post('/', async (req,res)=>{
//     res.status(200).json({
//         status: "ok"
//     })
// })

router.get('/', async (req,res)=>{
    const data = await Post.find();
    res.status(200).json({
        status:"Success",
        posts: data
    })
})

router.post('/', async (req,res)=>{
    try{
        const data = await Post.create({
            title : req.body.title,
            body : req.body.body,
            imageUrl : req.body.imageUrl,
            user : req.user
        });
    res.status(200).json({
        status:"Success",
        data
    })
    }catch (err){
        res.status(400).json({
            status : "Failed",
            message: err.message
        })
    }
    
})

// router.put('/:id ', async (req,res)=>{
//     try{
//         const newdata = req.body;
//         const data = await Post.updateOne({_id:req.params.id},newdata);
//     res.status(200).json({
//         status:"Success",
//         newdata
//     })
//     }catch (err){
//         res.status(400).json({
//             status : "Failed",
//             message: err.message
//         })
//     }
    
// })

router.put("/:postId", async (req, res) => {

	try {
			// console.log(req.query);
			const data = await Post.updateOne({postId: req.params.id}, req.body);
			res.status(200).json({
					status: "Success",
					data
			})

	}catch(e) {
			res.status(400).json({
					status: "failed",
					message: e.message
			})
	}
})


router.delete('/:postId', async (req,res)=>{
    try{
        
        const data = await Post.deleteOne({postId:req.params.id});
    res.status(200).json({
        status:"Success",
        data
    })
    }catch (err){
        res.status(400).json({
            status : "Failed",
            message: err.message
        })
    }
    
})

module.exports=router;