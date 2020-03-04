const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userDB');
const app = express();

app.post('/login', (req, res) =>
{

    let body = req.body;


    User.findOne({ email: body.email }, (err, userDB) =>
    {
        if (err)
        {
            return res.status(500).json(
                {
                    ok: false,
                    err
                }
            );
        }
        else
        {

            if (!userDB)
            {
                return res.status(400).json(
                    {
                        ok: false,
                        err: {
                            message: '(Usuario) o contraseña incorrectos'

                        }
                    }
                );
            }

            //Si la contraseña no corresponde
            if (!bcrypt.compareSync(body.password, userDB.password))
            {
                return res.status(400).json(
                    {
                        ok: false,
                        err: {
                            message: 'Usuario o (contraseña) incorrectos'

                        }
                    }
                );
            }

            let token = jwt.sign(
                {
                    user: userDB
                },
                process.env.SEED,
                {
                    expiresIn: process.env.TOKEN_EXPIRATION
                }
            );

            res.json({
                ok: true,
                user: userDB,
                token
            });
        }

    });
});


module.exports = app;