const express = require('express');
const mongoose = require('mongoose');
const bodyParser =  require('body-parser');

const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
mongoose.connect("mongodb+srv://user:user@omnistack9-u7pfh.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
mongoose.set('useFindAndModify', false)

app.use(bodyParser.json())

app.use(require('./routes'));


app.listen(4000); 
