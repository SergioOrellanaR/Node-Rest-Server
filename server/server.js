
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

mongooseDbport = 27017;

let connectionOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useFindAndModify: false
};

mongoose.connect(`mongodb://localhost:${mongooseDbport}/cafe`, connectionOptions, (err, res) => {
    if (err)
    {
        throw err;
    }
    else
    {
        console.log('Base de datos online');
    }
});


let port = process.env.PORT;

app.listen(port, () =>
{
    console.log(`Escuchando en puerto: ${port}`);
})