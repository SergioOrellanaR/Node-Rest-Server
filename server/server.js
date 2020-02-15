
require('./config/config.js');
var bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/userREST.js'));

let connectionOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useFindAndModify: false
};

let port = process.env.PORT;

mongoose.connect(process.env.URLDB, connectionOptions, (err, res) => {
    if (err)
    {
        throw err;
    }
    else
    {
        console.log('Base de datos online!!');
    }
});




app.listen(port, () =>
{
    console.log(`Escuchando en puerto: ${port}`);
})