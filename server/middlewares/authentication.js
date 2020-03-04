const jwt = require('jsonwebtoken');

//Verificar token

let tokenVerificate = (req, res, next) =>
{
    let token = req.get('token'); // Token que envía desde el header.
    //Decoded es payload
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if(err)
        {
            return res.status(401).json({
                ok: false,
                err
            })
        }

        req.userDB = decoded.userDB;
        next();
    });
    

};

module.exports =
{
    tokenVerificate
};