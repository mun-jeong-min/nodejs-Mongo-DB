const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { User } = require('./models/User');
const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

mongoose.connect(process.env.mongoURL, {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
    //useCreateIndex: true,           
    //useFindAndModify: false 
}).then(() => console.log('mongoDB connect..'))
  .catch(err => console.log(err)); 

  app.get('/', async(req,res) => {
    res.send('start');
})

app.post('/registar', async(req,res) => {
  const user = new User(req.body);
  
  user.save((err,userInfo) => {
    if(err) return res.json({success:false, err});
    return res.status(200).json({
      success:true
    })
  })
})

app.post('/login', async(req,res) => {
  User.findOne({ email: req.body.email }, (err,user) => {
    if(!user) {
      return res.json({
        loginSuccess: false,
        message: "404"
      })
    }
    
    user.comparePassword(req.body.password, (err,isMatch) => {
      if(!isMatch){
        return res.json({ loginSuccess:false, message: "401" })
      }
    }) 
  })
})

app.listen(port, () => console.log('port 3000 run start'));   