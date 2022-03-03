const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.post('/', async(req,res) => {
    const id = req.body.id;
})

app.get('/', async(req,res) => {
    res.send('start');
})

app.listen(port)