const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const User = require('../models/userDB');
const app = express();

app.get('/user', function (req, res)
{
    let startFrom = req.query.startFrom || 0;
    startFrom = Number(startFrom);

    let limit = req.query.limit || 5;
    limit = Number(limit);

    const filtering = { state: true };
    User.find(filtering, 'name email role state google img' // =>Callback y el otro parámetro define que campos quiero mostrar, un string separado con espacios (?) XD
    ).skip(startFrom)
        .limit(limit)
        .exec(
            (err, users) => 
            {
                if (err)
                {
                    return res.status(400).json(
                        {
                            ok: false,
                            err
                        }
                    );
                }
                else
                {
                    User.countDocuments(filtering, (err, length) =>
                    {
                        res.json((
                            {
                                ok: true,
                                results: length,
                                users
                            }
                        ));
                    });
                }
            }
        );
});

app.post('/user', function (req, res)
{
    let body = req.body;
    console.log(body);

    let user = new User(
        {
            name: body.name,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10),
            role: body.role
        }
    );

    user.save((err, userDB) => 
    {
        if (err)
        {
            return res.status(400).json(
                {
                    ok: false,
                    err
                }
            );
        }
        else
        {
            res.json((
                {
                    ok: true,
                    user: userDB
                }
            ));
        }
    })

});

app.put('/user/:id', function (req, res)
{
    let id = req.params.id;
    let updatableValues = [
        'name',
        'email',
        'img',
        'role',
        'state'
    ];

    //Solo actualiza los valores de updatableValues.
    let body = _.pick(req.body, updatableValues);

    let updateOptions =
    {
        //Devuelve el nuevo objeto
        new: true,
        //Realizar validaciones iniciales
        runValidators: true
    }

    User.findByIdAndUpdate(id, body, updateOptions, (err, userDB) => 
    {
        if (err)
        {
            return res.status(400).json(
                {
                    ok: false,
                    err
                }
            );
        }
        else
        {
            res.json((
                {
                    ok: true,
                    user: userDB
                }
            ));
        }
    });
});

app.delete('/user/:id', function (req, res)
{
    let id = req.params.id;

    ////Eliminación de registro (NO RECOMENDADO!!, prefiera cambiar estado!!)
    // User.findByIdAndRemove(id, (err, deletedUser) =>
    // {
    //     if (err)
    //     {
    //         return res.status(400).json(
    //             {
    //                 ok: false,
    //                 err
    //             }
    //         );
    //     }
    //     else
    //     {
    //         if (!deletedUser)
    //         {
    //             return res.status(400).json(
    //                 {
    //                     ok: false,
    //                     err: {
    //                         message: 'Usuario no encontrado'
    //                     }
    //                 }
    //             );
    //         }
    //         res.json((
    //             {
    //                 ok: true,
    //                 user: deletedUser
    //             }
    //         ));
    //     }
    // })

    //Cambia el estado del usuario, esta es la práctica recomendable
    let changeState = {state: false}
    User.findByIdAndUpdate(id, changeState, { new: true}, (err, userDB) => 
    {
        if (err)
        {
            return res.status(400).json(
                {
                    ok: false,
                    err
                }
            );
        }
        else
        {
            res.json((
                {
                    ok: true,
                    user: userDB
                }
            ));
        }
    });
});

module.exports = app;