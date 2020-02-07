const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let enumRoles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido' // <- Mensaje de error
}

let userSchema = new Schema(
    {
        name: 
        {
            type: String,
            required: [true, 'Es necesario ingresar el nombre'],
        },
        email: 
        {
            type: String,
            unique: true,
            required: [true, 'Es necesario ingresar email']
        },
        password: 
        {
            type: String,
            required: [true, 'Contraseña no puede ser vacía']
        },
        img:
        {
            type: String,
            required: false
        },
        role:
        {
            type: String,
            default: 'USER_ROLE',
            enum: enumRoles
        },
        state:
        {
            type: Boolean,
            default: true
        },
        google:
        {
            type: Boolean,
            default: false
        }
    }
);

//Se elimina la contraseña para que no sea visualizada por el usuario en el response, sin embargo, esta igual es insertada en la DB.
userSchema.methods.toJSON = function()
{
    let userJson = this;
    let userObject = userJson.toObject();
    delete userObject.password;
    return userObject;
}

//Validador de unique
userSchema.plugin(uniqueValidator, {message: '{PATH} debe ser único'});

module.exports = mongoose.model ('USER', userSchema);
