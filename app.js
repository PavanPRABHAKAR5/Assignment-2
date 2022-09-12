const bodyParser = require('body-parser');
const express =require('express');
const mongoose =require('mongoose')
const User = require('./modules/user')
const secret = "RESTAPI";
var jwt = require('jsonwebtoken');


const loginRoutes = require('./routes/login');
const registrationRoutes = require('./routes/registration');
const postRoutes = require('./routes/posts');

mongoose.connect('mongodb://localhost/Assignment');

const app =express();
app.use(bodyParser.json())


app.use("/posts", async (req, res, next) => {
    console.log(req.headers.authorization);
    if(req.headers.authorization){
        const token = req.headers.authorization.split("test ")[1];
        console.log(token);
        
        jwt.verify(token, secret, async function(err, decoded) {
            if (err) {
                res.status(500).json({
                    status: "failed",
                    message: "Not Authenticated"
                })
            }
            const user = await User.findOne({_id: decoded.data});
            req.user = user._id;
            next();
          });
    }else {
       return  res.status(500).json({
            status: "failed",
            message: "Invalid token"
        })
    }
});

app.use('/register',registrationRoutes)
app.use('/login', loginRoutes)
app.use('/posts', postRoutes)





app.get('*', (req, res)=>{
    res.status(404).json({
        status: "Failed",
        message: "API not found"
    })
})

app.listen(3000, ()=>console.log('The serever is listning in 3000 port'))