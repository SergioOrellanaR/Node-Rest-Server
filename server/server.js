
require('./config/config.js');
const express = require('express');
var bodyParser = require('body-parser');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/user', function (req, res)
{
    res.json('get User');
});

app.post('/user', function (req, res)
{
    let body = req.body;

    if (body.name === undefined)
    {
        res.status(400).json(
            {
                ok: false,
                message: 'Es necesario ingresar el nombre'
            }
        );
    } else
    {
        res.json((
            {
                persona: body
            }
        ));

    }

});

app.put('/user/:id', function (req, res)
{
    let id = req.params.id;
    res.json({ id });
});

app.delete('/user', function (req, res)
{
    res.json('delete User');
});



let port = process.env.PORT;

app.listen(port, () =>
{
    `Escuchando en puerto: ${port}`;
})