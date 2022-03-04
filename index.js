const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

mongoose.connect('mongodb+srv://moon:abcde12345@boilerplate.fje28.mongodb.net/ant?retryWrites=true&w=majority', {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
    //useCreateIndex: true,                       안 써주면 에러
    //useFindAndModify: false
}).then(() => console.log('mongoDB connect..'))
  .catch(err => console.log(err)); 

app.get('/', async(req,res) => {
    res.send('start');
})

app.listen(port, () => console.log('port 3000 run start'));