const jwt = require('jsonwebtoken');

//Verificar token

let tokenVerificate = (req, res, next) =>
{
    let token = req.get('token'); // Token que envía desde el header.
    //Decoded es payload
    jwt.verify(token, process.env.SEED, (err, decoded) =>
    {
        if (err)
        {
            return res.status(401).json({
                ok: false,
                err:
                {
                    message: 'Token Inválido'
                }
            });
        }
        req.user = decoded.user;
        next();
    });
};

//Verificar rol de administrador de usuario de token

let adminRoleVerificate = (req, res, next) =>
{
    if (req.user.role === "ADMIN_ROLE")
    {
        next();
    }
    else
    {
        return res.json({
            ok: false,
            err:
            {
                message: 'El usuario no es administrador'
            }
        });
    }
}

module.exports =
{
    tokenVerificate,
    adminRoleVerificate
};