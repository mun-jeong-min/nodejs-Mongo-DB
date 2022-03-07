const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { User } = require('./models/User')

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

mongoose.connect('mongodb+srv://moon:abcde12345@boilerplate.fje28.mongodb.net/test?retryWrites=true&w=majority', {
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

app.listen(port, () => console.log('port 3000 run start')); 