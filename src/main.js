const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const { User } = require('./models/User');
const {auth} = require('./middleware/auth')
const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cookieParser())

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

app.post('/signup', async(req,res) => {
  const user = new User(req.body);
  
  user.save((err,userInfo) => {
    if(err) return res.json({success:false, err});
    return res.status(200).json({
      success:true
    })
  })  
})

app.post('signin', async(req,res) => {
  const user = await User.findOne({ email: req.body.email }); 
  if(!user) {
    return res.json({
      loginSuccess:false,
      message: "404"
    })
  }
    
    await user.comparePassword(req.body.password, (err,isMatch) => {
      if(!isMatch){
        return res.json({ loginSuccess:false, message: "401" })
      }
    })
    
    await user.generateToken((err,user) => {
      if(err) return res.status(400).send(err);
      
      res.cookie("x_auth", user.token)
        .status(200)
        .json({ loginSuccess: true, userId: user._id })
    })
  })

  app.post('auth', auth ,async(req,res) => {
    res.status(200).json({
      _id: req.user._id,
      isAdmin: req.user.role === 0 ? false : true,
      email: req.user.email,
      name: req.user.name,
    })
  })


  app.get('/logout', auth, (req,res) => {
    
    await User.findOneAndUpdate({_id:req.user._id},
    {token: ""}, (err, user) => {
      if(err) return res.json({success:false, err});
      return res.status(200).send({
        success: true
      })
     })
  })
app.listen(port, () => console.log('port 3000 run start'));