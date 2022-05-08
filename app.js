require('dotenv').config();
const express = require('express');
const parser = require('body-parser');
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');
const md5 = require('md5');

const app = express();
mongoose.connect('mongodb://localhost:27017/Users',(err)=>{
    if(err)
    console.log(err);
    else
    console.log('connected');
});

var email;
var pass;
var z="";

const schema = new mongoose.Schema({
    emailid:String,
    password:String
    }
  );

 
 
  const person = mongoose.model('person', schema);

app.set('view engine','ejs');
app.use(parser.urlencoded({ extended: false }))

app.get('/',(req,res)=>{

    res.render('Login');
})
app.get('/signup',(req,res)=>{
    res.render('Signup');
})
app.post('/signup',(req,res)=>{
    email=String(req.body.email);
    pass=String(req.body.password);
    var x = new person({
        emailid:email,
        password:md5(pass)
    })
    x.save();
    res.render('welcome',{emailx:email});

})

app.post('/login',(req,res)=>{
    
    person.findOne({emailid:String(req.body.email)},(err,response)=>{

        if(err)
       {
        res.send("NOT Found");
       }
        else
        {
            if(response.password===md5(req.body.password))
                res.render('welcome',{emailx:req.body.email});
            else
                res.send("NOT Found");
        }

    })

    
})

app.listen(80);
