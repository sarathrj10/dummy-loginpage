const express = require('express');
const Users = require('../models/Users');
const session = require('express-session');
const router = express.Router();



const ridirecttoDashboard = (req,res,next)=>{
    if(req.session.userid){
        res.redirect('/dashboard');
    }else{
        next();
    }
}

const protectHome = (req,res,next)=>{
    if(!req.session.userid){
        res.redirect('/login');
    }else{
        next();
    }
}

router.get('/',ridirecttoDashboard,(req,res)=>{
    res.render('login');
});

router.get('/dashboard',protectHome,(req,res)=>{
    // const loggeduser = Users.find(user => user.id === req.session.userid);
    // const username = loggeduser.name;
    const username = req.session.userid;
    res.render('dashboard',{username});
});

router.get('/login',ridirecttoDashboard,(req,res)=>{
    res.render('login');
});

router.get('/register',ridirecttoDashboard,(req,res)=>{
    res.render('register');
});

//post methods

router.post('/register',(req,res)=>{
    const newUser = {
        id : Date.now().toString(),
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
    }
    // Users.push(newUser);
    var newman = new Users(newUser);
    newman.save();
    res.redirect('/login');
});

router.post('/login',(req,res)=>{
    // const {email , password} = req.body;
    const email = req.body.email;
    const password = req.body.password;
    // Users.find(user =>{
    //     if(user.email == email && user.password == password){
    //         req.session.userid = user.id;
    //         res.redirect('/dashboard');
    //     }else{
    //         const msg = 'Invalid Password';
    //         res.render('login',{msg});
    //     }
    // })
    Users.findOne({email : email, password : password},(err,user)=>{
        if(!user){
            const msg = 'Invalid Password';
            res.render('login',{msg});
        }else{
            req.session.userid = user.name;
            res.redirect('/dashboard');
        }
    })
});
 
router.post('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            return res.redirect('dashboard');
        }
        res.clearCookie('sid');
        res.redirect('/');
    })
});

module.exports =router;
